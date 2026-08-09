require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const { Chess } = require("chess.js");

const authRoutes = require("./routes/auth");

// EXPRESS

const app = express();

const port = process.env.PORT || 8080;

// HTTP SERVER

const server = http.createServer(app);

// SOCKET.IO

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://chessrivo-web.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST"],
  },
});

// MIDDLEWARE

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000", "https://chessrivo-web.vercel.app"],
    credentials: true,
  }),
);

// DATABASE

async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("Database Connected");
  } catch (error) {
    console.log("Database Error");
    console.log(error);
  }
}

connectDatabase();

// AUTH ROUTES

app.use("/api/auth", authRoutes);

// GAME STORAGE

// All active chess rooms
const rooms = {};

// Players waiting for Quick Play
const waitingPlayers = [];

// ROOM CREATION

function createRoom(roomId) {
  if (rooms[roomId]) {
    return rooms[roomId];
  }

  const room = {
    chess: new Chess(),

    players: {
      white: null,
      black: null,
    },

    timer: {
      white: 600000,
      black: 600000,

      active: "w",

      lastUpdate: null,

      interval: null,
    },
  };

  rooms[roomId] = room;

  console.log(`Room created: ${roomId}`);

  return room;
}

// TIMER

function emitTimer(roomId) {
  const room = rooms[roomId];

  if (!room) {
    return;
  }

  io.to(roomId).emit("timerUpdate", {
    white: Math.max(0, room.timer.white),
    black: Math.max(0, room.timer.black),
    active: room.timer.active,
  });
}

function startRoomTimer(roomId) {
  const room = rooms[roomId];

  if (!room) {
    return;
  }

  // Don't start another timer
  if (room.timer.interval) {
    return;
  }

  // Timer only starts when both players exist
  if (!room.players.white || !room.players.black) {
    return;
  }

  room.timer.lastUpdate = Date.now();

  console.log(`Timer started: ${roomId}`);

  room.timer.interval = setInterval(() => {
    const currentRoom = rooms[roomId];

    if (!currentRoom) {
      return;
    }

    const now = Date.now();

    const elapsed = now - currentRoom.timer.lastUpdate;

    currentRoom.timer.lastUpdate = now;

    // WHITE TIMER

    if (currentRoom.timer.active === "w") {
      currentRoom.timer.white -= elapsed;
    }

    // BLACK TIMER
    else {
      currentRoom.timer.black -= elapsed;
    }

    // WHITE TIMEOUT

    if (currentRoom.timer.white <= 0) {
      currentRoom.timer.white = 0;

      emitTimer(roomId);

      stopRoomTimer(roomId);

      io.to(roomId).emit("gameOver", {
        winner: "Black",
        reason: "Time Out",
      });

      console.log(`White timed out: ${roomId}`);

      return;
    }

    // BLACK TIMEOUT

    if (currentRoom.timer.black <= 0) {
      currentRoom.timer.black = 0;

      emitTimer(roomId);

      stopRoomTimer(roomId);

      io.to(roomId).emit("gameOver", {
        winner: "White",
        reason: "Time Out",
      });

      console.log(`Black timed out: ${roomId}`);

      return;
    }

    // Send timer update
    emitTimer(roomId);
  }, 250);
}

function stopRoomTimer(roomId) {
  const room = rooms[roomId];

  if (!room) {
    return;
  }

  if (room.timer.interval) {
    clearInterval(room.timer.interval);

    room.timer.interval = null;

    console.log(`Timer stopped: ${roomId}`);
  }
}

// SEND GAME STATE

function sendGameState(socket, roomId) {
  const room = rooms[roomId];

  if (!room) {
    return;
  }

  socket.emit("boardState", room.chess.fen());

  socket.emit("turn", room.chess.turn());

  socket.emit("timerUpdate", {
    white: Math.max(0, room.timer.white),
    black: Math.max(0, room.timer.black),
    active: room.timer.active,
  });
}

// JOIN ROOM

function joinRoom(socket, roomId) {
  if (!roomId) {
    console.log(`joinRoom rejected: missing roomId from ${socket.id}`);

    return;
  }

  // Create room

  const room = createRoom(roomId);

  // IMPORTANT:
  // Prevent duplicate player assignment

  if (room.players.white === socket.id) {
    console.log(`Socket ${socket.id} is already White in ${roomId}`);

    socket.join(roomId);

    socket.roomId = roomId;

    socket.emit("playerRole", "w");

    sendGameState(socket, roomId);

    return;
  }

  if (room.players.black === socket.id) {
    console.log(`Socket ${socket.id} is already Black in ${roomId}`);

    socket.join(roomId);

    socket.roomId = roomId;

    socket.emit("playerRole", "b");

    sendGameState(socket, roomId);

    return;
  }

  // If socket belongs to another room

  if (socket.roomId && socket.roomId !== roomId) {
    console.log(`Socket ${socket.id} already belongs to ${socket.roomId}`);

    socket.emit("roomError", {
      message: "You are already in another game.",
    });

    return;
  }

  // Join Socket.IO room

  socket.join(roomId);

  socket.roomId = roomId;

  // Assign White

  if (!room.players.white) {
    room.players.white = socket.id;

    socket.emit("playerRole", "w");

    console.log(`White assigned: ${socket.id} -> ${roomId}`);
  }

  // Assign Black
  else if (!room.players.black) {
    room.players.black = socket.id;

    socket.emit("playerRole", "b");

    console.log(`Black assigned: ${socket.id} -> ${roomId}`);

    // Both players exist
    startRoomTimer(roomId);
  }

  // Spectator
  else {
    socket.emit("spectatorRole");

    console.log(`Spectator joined: ${socket.id} -> ${roomId}`);
  }

  // Send game state

  sendGameState(socket, roomId);

  // Debug

  console.log(`Room ${roomId}:`, room.players);
}

// REMOVE PLAYER FROM ROOM

function removePlayerFromRoom(socket, reason) {
  const roomId = socket.roomId;

  if (!roomId) {
    return;
  }

  const room = rooms[roomId];

  if (!room) {
    socket.roomId = null;

    return;
  }

  let winner = null;

  // WHITE

  if (room.players.white === socket.id) {
    room.players.white = null;

    if (room.players.black) {
      winner = "Black";
    }
  }

  // BLACK
  else if (room.players.black === socket.id) {
    room.players.black = null;

    if (room.players.white) {
      winner = "White";
    }
  }

  // Notify opponent

  if (winner) {
    stopRoomTimer(roomId);

    io.to(roomId).emit("gameOver", {
      winner,
      reason,
    });
  }

  socket.leave(roomId);

  socket.roomId = null;

  // Delete room if nobody remains

  if (!room.players.white && !room.players.black) {
    stopRoomTimer(roomId);

    delete rooms[roomId];

    console.log(`Room deleted: ${roomId}`);
  }
}

// SOCKET CONNECTION

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  // CUSTOM ROOM

  socket.on("joinRoom", (roomId) => {
    console.log(`joinRoom received from ${socket.id}: ${roomId}`);

    joinRoom(socket, roomId);
  });

  // MOVE

  socket.on("move", (move) => {
    const roomId = socket.roomId;

    console.log(`Move received from ${socket.id}:`, move);

    // Validate room

    if (!roomId) {
      console.log("Move rejected: socket has no room");

      socket.emit("invalidMove", move);

      return;
    }

    const room = rooms[roomId];

    if (!room) {
      console.log("Move rejected: room doesn't exist");

      socket.emit("invalidMove", move);

      return;
    }

    const chess = room.chess;

    try {
      // Validate player turn

      if (chess.turn() === "w" && socket.id !== room.players.white) {
        console.log(`Move rejected: ${socket.id} is not White`);

        socket.emit("invalidMove", move);

        return;
      }

      if (chess.turn() === "b" && socket.id !== room.players.black) {
        console.log(`Move rejected: ${socket.id} is not Black`);

        socket.emit("invalidMove", move);

        return;
      }

      // Make chess move

      const result = chess.move(move);

      if (!result) {
        console.log("Invalid chess move:", move);

        socket.emit("invalidMove", move);

        return;
      }

      // Update active player's timer

      const now = Date.now();

      if (room.timer.lastUpdate) {
        const elapsed = now - room.timer.lastUpdate;

        if (room.timer.active === "w") {
          room.timer.white -= elapsed;
        } else {
          room.timer.black -= elapsed;
        }
      }

      room.timer.lastUpdate = now;

      // Change active timer

      room.timer.active = room.timer.active === "w" ? "b" : "w";

      // Send updated board

      io.to(roomId).emit("boardState", chess.fen());

      // Send updated turn-

      io.to(roomId).emit("turn", chess.turn());

      // Send updated timer

      emitTimer(roomId);

      // Check game over

      if (chess.isGameOver()) {
        stopRoomTimer(roomId);

        let winner = null;

        if (chess.isCheckmate()) {
          winner = chess.turn() === "w" ? "Black" : "White";
        }

        io.to(roomId).emit("gameOver", {
          winner,

          reason: chess.isCheckmate()
            ? "Checkmate"
            : chess.isDraw()
              ? "Draw"
              : "Game Over",
        });
      }
    } catch (error) {
      console.log("Move processing error:", error);

      socket.emit("invalidMove", move);
    }
  });

  // LEAVE GAME

  socket.on("leaveGame", () => {
    console.log(`Leave requested by ${socket.id}`);

    removePlayerFromRoom(socket, "Opponent left the game");

    socket.emit("leaveSuccess");
  });

  // QUICK PLAY

  socket.on("quickPlay", () => {
    console.log(`Quick Play request: ${socket.id}`);

    // Already waiting?

    if (waitingPlayers.includes(socket)) {
      console.log(`${socket.id} is already waiting`);

      return;
    }

    // Already in a game?

    if (socket.roomId) {
      console.log(`${socket.id} is already in room ${socket.roomId}`);

      return;
    }

    // Nobody waiting

    if (waitingPlayers.length === 0) {
      waitingPlayers.push(socket);

      console.log(`Player waiting: ${socket.id}`);

      socket.emit("waiting", "Waiting for opponent...");

      return;
    }

    // Find valid opponent

    let opponent = null;

    while (waitingPlayers.length > 0) {
      const candidate = waitingPlayers.shift();

      if (candidate && candidate.connected && !candidate.roomId) {
        opponent = candidate;

        break;
      }
    }

    // No valid opponent

    if (!opponent) {
      waitingPlayers.push(socket);

      socket.emit("waiting", "Waiting for opponent...");

      return;
    }

    // Create unique room

    const roomId = `room-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 8)}`;

    console.log(`Quick Play matched:`);

    console.log(`White candidate: ${opponent.id}`);

    console.log(`Black candidate: ${socket.id}`);

    console.log(`Room: ${roomId}`);

    // Tell clients to navigate

    opponent.emit("gameFound", {
      roomId,
      color: "w",
    });

    socket.emit("gameFound", {
      roomId,
      color: "b",
    });

    // IMPORTANT:
    //
    // We DO NOT call joinRoom() here.
    //
    // Both clients navigate to:
    //
    // /room/[roomId]
    //
    // and the room page sends:
    //
    // socket.emit("joinRoom", roomId)
    //
    // That is the ONLY place where players
    // receive their actual server-side roles.
  });

  // DISCONNECT

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);

    // Remove from Quick Play queue

    const waitingIndex = waitingPlayers.indexOf(socket);

    if (waitingIndex !== -1) {
      waitingPlayers.splice(waitingIndex, 1);

      console.log(`Removed ${socket.id} from Quick Play queue`);
    }

    // Remove from active game

    if (socket.roomId) {
      removePlayerFromRoom(socket, "Opponent disconnected");
    }
  });
});

// START SERVER

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

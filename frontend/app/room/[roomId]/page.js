"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Chess } from "chess.js";

import socket from "@/app/libs/socket";
import { checkUser } from "../../../lib/auth";

// shadcn
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

function formatTime(milliseconds) {
  const totalSeconds = Math.ceil(milliseconds / 1000);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function ChessGame() {
  const boardRef = useRef(null);

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [whiteTime, setWhiteTime] = useState(600000);
  const [blackTime, setBlackTime] = useState(600000);
  const [activeTimer, setActiveTimer] = useState("w");

  const router = useRouter();
  const params = useParams();

  const roomId = params.roomId;

  useEffect(() => {
    const verifyUser = async () => {
      const data = await checkUser();

      if (!data.success) {
        router.replace("/login");
        return;
      }

      setUser(data.user);
      setAuthLoading(false);
    };

    verifyUser();
  }, [router]);

  const [gameResult, setGameResult] = useState(null);

  // ==============================
  // LEAVE GAME
  // ==============================

  const handleLeaveGame = () => {
    socket.emit("leaveGame");
  };

  useEffect(() => {
    if (authLoading || !user || !roomId) {
      return;
    }

    const chess = new Chess();

    const boardElement = boardRef.current;

    if (!boardElement) {
      console.log("Chessboard ref is not available");
      return;
    }

    let draggedPiece = null;
    let sourceSquare = null;
    let playerRole = null;
    let currentTurn = "w";

    // ==============================
    // GET PIECE UNICODE
    // ==============================

    const getPieceUnicode = (piece) => {
      const unicodePieces = {
        K: "♔",
        Q: "♕",
        R: "♖",
        B: "♗",
        N: "♘",
        P: "♙",

        k: "♚",
        q: "♛",
        r: "♜",
        b: "♝",
        n: "♞",
        p: "♟",
      };

      const key = piece.color === "w" ? piece.type.toUpperCase() : piece.type;

      return unicodePieces[key] || "";
    };

    // ==============================
    // HANDLE MOVE
    // ==============================

    const handleMove = (source, target) => {
      if (!source || !target) return;

      const move = {
        from: `${String.fromCharCode(97 + source.col)}${8 - source.row}`,

        to: `${String.fromCharCode(97 + target.col)}${8 - target.row}`,

        promotion: "q",
      };

      console.log("Sending move:", move);

      socket.emit("move", move);
    };

    // ==============================
    // RENDER CHESSBOARD
    // ==============================

    const renderBoard = () => {
      const board = chess.board();

      boardElement.innerHTML = "";

      board.forEach((row, rowIndex) => {
        row.forEach((square, squareIndex) => {
          const squareElement = document.createElement("div");

          squareElement.classList.add(
            "square",
            (rowIndex + squareIndex) % 2 === 0 ? "light" : "dark",
          );

          squareElement.dataset.row = rowIndex;

          squareElement.dataset.col = squareIndex;

          // ==============================
          // CREATE PIECE
          // ==============================

          if (square) {
            const pieceElement = document.createElement("div");

            pieceElement.classList.add(
              "piece",
              square.color === "w" ? "white" : "black",
            );

            pieceElement.innerText = getPieceUnicode(square);

            // Player can drag only:
            // 1. Their own pieces
            // 2. During their turn

            if (playerRole === square.color && currentTurn === playerRole) {
              pieceElement.draggable = true;

              pieceElement.classList.add("draggable");
            } else {
              pieceElement.draggable = false;
            }

            // ==============================
            // DRAG START
            // ==============================

            pieceElement.addEventListener("dragstart", (event) => {
              if (!pieceElement.draggable) {
                event.preventDefault();
                return;
              }

              draggedPiece = pieceElement;

              sourceSquare = {
                row: rowIndex,
                col: squareIndex,
              };

              event.dataTransfer.setData("text/plain", "");
            });

            // ==============================
            // DRAG END
            // ==============================

            pieceElement.addEventListener("dragend", () => {
              draggedPiece = null;
              sourceSquare = null;
            });

            squareElement.appendChild(pieceElement);
          }

          // ==============================
          // ALLOW DROP
          // ==============================

          squareElement.addEventListener("dragover", (event) => {
            event.preventDefault();
          });

          // ==============================
          // HANDLE DROP
          // ==============================

          squareElement.addEventListener("drop", (event) => {
            event.preventDefault();

            if (!draggedPiece || !sourceSquare) {
              return;
            }

            const targetSquare = {
              row: Number(squareElement.dataset.row),

              col: Number(squareElement.dataset.col),
            };

            handleMove(sourceSquare, targetSquare);
          });

          boardElement.appendChild(squareElement);
        });
      });

      // ==============================
      // FLIP BOARD FOR BLACK
      // ==============================

      if (playerRole === "b") {
        boardElement.classList.add("flipped");
      } else {
        boardElement.classList.remove("flipped");
      }
    };

    // ==============================
    // SOCKET EVENT HANDLERS
    // ==============================

    // ==============================
    // SOCKET EVENT HANDLERS
    // ==============================

    const handleConnect = () => {
      console.log("Connected:", socket.id);

      console.log("Joining room:", roomId);

      socket.emit("joinRoom", roomId);
    };

    const handlePlayerRole = (role) => {
      console.log("Player role:", role);

      playerRole = role;

      renderBoard();
    };

    const handleSpectatorRole = () => {
      console.log("Joined as spectator");

      playerRole = null;

      renderBoard();
    };

    const handleBoardState = (fen) => {
      console.log("Board state received:", fen);

      chess.load(fen);

      currentTurn = chess.turn();

      renderBoard();
    };

    const handleTurn = (turn) => {
      console.log("Current turn:", turn);

      currentTurn = turn;

      renderBoard();
    };

    const handleGameOver = (data) => {
      console.log("Game Over:", data);

      setGameResult(data);
    };

    const handleInvalidMove = (move) => {
      console.log("Invalid move:", move);
    };

    const handleLeaveSuccess = () => {
      console.log("Left game successfully");

      router.push("/");
    };

    const handleTimerUpdate = (timer) => {
      setWhiteTime(timer.white);
      setBlackTime(timer.black);
      setActiveTimer(timer.active);
    };

    // ==============================
    // REGISTER SOCKET LISTENERS
    // ==============================

    socket.on("connect", handleConnect);

    socket.on("playerRole", handlePlayerRole);

    socket.on("spectatorRole", handleSpectatorRole);

    socket.on("boardState", handleBoardState);

    socket.on("turn", handleTurn);

    socket.on("gameOver", handleGameOver);

    socket.on("invalidMove", handleInvalidMove);

    socket.on("leaveSuccess", handleLeaveSuccess);

    socket.on("timerUpdate", handleTimerUpdate);

    // ==============================
    // CONNECT SOCKET
    // ==============================

    if (!socket.connected) {
      console.log("Socket not connected. Connecting...");

      socket.connect();
    } else {
      console.log("Socket already connected:", socket.id);

      // IMPORTANT:
      // Since connect will NOT fire again,
      // join the room manually.
      socket.emit("joinRoom", roomId);
    }

    // ==============================
    // CLEANUP
    // ==============================

    return () => {
      socket.off("connect", handleConnect);

      socket.off("playerRole", handlePlayerRole);

      socket.off("spectatorRole", handleSpectatorRole);

      socket.off("boardState", handleBoardState);

      socket.off("turn", handleTurn);

      socket.off("gameOver", handleGameOver);

      socket.off("invalidMove", handleInvalidMove);

      socket.off("leaveSuccess", handleLeaveSuccess);

      socket.off("timerUpdate", handleTimerUpdate);
    };
  }, [roomId, authLoading, user, router]);

  if (authLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#081c15] text-white">
        <p className="text-sm text-gray-300">Checking authentication...</p>
      </main>
    );
  }
  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-[#081c15] via-[#1b4332] to-[#2d6a4f] px-4 py-8 text-white sm:px-6">
        {/* Chess Board */}
        <div className="w-full max-w-[400px]">
          <div className="chessboard mx-auto" ref={boardRef}></div>
        </div>

        {/* Timer */}
        <div className="mt-5 flex w-full max-w-[400px] gap-3">
          <div
            className={`flex flex-1 items-center justify-center rounded-lg px-3 py-2 text-sm font-semibold sm:px-4 sm:py-3 ${
              activeTimer === "w"
                ? "bg-green-600 text-white"
                : "bg-gray-500 text-white"
            }`}
          >
            White: {formatTime(whiteTime)}
          </div>

          <div
            className={`flex flex-1 items-center justify-center rounded-lg px-3 py-2 text-sm font-semibold sm:px-4 sm:py-3 ${
              activeTimer === "b"
                ? "bg-green-600 text-white"
                : "bg-gray-500 text-white"
            }`}
          >
            Black: {formatTime(blackTime)}
          </div>
        </div>

        {/* Leave Button */}
        <Button
          variant="destructive"
          onClick={handleLeaveGame}
          className="mt-6 h-12 w-full max-w-[400px] border-none bg-white font-semibold text-[#2d6a4f] hover:bg-[#2d6a4f] hover:text-white sm:mt-8 sm:h-13"
        >
          Leave
        </Button>
      </div>

      <Dialog
        open={gameResult !== null}
        onOpenChange={(open) => {
          if (!open) {
            setGameResult(null);
          }
        }}
      >
        <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl sm:text-2xl">
              {gameResult?.winner ? `${gameResult.winner} Wins!` : "Game Drawn"}
            </DialogTitle>

            <DialogDescription className="text-center text-sm sm:text-base">
              {gameResult?.reason}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ChessGame;

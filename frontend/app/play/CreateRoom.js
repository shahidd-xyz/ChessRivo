"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import socket from "../libs/socket";

function CreateRoom() {
  const [roomCode, setRoomCode] = useState("");

  const router = useRouter();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("waiting", (message) => {
      console.log(message);
      // Show "Waiting for opponent..." on the UI
    });

    socket.on("gameFound", ({ roomId }) => {
      console.log("Game Found:", roomId);
      router.push(`/room/${roomId}`);
    });

    return () => {
      socket.off("connect");
      socket.off("waiting");
      socket.off("gameFound");
    };
  }, []);

  const handleQuickPlay = () => {
    console.log("Button Clicked");

    console.log("Connected:", socket.connected);
    console.log("Socket:", socket.id);

    socket.emit("quickPlay");
  };

  const handleCreateRoom = (e) => {
    e.preventDefault();

    if (!roomCode.trim()) {
      return;
    }

    router.push(`/room/${roomCode}`);
  };

  return (
    <section className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      {" "}
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#2d6a4f]">
            Choose how to play
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Start a game
          </h2>

          <p className="mt-4 text-sm leading-6 text-gray-500 sm:text-base">
            Play with a friend using a private room or get matched with another
            player instantly.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Create Room Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eff8f3] text-lg font-bold text-[#2d6a4f]">
              ♟
            </div>

            <h3 className="mt-6 text-xl font-bold text-gray-900 sm:text-2xl">
              Create a Room
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Start a private board and share the room code with a friend.
            </p>

            <form onSubmit={handleCreateRoom} className="mt-7">
              <label
                htmlFor="roomCode"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Room code
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="roomCode"
                  type="text"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value)}
                  placeholder="Enter room code"
                  className="h-12 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#2d6a4f] focus:bg-white focus:ring-2 focus:ring-[#2d6a4f]/15"
                />

                <button
                  type="submit"
                  className="h-12 rounded-xl bg-[#2d6a4f] px-6 text-sm font-semibold text-white transition hover:bg-[#24583f] active:scale-[0.98] sm:shrink-0"
                >
                  Create Room
                </button>
              </div>
            </form>
          </div>

          {/* Quick Play Card */}
          <div className="rounded-2xl border border-[#dceee4] bg-[#f7fbf8] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-lg font-bold text-[#2d6a4f] shadow-sm">
              ⚡
            </div>

            <h3 className="mt-6 text-xl font-bold text-gray-900 sm:text-2xl">
              Play a random opponent
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Get matched instantly with another player near your rating. No
              setup, no waiting room — just a board and a clock.
            </p>

            <div className="mt-7">
              <button
                type="button"
                onClick={handleQuickPlay}
                className="flex h-12 w-full items-center justify-center rounded-xl bg-[#2d6a4f] px-6 text-sm font-semibold text-white transition hover:bg-[#24583f] active:scale-[0.98]"
              >
                Quick Play
              </button>
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs text-gray-400">
              <span className="h-2 w-2 rounded-full bg-[#2d6a4f]" />
              Fast matchmaking
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreateRoom;

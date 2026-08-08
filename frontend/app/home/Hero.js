import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          {/* Left Content */}
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2d6a4f]/20 bg-[#2d6a4f]/5 px-3.5 py-1.5">
              <span className="h-2 w-2 rounded-full bg-[#2d6a4f]" />

              <span className="text-sm font-medium text-[#2d6a4f]">
                Play. Improve. Compete.
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl xl:text-7xl">
              Every move
              <br />
              <span className="text-[#2d6a4f]">matters.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              ChessRivo gives you a simple place to play chess online, challenge
              your friends, and sharpen your game without unnecessary
              distractions.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/play"
                className="inline-flex items-center justify-center rounded-lg bg-[#2d6a4f] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#24553f]"
              >
                Play Chess
              </Link>

              <Link
                href="/learn"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                Learn Chess
              </Link>
            </div>

            {/* Small Stats */}
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-gray-200 pt-7">
              <div>
                <p className="text-xl font-bold text-gray-900">5K+</p>

                <p className="mt-1 text-xs text-gray-500">Players</p>
              </div>

              <div className="h-8 w-px bg-gray-200" />

              <div>
                <p className="text-xl font-bold text-gray-900">20K+</p>

                <p className="mt-1 text-xs text-gray-500">Games played</p>
              </div>

              <div className="h-8 w-px bg-gray-200" />

              <div>
                <p className="text-xl font-bold text-gray-900">24/7</p>

                <p className="mt-1 text-xs text-gray-500">Available</p>
              </div>
            </div>
          </div>

          {/* Chess Board */}
          <div className="mx-auto w-full max-w-[520px] lg:ml-auto">
            <div className="relative">
              {/* Board Shadow */}
              <div className="absolute inset-4 translate-y-4 rounded-2xl bg-gray-200/70 blur-2xl" />

              {/* Board */}
              <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-2 shadow-xl sm:rounded-2xl sm:p-3">
                <div className="grid aspect-square grid-cols-8 overflow-hidden rounded-lg">
                  {[
                    "♜",
                    "♞",
                    "♝",
                    "♛",
                    "♚",
                    "♝",
                    "♞",
                    "♜",

                    "♟",
                    "♟",
                    "♟",
                    "♟",
                    "♟",
                    "♟",
                    "♟",
                    "♟",

                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",

                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",

                    "",
                    "",
                    "",
                    "♙",
                    "",
                    "",
                    "",
                    "",

                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",

                    "♙",
                    "♙",
                    "♙",
                    "",
                    "♙",
                    "♙",
                    "♙",
                    "♙",

                    "♖",
                    "♘",
                    "♗",
                    "♕",
                    "♔",
                    "♗",
                    "♘",
                    "♖",
                  ].map((piece, index) => {
                    const row = Math.floor(index / 8);
                    const column = index % 8;

                    const isLight = (row + column) % 2 === 0;

                    return (
                      <div
                        key={index}
                        className={`flex aspect-square items-center justify-center ${
                          isLight ? "bg-[#eeeed2]" : "bg-[#2d6a4f]"
                        }`}
                      >
                        {piece && (
                          <span
                            className={`select-none text-[clamp(1.5rem,6vw,3rem)] leading-none ${
                              index < 16 ? "text-gray-900" : "text-white"
                            }`}
                            style={{
                              textShadow:
                                index < 16
                                  ? "0 1px 1px rgba(255,255,255,0.35)"
                                  : "0 1px 2px rgba(0,0,0,0.35)",
                            }}
                          >
                            {piece}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Board Coordinates */}
                <div className="pointer-events-none absolute bottom-3 left-3 right-3 top-3">
                  <div className="absolute bottom-0 left-0 right-0 flex justify-around px-[1%]">
                    {["a", "b", "c", "d", "e", "f", "g", "h"].map(
                      (letter, index) => (
                        <span
                          key={letter}
                          className={`text-[8px] font-semibold sm:text-[10px] ${
                            index % 2 === 0
                              ? "text-[#2d6a4f]"
                              : "text-[#eeeed2]"
                          }`}
                        >
                          {letter}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </div>

              {/* Game Status */}
              <div className="absolute -bottom-5 left-4 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-lg sm:left-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2d6a4f]/10 text-sm">
                    ♔
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-900">
                      Your move
                    </p>

                    <p className="text-[11px] text-gray-500">White to play</p>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="absolute -right-2 -top-4 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-lg sm:-right-5 sm:-top-5">
                <p className="text-[11px] font-medium text-gray-500">
                  Current rating
                </p>

                <p className="mt-0.5 text-lg font-bold text-gray-900">1248</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

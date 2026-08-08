import Link from "next/link";

export default function PlaySection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* Section Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#2d6a4f]">
              Start a game
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Choose how you want to play.
            </h2>

            <p className="mt-4 text-base leading-7 text-gray-600">
              Whether you want a quick game or a private match with a friend,
              getting started should take only a few seconds.
            </p>
          </div>

          <Link
            href="/play"
            className="inline-flex w-fit items-center rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:border-[#2d6a4f] hover:text-[#2d6a4f]"
          >
            View all games
          </Link>
        </div>

        {/* Play Options */}
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {/* Quick Match */}
          <div className="group relative overflow-hidden rounded-2xl bg-[#2d6a4f] p-7 text-white sm:p-9">
            {/* Decorative Chess Pieces */}
            <div className="pointer-events-none absolute -right-4 -top-8 select-none text-[150px] font-serif leading-none text-white/10">
              ♞
            </div>

            <div className="relative z-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
                Quick Match
              </span>

              <h3 className="mt-4 max-w-md text-2xl font-bold sm:text-3xl">
                Find an opponent and start playing.
              </h3>

              <p className="mt-4 max-w-md text-sm leading-6 text-white/80">
                Jump straight into a game without setting anything up. Get
                matched and focus on your next move.
              </p>

              <Link
                href="/play"
                className="mt-7 inline-flex items-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#2d6a4f] transition-colors hover:bg-gray-100"
              >
                Quick Match
              </Link>
            </div>
          </div>

          {/* Create Room */}
          <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-7 sm:p-9">
            {/* Decorative Chess Piece */}
            <div className="pointer-events-none absolute -right-4 -top-8 select-none text-[150px] font-serif leading-none text-[#2d6a4f]/10">
              ♜
            </div>

            <div className="relative z-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2d6a4f]">
                Private Game
              </span>

              <h3 className="mt-4 max-w-md text-2xl font-bold text-gray-900 sm:text-3xl">
                Play a private game with a friend.
              </h3>

              <p className="mt-4 max-w-md text-sm leading-6 text-gray-600">
                Create your own room and invite someone to play. No complicated
                setup — just create, share and play.
              </p>

              <Link
                href="/play"
                className="mt-7 inline-flex items-center rounded-lg bg-[#2d6a4f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#24553f]"
              >
                Create a Room
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Information */}
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 p-5">
            <p className="text-sm font-semibold text-gray-900">
              No setup required
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Choose a game and get started immediately.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 p-5">
            <p className="text-sm font-semibold text-gray-900">
              Play with friends
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Create a private room whenever you want a friendly match.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 p-5">
            <p className="text-sm font-semibold text-gray-900">
              Built for focus
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              A clean interface keeps the attention on the board.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

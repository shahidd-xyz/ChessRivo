import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-white px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl bg-[#2d6a4f] px-6 py-14 text-center sm:px-10 sm:py-16 lg:px-16">
          {/* Decorative Chess Pieces */}
          <span className="pointer-events-none absolute -left-5 -top-12 select-none font-serif text-[170px] leading-none text-white/[0.06]">
            ♟
          </span>

          <span className="pointer-events-none absolute -bottom-16 -right-5 select-none font-serif text-[190px] leading-none text-white/[0.06]">
            ♞
          </span>

          <div className="relative z-10 mx-auto max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
              Your next game starts here
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to make your move?
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/80 sm:text-base sm:leading-7">
              Start a game, invite a friend, and see where your next move takes
              you.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/play"
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-[#2d6a4f] transition-colors hover:bg-gray-100"
              >
                Start Playing
              </Link>

              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-lg border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

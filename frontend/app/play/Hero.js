"use client";

function Hero() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8">
      {" "}
      <div className="mx-auto max-w-7xl">
        {" "}
        <div className="flex min-h-[70vh] items-center justify-center">
          {" "}
          <div className="flex w-full max-w-3xl flex-col items-center text-center">

            {/* Turn Indicator */}
            <p className="text-sm font-medium text-[#2d6a4f] sm:text-base">
              <span className="inline-flex items-center rounded-xl bg-[#eff8f3] px-3 py-2 font-semibold">
                <span className="mr-2">•••</span>
                It's your turn
              </span>
            </p>
            {/* Heading */}
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
              Make your move
            </h1>
            {/* Description */}
            <p className="mt-5 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base sm:leading-7 md:text-lg">
              Start a private game with someone you know, or jump
              <br className="hidden sm:block" />
              straight into a match.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

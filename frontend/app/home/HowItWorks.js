export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Choose your game",
      description:
        "Start a quick match or create a private room and invite a friend.",
      piece: "♞",
    },
    {
      number: "02",
      title: "Make your moves",
      description:
        "Play in real time on a clean board designed to keep you focused on the game.",
      piece: "♟",
    },
    {
      number: "03",
      title: "Finish the battle",
      description:
        "Checkmate your opponent, review the result and get ready for your next game.",
      piece: "♚",
    },
  ];

  return (
    <section className="border-y border-gray-100 bg-gray-50">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#2d6a4f]">
            How it works
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            From lobby to checkmate.
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-600">
            No complicated setup. Pick how you want to play and get straight to
            the board.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-14">
          {/* Desktop connecting line */}
          <div className="absolute left-[16.66%] right-[16.66%] top-12 hidden h-px bg-gray-300 lg:block" />

          <div className="relative grid gap-10 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative flex flex-col items-center text-center"
              >
                {/* Piece Circle */}
                <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm">
                  <span className="select-none text-5xl leading-none text-[#2d6a4f]">
                    {step.piece}
                  </span>

                  {/* Step Number */}
                  <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#2d6a4f] text-[10px] font-bold text-white">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="mt-6 text-lg font-semibold text-gray-900">
                  {step.title}
                </h3>

                <p className="mt-3 max-w-xs text-sm leading-6 text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Message */}
        <div className="mt-14 flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white px-5 py-2.5">
            <span className="h-2 w-2 rounded-full bg-[#2d6a4f]" />

            <p className="text-sm text-gray-600">
              Your next game is only a few clicks away.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

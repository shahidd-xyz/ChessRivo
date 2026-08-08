export default function Features() {
  const features = [
    {
      number: "01",
      title: "Play with anyone",
      description:
        "Challenge your friends or play against other players and put your chess skills to the test.",
    },
    {
      number: "02",
      title: "Real-time gameplay",
      description:
        "Make your moves instantly and enjoy a smooth multiplayer experience without unnecessary distractions.",
    },
    {
      number: "03",
      title: "Create private rooms",
      description:
        "Create a room and share it with your friends for a private game whenever you want.",
    },
    {
      number: "04",
      title: "Track your progress",
      description:
        "Keep an eye on your games, results and rating as you continue improving your chess.",
    },
  ];

  return (
    <section className="border-t border-gray-100 bg-gray-50">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* Section Header */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#2d6a4f]">
            Why ChessRivo
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to enjoy the game.
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-600">
            ChessRivo keeps the experience focused on what matters — playing
            good chess and having a place to improve.
          </p>
        </div>

        {/* Features */}
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-gray-200 bg-gray-200 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="bg-white p-7 transition-colors hover:bg-[#f8faf9] sm:p-8"
            >
              <span className="text-sm font-semibold text-[#2d6a4f]">
                {feature.number}
              </span>

              <h3 className="mt-8 text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {feature.description}
              </p>

              <div className="mt-7 h-px w-10 bg-[#2d6a4f]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

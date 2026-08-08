export default function StatsSection() {
  const stats = [
    {
      value: "5K+",
      label: "Players",
    },
    {
      value: "20K+",
      label: "Games Played",
    },
    {
      value: "50K+",
      label: "Moves Made",
    },
    {
      value: "24/7",
      label: "Always Available",
    },
  ];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
          <div className="grid grid-cols-2 divide-x divide-y divide-gray-200 lg:grid-cols-4 lg:divide-y-0">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="px-5 py-8 text-center sm:px-8 sm:py-10"
              >
                <p className="text-3xl font-bold tracking-tight text-[#2d6a4f] sm:text-4xl">
                  {stat.value}
                </p>

                <p className="mt-2 text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

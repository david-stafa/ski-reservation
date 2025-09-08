interface AvailabilityDisplayProps {
  reservations: Record<string, { _count: number; startDate: Date }> & {
    _total: number;
  };
}

const SKI_SETS_PER_DAY = 24;
// const SKI_SETS_TOTAL = SKI_SETS_PER_DAY * 7;

const DAYS_CONFIG = [
  { key: "2025-10-13", label: "Pondělí" },
  { key: "2025-10-14", label: "Úterý" },
  { key: "2025-10-15", label: "Středa" },
  { key: "2025-10-16", label: "Čtvrtek" },
  { key: "2025-10-17", label: "Pátek" },
  { key: "2025-10-20", label: "Pondělí" },
  { key: "2025-10-21", label: "Úterý" },
  { key: "2025-10-22", label: "Středa" },
  { key: "2025-10-23", label: "Čtvrtek" },
  { key: "2025-10-24", label: "Pátek" },
];

export default function AvailabilityDisplay({
  reservations,
}: AvailabilityDisplayProps) {
  return (
    <div className="text-zinc-700 text-sm md:mt-10">
      {/* Total Available */}
      <div className="mb-2">
        <p className="font-semibold text-base">Dostupnost termínů</p>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-2 text-base font">
        <p>1. - 17. října</p>
        <p>20. - 24. října</p>
      </div>

      {/* Daily Breakdown */}
      <div className="grid grid-flow-col grid-rows-5 gap-1">
        {DAYS_CONFIG.map(({ key, label }) => {
          const available = SKI_SETS_PER_DAY - (reservations[key]?._count || 0);
          const isLow = available <= 5;
          const isFull = available === 0;

          return (
            <div key={key} className="flex items-center gap-2">
              <span className="text-zinc-600 min-w-14">{label}</span>
              <span
                className={`rounded-full w-2 h-2 my-auto ${
                  isFull
                    ? "bg-red-600"
                    : isLow
                      ? "bg-yellow-600"
                      : "bg-green-600"
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* <section className="w-full flex gap-4 mt-4 text-zinc-600">
        <div className="flex items-center gap-1 ">
          <span className="rounded-full w-2 h-2 bg-red-600 text-xs" />
          <span className="text-xs">Obsazeno</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="rounded-full w-2 h-2 bg-yellow-600 text-xs" />
          <span className="text-xs">Poslední termíny</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="rounded-full w-2 h-2 bg-green-600 text-xs" />
          <span className="text-xs">Volné termíny</span>
        </div>
      </section> */}
    </div>
  );
}

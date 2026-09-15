import { DAYS_CONFIG } from "@/lib/constants";
import { DateTime } from "luxon";
import Link from "next/link";

const formatWeekRange = (keys: string[]) => {
  const from = DateTime.fromISO(keys[0]).setLocale("cs");
  const to = DateTime.fromISO(keys[keys.length - 1]).setLocale("cs");
  return `${from.toFormat("d.")} - ${to.toFormat("d. MMMM")}`;
};

export const SeasonalReservationsDaily = () => {
  const keys = DAYS_CONFIG.map(({ key }) => key);
  const firstWeek = keys.filter((key) => DateTime.fromISO(key) < DateTime.fromISO(keys[0]).plus({ weeks: 1 }));
  const secondWeek = keys.filter((key) => !firstWeek.includes(key));

  return (
    <section className="mb-8">
      <h3 className="text-xl font-bold mb-4 text-left">Celoroční sety:</h3>
      <div className="grid grid-cols-2 gap-10 mb-2 text-base font-semibold">
        <p>{formatWeekRange(firstWeek)}</p>
        <p>{formatWeekRange(secondWeek)}</p>
      </div>
      {/* Grid for days */}
      <div className="grid grid-flow-col grid-rows-5 md:gap-x-10 gap-x-4 gap-y-4">
        {DAYS_CONFIG.map(({ key, label, color }) => (
          <Link
            key={key}
            href={`/admin/reservations/day-sheet?date=${key}`}
            className={`md:text-lg ${color} font-semibold px-4 rounded-lg md:py-8 py-4`}
          >
            {label}
          </Link>
        ))}
      </div>
    </section>
  );
};

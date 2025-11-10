import { getCachedSumOfSeasonalReservations } from "@/app/_actions/seasonalReservation/seasonalReservationActions";
import { SEASONAL_STARTDATE, TIMESLOTS } from "@/lib/constants";

const SKIPPED_DAYS = [5, 6];

/**
 * @param week - The week to display the availability for (0 for first week, 1 for second week)
 * @returns The availability for the week
 */
export default async function SeasonalAvailabilityWeekly({week}: {week: 0 | 1}) {
  const displayWeek = SEASONAL_STARTDATE.startOf("week").plus({ weeks: week });
  const reservations = await getCachedSumOfSeasonalReservations();

  return (
    <div className="text-zinc-600 text-sm">
      <div className="grid grid-cols-1 mb-1 text-base font-semibold">
        <p>
          {displayWeek.toFormat("dd.")} -{" "}
          {displayWeek.endOf("week").toFormat("dd.")}
        </p>
      </div>

      {/* Daily Breakdown */}
      <div className="grid grid-flow-col grid-rows-5 gap-1">
        {Array.from({ length: 7 }).map((_, index) => {
          if (SKIPPED_DAYS.includes(index)) {
            return null;
          }

          const date = displayWeek.plus({ days: index });
          const key = date.toFormat("yyyy-MM-dd");
          const label = date.setLocale("cs").toFormat("EEEE");

          const available =
            TIMESLOTS.length - (reservations?.[key]?._count || 0);
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
    </div>
  );
}

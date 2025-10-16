import { SKI_SETS_PER_DAY, START_OF_THE_WEEK, SEASONAL_STARTDATE } from "@/lib/constants";
import { getCachedReservationsByThisAndNextWeek } from "@/app/_actions/reservation/reservationActions";
import { DateTime } from "luxon";

export default async function AvailabilityDisplay() {

  // Do not display the availability display before the reservation started
  const isBefore = false;
  if (isBefore) return null;

  const currentWeek = isBefore ? SEASONAL_STARTDATE.startOf("week") : DateTime.now().startOf("week");
  const nextWeek = currentWeek.plus({ weeks: 1 });

  const reservations = await getCachedReservationsByThisAndNextWeek()

  return (
    <div className="text-zinc-600 text-sm">
      {/* Total Available */}
      <div className="mb-2">
        <p className="text-lg font-bold text-black">Dostupnost termínů</p>
      </div>

      <div className="grid grid-cols-2 mb-1 text-base font-semibold">
        <p>{currentWeek.toFormat("dd.")} - {currentWeek.endOf("week").minus({ days: 2 }).toFormat("dd.")}</p>
        <p>{nextWeek.toFormat("dd.")} - {nextWeek.endOf("week").minus({ days: 2 }).toFormat("dd.")}</p>
      </div>

      {/* Daily Breakdown */}
      <div className="grid grid-flow-col grid-rows-5 gap-1">
        {Array.from({ length: 14 }).map((_, index) => {
          if (index === 5 || index === 6 || index === 12 || index === 13) {
            return null;
          }

          const key = START_OF_THE_WEEK.plus({ days: index }).toFormat(
            "yyyy-MM-dd"
          );
          const label = START_OF_THE_WEEK.plus({ days: index })
            .setLocale("cs")
            .toFormat("EEEE");

          const available = SKI_SETS_PER_DAY - (reservations?.[key]?._count || 0);
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

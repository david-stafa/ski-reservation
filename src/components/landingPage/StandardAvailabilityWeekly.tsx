import { getCachedReservationsByWeek } from "@/app/_actions/reservation/reservationActions";
import { STANDARD_TIME_SLOTS, WeekDay } from "@/lib/constants";
import { DateTime } from "luxon";
import { isDisabledDay } from "./helpers/helpers";

const SKIPPED_DAYS = [3, 6]; // skipped days in the availability display

export default async function StandardAvailabilityWeekly({dayInWeek}: {dayInWeek: DateTime}) {
  const currentWeek = dayInWeek.startOf("week");

  const reservations = await getCachedReservationsByWeek(dayInWeek);

  return (
    <div className="text-zinc-600 text-sm">
      {/* Total Available */}
      <div className="grid grid-cols-1 mb-1 text-base font-semibold">
        <p>
          {currentWeek.toFormat("dd.")} -{" "}
          {currentWeek.endOf("week").toFormat("dd.")}
        </p>
      </div>

      {/* Daily Breakdown */}
      <div className="grid grid-flow-col grid-rows-5 gap-1">
        {Array.from({ length: 7 }).map((_, index) => {
          if (SKIPPED_DAYS.includes(index)) {
            return null;
          }

          const date = currentWeek.plus({ days: index });
          const key = date.toFormat("yyyy-MM-dd");
          const label = date.setLocale("cs").toFormat("EEEE");

          const available =
            STANDARD_TIME_SLOTS[date.weekday as WeekDay].length -
            (reservations?.[key]?._count || 0);
          const isLow = available <= 5;
          const isFull = available === 0;
          const isDisabled = isDisabledDay(date);

          return (
            <div key={key} className="flex items-center gap-2">
              <span className="text-zinc-600 min-w-14">{label}</span>
              <span
                className={`rounded-full w-2 h-2 my-auto ${
                  isDisabled || isFull
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

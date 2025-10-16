import { SKI_SETS_PER_DAY, START_OF_THE_WEEK } from "@/lib/constants";
import { getCachedReservationsByThisAndNextWeek } from "@/app/_actions/reservation/reservationActions";

const ConsecutiveTwoWeekAvailability = async () => {
  const reservations = await getCachedReservationsByThisAndNextWeek();
  return (
    <>
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

        const available = SKI_SETS_PER_DAY - (reservations[key]?._count || 0);
        const isLow = available <= 5;
        const isFull = available === 0;

        return (
          <div key={key} className="flex items-center gap-2">
            <span className="text-zinc-600 min-w-14">{label}</span>
            <span
              className={`rounded-full w-2 h-2 my-auto ${
                isFull ? "bg-red-600" : isLow ? "bg-yellow-600" : "bg-green-600"
              }`}
            />
          </div>
        );
      })}
    </>
  );
};

export default ConsecutiveTwoWeekAvailability;

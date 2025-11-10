import {
  NOW,
  SEASONAL_STARTDATE,
  STANDARD_ENDDATE,
  STANDARD_STARTDATE,
} from "@/lib/constants";
import SeasonalAvailabilityWeekly from "./SeasonalAvailabilityWeekly";
import StandardAvailabilityWeekly from "./StandardAvailabilityWeekly";

export default async function AvailabilityDisplay() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Dostupnost rezervací</h2>
      <div className="flex gap-20">
        {/* Seasonal reservation availability */}
        {NOW < SEASONAL_STARTDATE.plus({ weeks: 1 }) && (
          <>
            <SeasonalAvailabilityWeekly week={0} />
            <SeasonalAvailabilityWeekly week={1} />
          </>
        )}

        {/* Second week of seasonal reservation availability and first week of standard reservation availability */}
        {NOW >= SEASONAL_STARTDATE.plus({ weeks: 1 }) &&
          NOW < STANDARD_STARTDATE && (
            <>
              <SeasonalAvailabilityWeekly week={1} />
              <StandardAvailabilityWeekly dayInWeek={NOW.plus({ weeks: 1 })} />
            </>
          )}

        {/* Standard reservation availability */}
        {NOW >= STANDARD_STARTDATE && NOW <= STANDARD_ENDDATE && (
          <>
            <StandardAvailabilityWeekly dayInWeek={NOW} />
            <StandardAvailabilityWeekly dayInWeek={NOW.plus({ weeks: 1 })} />
          </>
        )}
      </div>
    </div>
  );
}

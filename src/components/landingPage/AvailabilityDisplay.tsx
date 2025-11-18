import {
  SEASONAL_STARTDATE,
  STANDARD_ENDDATE,
  STANDARD_STARTDATE,
} from "@/lib/constants";
import { NOW } from "@/lib/utils";
import SeasonalAvailabilityWeekly from "./SeasonalAvailabilityWeekly";
import StandardAvailabilityWeekly from "./StandardAvailabilityWeekly";

export default async function AvailabilityDisplay() {
  const now = NOW();
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Dostupnost rezervací</h2>
      <div className="flex gap-20">
        {/* Seasonal reservation availability */}
        {now < SEASONAL_STARTDATE.plus({ weeks: 1 }) && (
          <>
            <SeasonalAvailabilityWeekly week={0} />
            <SeasonalAvailabilityWeekly week={1} />
          </>
        )}

        {/* Second week of seasonal reservation availability and first week of standard reservation availability */}
        {now >= SEASONAL_STARTDATE.plus({ weeks: 1 }) &&
          now < STANDARD_STARTDATE && (
            <>
              <SeasonalAvailabilityWeekly week={1} />
              <StandardAvailabilityWeekly dayInWeek={now.plus({ weeks: 1 })} />
            </>
          )}

        {/* Standard reservation availability */}
        {now >= STANDARD_STARTDATE && now <= STANDARD_ENDDATE && (
          <>
            <StandardAvailabilityWeekly dayInWeek={now} />
            <StandardAvailabilityWeekly dayInWeek={now.plus({ weeks: 1 })} />
          </>
        )}
      </div>
    </div>
  );
}

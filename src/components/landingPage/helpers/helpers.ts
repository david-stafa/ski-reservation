import { STANDARD_HOLIDAYS, STANDARD_WHEN_TO_DISABLE_FRIDAY } from "@/lib/constants";
import { DateTime } from "luxon";

export const isDisabledDay = (date: DateTime) => {
    
    if (date >= STANDARD_WHEN_TO_DISABLE_FRIDAY && date.weekday === 5) return true;

    for (const holiday of STANDARD_HOLIDAYS) {
        if (date >= holiday.from && date <= holiday.to) return true;
    }

    return false
}
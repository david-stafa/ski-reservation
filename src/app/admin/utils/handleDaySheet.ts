import { DateTime } from "luxon"

export const handleDaySheet = (date: string) => {
    const nextDay = DateTime.fromISO(date).plus({ days: 1 }).toFormat("yyyy-MM-dd");
    const previousDay = DateTime.fromISO(date).minus({ days: 1 }).toFormat("yyyy-MM-dd");

    return {
        nextDay,
        previousDay
    }
}
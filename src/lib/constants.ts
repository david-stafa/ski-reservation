import { DateTime } from "luxon";

export const STARTDATE = "2025-10-13";
export const ENDDATE = "2025-10-24";
export const SINGLE_RESERVATION_DURATION = 15; // in minutes
// Countdown end instant for opening; explicit timezone to avoid edge/local ambiguity
export const COUNTDOWN_END = DateTime.fromObject({ year: 2025, month: 9, day: 26, hour: 8 }, { zone: "Europe/Prague" })

export const RESTRICTED_TIMESLOTS: Record<number, string[]> = {
  2: ["18:45:00"], // restricted time slot for 2 people
  3: ["18:45:00", "18:30:00"], // restricted time slot for 3 people
  // Add more if needed
};

type TimeString = `${number}:${number}:${number}`;
export const TIMESLOTS: TimeString[] = [
  "15:00:00",
  "15:15:00",
  "15:30:00",
  "15:45:00",
  "16:00:00",
  "16:15:00",
  "16:30:00",
  "16:45:00",
  "17:00:00",
  "17:15:00",
  "17:30:00",
  "17:45:00",
  "18:00:00",
  "18:15:00",
  "18:30:00",
  "18:45:00",
];

export const DAY_TIMESLOTS_COUNT = TIMESLOTS.length; // 16

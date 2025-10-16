import { DateTime } from "luxon";

/**
 * SEASONAL RESERVATION CONFIGURATION
 */

// Countdown end instant for opening; explicit timezone to avoid edge/local ambiguity
export const COUNTDOWN_END = DateTime.fromObject(
  { year: 2025, month: 9, day: 26, hour: 8 },
  { zone: "Europe/Prague" }
);

export const SEASONAL_STARTDATE = DateTime.fromISO("2025-10-13", { zone: "Europe/Prague" }); // first day that people can make a reservation
export const SEASONAL_ENDDATE = DateTime.fromISO("2025-10-24", { zone: "Europe/Prague" }); // last day that people can make a reservation
export const SINGLE_RESERVATION_DURATION = 15; // in minutes
export const SKI_SETS_LIMIT = 120; // total number of ski sets that can be reserved

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

export const RESTRICTED_TIMESLOTS: Record<number, string[]> = {
  2: ["18:45:00"], // restricted time slot for 2 people
  3: ["18:45:00", "18:30:00"], // restricted time slot for 3 people
};

// TODO: remove this constant
export const SKI_SETS_PER_DAY = TIMESLOTS.length;
export const DAY_TIMESLOTS_COUNT = TIMESLOTS.length; // 16

// Landing/Admin: Days configuration with styling
export const DAYS_CONFIG: Array<{
  key: string;
  label: string;
  color: string; // Tailwind classes for bg/text that look good in UI
}> = [
  { key: "2025-10-13", label: "Pondělí", color: "bg-blue-50 text-blue-600" },
  { key: "2025-10-14", label: "Úterý", color: "bg-green-50 text-green-600" },
  { key: "2025-10-15", label: "Středa", color: "bg-yellow-50 text-yellow-600" },
  {
    key: "2025-10-16",
    label: "Čtvrtek",
    color: "bg-purple-50 text-purple-600",
  },
  { key: "2025-10-17", label: "Pátek", color: "bg-orange-50 text-orange-600" },
  { key: "2025-10-20", label: "Pondělí", color: "bg-cyan-50 text-cyan-600" },
  { key: "2025-10-21", label: "Úterý", color: "bg-pink-50 text-pink-600" },
  { key: "2025-10-22", label: "Středa", color: "bg-lime-50 text-lime-600" },
  { key: "2025-10-23", label: "Čtvrtek", color: "bg-amber-50 text-amber-600" },
  { key: "2025-10-24", label: "Pátek", color: "bg-indigo-50 text-indigo-600" },
];

export const NOW = DateTime.local({ zone: "Europe/Prague" });
export const START_OF_THE_WEEK = NOW.startOf("week");

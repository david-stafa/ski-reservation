import { DateTime } from "luxon";

/**
 * SEASONAL RESERVATION CONFIGURATION
 */

// Countdown end instant for opening; explicit timezone to avoid edge/local ambiguity
export const SEASONAL_COUNTDOWN_END = DateTime.fromObject(
  { year: 2025, month: 9, day: 26, hour: 8 },
  { zone: "Europe/Prague" }
);
export const SEASONAL_STARTDATE = DateTime.fromISO("2025-10-13", {
  zone: "Europe/Prague",
}); // first day that people can make a reservation
export const SEASONAL_ENDDATE = DateTime.fromISO("2025-10-24", {
  zone: "Europe/Prague",
}); // last day that people can make a reservation
export const SINGLE_RESERVATION_DURATION = 15; // in minutes
export const SEASONAL_SKI_SETS_LIMIT = 120; // total number of ski sets that can be reserved

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

/**
 * STANDARD RESERVATION CONFIGURATION
 *
 */
export const STANDARD_COUNTDOWN_END = DateTime.fromObject(
  { year: 2025, month: 10, day: 18, hour: 8 },
  { zone: "Europe/Prague" }
);
export const STANDARD_STARTDATE = DateTime.fromISO("2025-10-27", {
  zone: "Europe/Prague",
}); // first day that people can make a reservation
export const STANDARD_ENDDATE = DateTime.fromISO("2026-03-20", {
  zone: "Europe/Prague",
}); // last day that people can make a reservation

export const STANDARD_TIME_SLOTS_SATURDAY: TimeString[] = [
  "09:00:00",
  "09:15:00",
  "09:30:00",
  "09:45:00",
  "10:00:00",
  "10:15:00",
  "10:30:00",
  "10:45:00",
  "11:00:00",
  "11:15:00",
];

export const STANDARD_TIME_SLOTS_WEEKDAY: TimeString[] = [
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

export enum WeekDay {
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
  SUNDAY = 7,
}

export const STANDARD_TIME_SLOTS: Record<WeekDay, TimeString[]> = {
  1: [...STANDARD_TIME_SLOTS_WEEKDAY],
  2: [...STANDARD_TIME_SLOTS_WEEKDAY],
  3: [...STANDARD_TIME_SLOTS_WEEKDAY],
  4: [],
  5: [...STANDARD_TIME_SLOTS_WEEKDAY],
  6: [...STANDARD_TIME_SLOTS_SATURDAY],
  7: [],
};

export const STANDARD_HOLIDAYS: {from: DateTime, to: DateTime}[] = [
  {from: DateTime.fromISO("2025-11-17", { zone: "Europe/Prague" }), to: DateTime.fromISO("2025-11-17", { zone: "Europe/Prague" })}, // Den boje za svobodu a demokracii a Mezinárodní den studentstva
  {from: DateTime.fromISO("2025-12-15", { zone: "Europe/Prague" }), to: DateTime.fromISO("2025-12-16", { zone: "Europe/Prague" })}, // Michal hory
  {from: DateTime.fromISO("2025-12-24", { zone: "Europe/Prague" }), to: DateTime.fromISO("2025-12-27", { zone: "Europe/Prague" })}, // Vánoce
  {from: DateTime.fromISO("2026-01-01", { zone: "Europe/Prague" }), to: DateTime.fromISO("2026-01-01", { zone: "Europe/Prague" })}, // Nový rok
]

export const STANDARD_WHEN_TO_DISABLE_FRIDAY = DateTime.fromISO('2026-01-01', { zone: "Europe/Prague" });

export const SEASONAL_HOLIDAYS: {from: DateTime, to: DateTime}[] = [];

import { DateTime } from "luxon";

/**
 * SEASONAL RESERVATION CONFIGURATION
 */

// Countdown end instant for opening; explicit timezone to avoid edge/local ambiguity
export const SEASONAL_COUNTDOWN_END = DateTime.fromObject(
  { year: 2026, month: 10, day: 1, hour: 8 },
  { zone: "Europe/Prague" }
);
export const SEASONAL_STARTDATE = DateTime.fromISO("2026-10-05", {
  zone: "Europe/Prague",
}); // first day that people can make a reservation (must be a Monday)
export const SEASONAL_ENDDATE = DateTime.fromISO("2026-10-15", {
  zone: "Europe/Prague",
}); // last day that people can make a reservation (Friday 16. 10. is closed)
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
  { key: "2026-10-05", label: "Pondělí", color: "bg-blue-50 text-blue-600" },
  { key: "2026-10-06", label: "Úterý", color: "bg-green-50 text-green-600" },
  { key: "2026-10-07", label: "Středa", color: "bg-yellow-50 text-yellow-600" },
  {
    key: "2026-10-08",
    label: "Čtvrtek",
    color: "bg-purple-50 text-purple-600",
  },
  { key: "2026-10-09", label: "Pátek", color: "bg-orange-50 text-orange-600" },
  { key: "2026-10-12", label: "Pondělí", color: "bg-cyan-50 text-cyan-600" },
  { key: "2026-10-13", label: "Úterý", color: "bg-pink-50 text-pink-600" },
  { key: "2026-10-14", label: "Středa", color: "bg-lime-50 text-lime-600" },
  { key: "2026-10-15", label: "Čtvrtek", color: "bg-amber-50 text-amber-600" },
];

/**
 * STANDARD RESERVATION CONFIGURATION
 *
 */
export const STANDARD_COUNTDOWN_END = DateTime.fromObject(
  { year: 2026, month: 10, day: 19, hour: 8 },
  { zone: "Europe/Prague" }
);
export const STANDARD_STARTDATE = DateTime.fromISO("2026-10-19", {
  zone: "Europe/Prague",
}); // first day that people can make a reservation
export const STANDARD_ENDDATE = DateTime.fromISO("2027-03-31", {
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
  {from: DateTime.fromISO("2026-10-28", { zone: "Europe/Prague" }), to: DateTime.fromISO("2026-10-28", { zone: "Europe/Prague" })}, // Den vzniku samostatného československého státu
  {from: DateTime.fromISO("2026-11-17", { zone: "Europe/Prague" }), to: DateTime.fromISO("2026-11-17", { zone: "Europe/Prague" })}, // Den boje za svobodu a demokracii a Mezinárodní den studentstva
  {from: DateTime.fromISO("2026-12-24", { zone: "Europe/Prague" }), to: DateTime.fromISO("2027-01-01", { zone: "Europe/Prague" })}, // Vánoce a Nový rok
  {from: DateTime.fromISO("2027-03-26", { zone: "Europe/Prague" }), to: DateTime.fromISO("2027-03-26", { zone: "Europe/Prague" })}, // Velký pátek
  {from: DateTime.fromISO("2027-03-29", { zone: "Europe/Prague" }), to: DateTime.fromISO("2027-03-29", { zone: "Europe/Prague" })}, // Velikonoční pondělí
]

export const STANDARD_WHEN_TO_DISABLE_FRIDAY = DateTime.fromISO('2027-01-01', { zone: "Europe/Prague" });

export const SEASONAL_HOLIDAYS: {from: DateTime, to: DateTime}[] = [
  {from: DateTime.fromISO("2026-10-16", { zone: "Europe/Prague" }), to: DateTime.fromISO("2026-10-16", { zone: "Europe/Prague" })}, // Pátek 16. 10. zavřeno
];

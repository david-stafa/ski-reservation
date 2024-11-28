import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { DateTimeType } from "./types/dateTypes";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(time: DateTimeType): [number, number, number] {
  const timeArray = time.split(":").map((part) => +part);

  return [timeArray[0], timeArray[1], timeArray[2]];
}

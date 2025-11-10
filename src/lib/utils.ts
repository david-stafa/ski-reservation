import { clsx, type ClassValue } from "clsx";
import { DateTime } from "luxon";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// TODO - finish phone number format
export function phoneNumFormat(telNum: string | undefined) {
  if (telNum == undefined) return;

  let formattedNum: string[] = telNum.split("");

  if (formattedNum.length == 3) {
    formattedNum = telNum.split("");
    formattedNum.push(" ");
  }
}

export function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("cs-CZ", {
    weekday: "short",
    day: "numeric",
    month: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function formatPhone(phone: string) {
  const cleaned = phone.replace(/\D/g, "");
  const match = cleaned.match(/(\d{3})(\d{3})(\d{3})/);
  if (match) {
    return `${match[1]} ${match[2]} ${match[3]}`;
  }
  return phone;
}

export function now(){
  return DateTime.now().setZone("Europe/Prague");
}

const COLORS = [
  "bg-sky-50 text-sky-600",
  "bg-teal-50 text-teal-600",
  "bg-amber-50 text-amber-600",
  "bg-violet-50 text-violet-600",
  "bg-rose-50 text-rose-600",
  "bg-emerald-50 text-emerald-600",
  "bg-fuchsia-50 text-fuchsia-600",
];

export function getColorByIndex(index: number) {
  return COLORS[index % COLORS.length];
}
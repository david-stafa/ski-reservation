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

export function NOW(){
  return DateTime.now().setZone("Europe/Prague");
}

// Add this mapping object (maybe in utils.ts or at the top of the component)
export const COLOR_CLASSES = {
  0: {
    bg: "bg-sky-50",
    text: "text-sky-600",
    border: "border-sky-600/50",
  },
  1: {
    bg: "bg-teal-50",
    text: "text-teal-600",
    border: "border-teal-600/50",
  },
  2: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    border: "border-amber-600/50",
  },
  3: {
    bg: "bg-violet-50",
    text: "text-violet-600",
    border: "border-violet-600/50",
  },
  4: {
    bg: "bg-rose-50",
    text: "text-rose-600",
    border: "border-rose-600/50",
  },
  5: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-600/50",
  },
  6: {
    bg: "bg-fuchsia-50",
    text: "text-fuchsia-600",
    border: "border-fuchsia-600/50",
  },
} as const;
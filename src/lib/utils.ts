import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// TODO - finish phone number format
export function phoneNumFormat(telNum:string | undefined){

  if (telNum == undefined) return

  let formattedNum: string[] = telNum.split("")

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

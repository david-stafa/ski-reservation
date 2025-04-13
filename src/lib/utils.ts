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

  console.log(formattedNum);
}

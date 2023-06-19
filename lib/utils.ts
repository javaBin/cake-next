import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const avg = (numbers: number[]) => numbers && numbers.length > 0 ?
  numbers.reduce((p, c) => p + c) / numbers.length : -1;

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type CxInput = Parameters<typeof clsx>[number];

export function cn(...inputs: CxInput[]) {
  return twMerge(clsx(inputs));
}

import clsx from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...o: Parameters<typeof clsx>) {
  return twMerge(clsx(o))
}

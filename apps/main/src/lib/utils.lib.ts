import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    ...options,
  }).format(new Date(date));
}

export function getOGImage(title: string) {
  return `https://workers.mupin.dev/og?title=${title}&origin=main`;
}

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const WORKERS_URL = "https://workers.mupin.dev";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
    ...options,
  }).format(new Date(date));
}

export function getOGImage(title: string, origin: string) {
  return `${WORKERS_URL}/og?title=${title}&origin=${origin}`;
}

export function getWorkersAsset(path: string) {
  return `${WORKERS_URL}${path}`;
}

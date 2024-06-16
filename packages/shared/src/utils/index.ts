import { twMerge } from "tailwind-merge";
import { ClassValue, clsx } from "clsx";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(...inputs));
};

export const formatDate = (date: string | Date, options?: Intl.DateTimeFormatOptions) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    ...options,
  }).format(new Date(date));
};

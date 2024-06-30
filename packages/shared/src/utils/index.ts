import { twMerge } from "tailwind-merge";
import { ClassValue, clsx } from "clsx";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(...inputs));
};

export const formatDate = (
  date: string | Date,
  options?: Intl.DateTimeFormatOptions,
  locale: string = "en-US"
) => {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    ...options,
  }).format(new Date(date));
};

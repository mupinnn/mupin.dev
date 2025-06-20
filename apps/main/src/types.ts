import { z } from "astro:content";

export const LocaleSchema = z.union([z.literal("en"), z.literal("id")]);
export type Locale = z.infer<typeof LocaleSchema>;

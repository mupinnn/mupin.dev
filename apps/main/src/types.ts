import { z } from "astro/zod";

export const LocaleSchema = z.union([z.literal("en"), z.literal("id")]);
export type Locale = z.infer<typeof LocaleSchema>;

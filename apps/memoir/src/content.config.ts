import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const memoir = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content" }),
  schema: z.object({
    title: z.string(),
    publishedAt: z.coerce.date(),
  }),
});

export const collections = { memoir };

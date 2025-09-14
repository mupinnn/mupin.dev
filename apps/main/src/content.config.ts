import { defineCollection, z } from "astro:content";
import { glob, type Loader } from "astro/loaders";
import { getOGImage } from "@mupin.dev/shared/lib/utils.lib.ts";
import { LocaleSchema, type Locale } from "./types";

function blogContentLoader(): Loader {
  const defaultGlob = glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" });
  const localeLanguageNameMap = {
    id: "Bahasa Indonesia (Indonesian)",
    en: "English",
  };

  return {
    ...defaultGlob,
    async load(ctx) {
      await defaultGlob.load({
        ...ctx,
        async parseData(entry) {
          let path = "",
            locale: Locale = "en";

          if (entry.filePath) {
            const splittedPath = entry.filePath.split("/");
            locale = splittedPath.pop()?.split(".").shift()! as Locale;
            path = splittedPath.join("/");
          }

          return ctx.parseData({
            ...entry,
            data: {
              ...entry.data,
              path,
              locale,
              languageName: localeLanguageNameMap[locale],
              ogImage: getOGImage(entry.data.title as string),
            },
          });
        },
      });
    },
  };
}

const blog = defineCollection({
  loader: blogContentLoader(),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    slug: z.string(),
    isPublished: z.boolean(),
    publishedAt: z.coerce.date(),
    tags: z.array(z.string()),
    path: z.string(),
    locale: LocaleSchema,
    languageName: z.string(),
    ogImage: z.string(),
  }),
});

const page = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/page" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      githubUrl: z.string().optional(),
      appUrl: z.string().optional(),
      thumbnail: image(),
      stacksIcon: z.array(z.string()),
    }),
});

export const collections = { blog, page, projects };

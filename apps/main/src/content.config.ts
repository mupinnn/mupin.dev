import { defineCollection, z } from "astro:content";
import { glob, type Loader } from "astro/loaders";
import { LocaleSchema, type Locale } from "./types";

function blogContentLoader(): Loader {
  const defaultGlob = glob({ pattern: "dummy-article/*.{md,mdx}", base: "./src/content/blog" });
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
  }),
});

export const collections = { blog };

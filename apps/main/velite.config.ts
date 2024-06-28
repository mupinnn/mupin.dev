import { defineConfig, defineCollection, s } from "velite";

const pages = defineCollection({
  name: "Page",
  pattern: "pages/**/*.mdx",
  schema: s
    .object({
      title: s.string(),
      slug: s.slug("post"),
      path: s.path(),
      description: s.string().optional(),
      body: s.mdx(),
    })
    .transform(data => ({ ...data, locale: data.path.split("/").pop() })),
});

export default defineConfig({
  collections: { pages },
});

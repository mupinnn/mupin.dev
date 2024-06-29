import { defineConfig, defineCollection, s } from "velite";

const pages = defineCollection({
  name: "Page",
  pattern: "pages/**/*.mdx",
  schema: s
    .object({
      title: s.string(),
      path: s.path(),
      description: s.string().optional(),
      body: s.mdx(),
    })
    .transform(data => {
      const splittedPath = data.path.split("/");
      return {
        ...data,
        locale: splittedPath[2],
        slug: splittedPath[1],
      };
    }),
});

export default defineConfig({
  collections: { pages },
});

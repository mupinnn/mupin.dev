import { defineConfig, s } from "velite";

export default defineConfig({
  collections: {
    posts: {
      name: "Post", // collection type name
      pattern: "posts/**/*.md", // content files glob pattern
      schema: s
        .object({
          title: s.string().max(99), // Zod primitive type
          slug: s.slug("posts"), // validate format, unique in posts collection
          metadata: s.metadata(), // extract markdown reading-time, word-count, etc.
          content: s.markdown(), // transform markdown to html
        })
        .transform(data => ({ ...data, permalink: `/blog/${data.slug}` })),
    },
  },
});

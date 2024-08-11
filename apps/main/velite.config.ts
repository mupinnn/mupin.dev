import { defineConfig, defineCollection, s, defineSchema } from "velite";
import { exec } from "child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);
const gitTimestamp = defineSchema(() => {
  return s
    .custom<string | undefined>(i => i === undefined || typeof i === "string")
    .transform<string>(async (value, { meta, addIssue }) => {
      if (value !== null) {
        addIssue({
          fatal: false,
          code: "custom",
          message: "`s.timestamp()` schema will resolve the value from `git log -1 --format=%cd`",
        });
      }

      const { stdout } = await execAsync(`git log -1 --format=%cd ${meta.path}`);

      if (stdout === "") return new Date().toISOString();
      return new Date(stdout).toISOString();
    });
});

const pages = defineCollection({
  name: "Page",
  pattern: "pages/**/*.mdx",
  schema: s
    .object({
      title: s.string(),
      path: s.path(),
      description: s.string().optional(),
      body: s.mdx(),
      lastUpdatedAt: gitTimestamp(),
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

const blog = defineCollection({
  name: "Blog",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
      title: s.string(),
      path: s.path(),
      description: s.string(),
      body: s.mdx(),
      publishedAt: s.isodate(),
      lastUpdatedAt: gitTimestamp(),
      slug: s.slug("blog"),
    })
    .transform(data => {
      const splittedPath = data.path.split("/");
      return {
        ...data,
        locale: splittedPath[2],
      };
    }),
});

export default defineConfig({
  collections: { pages, blog },
});

import { defineConfig, defineCollection, s, defineSchema } from "velite";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import type { Options as AutoLinkOptions } from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { toString as hastToString } from "hast-util-to-string";
import type { Root } from "hast";
import type { Transformer } from "unified";
import { visit } from "unist-util-visit";
import { fromHtmlIsomorphic } from "hast-util-from-html-isomorphic";
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
      metadata: s.metadata(),
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
      isPublished: s.boolean({ coerce: true }).optional().default(false),
      tags: s.array(s.string()).default([]),
      metadata: s.metadata(),
    })
    .transform(data => {
      const splittedPath = data.path.split("/");
      return {
        ...data,
        locale: splittedPath[2],
        slugByDefaultLocale: splittedPath[1],
      };
    }),
});

/**
 * borrowed from Astro
 * @see https://github.com/withastro/docs/blob/5b765bbaf08c52f2c2281f5f0c6413117a8cc126/plugins/rehype-autolink.ts#L50
 */
function rehypei18nAutolinkHeadings() {
  const transformer: Transformer<Root> = (tree, file) => {
    const splittedFilePath = file.path.split("/");
    const pageLang = splittedFilePath[splittedFilePath.length - 1]?.split(".")[0];

    visit(tree, "element", (node, index, parent) => {
      const isParentHeading =
        parent?.type === "element" &&
        ["h1", "h2", "h3", "h4", "h5", "h6"].includes(parent?.tagName);

      if (
        isParentHeading &&
        node.tagName === "a" &&
        typeof node.properties?.className === "string" &&
        node.properties?.className?.includes("heading-anchor")
      ) {
        // TODO: create util like `getTranslations` from `next-intl/server` but without requiring Next.js
        node.properties.ariaLabel =
          (pageLang === "en" ? "Read section: " : "Baca bagian: ") + hastToString(parent).trim();
      }
    });
  };

  return transformer;
}

export default defineConfig({
  collections: { pages, blog },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: "catppuccin-frappe", defaultLang: "plaintext" }],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: "heading-anchor group",
            target: "_blank",
            rel: "noopener noreferrer",
          },
          content: fromHtmlIsomorphic(
            `
              <div class="hidden absolute -right-8 top-1/2 -translate-y-1/2 justify-center items-center w-5 h-5 bg-slate-900 text-slate-50 text-sm rounded opacity-0 group-hover:opacity-100 group-focus:opacity-100 md:flex dark:bg-slate-50 dark:text-slate-900">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="4" y1="9" x2="20" y2="9"/>
                  <line x1="4" y1="15" x2="20" y2="15"/>
                  <line x1="10" y1="3" x2="8" y2="21"/>
                  <line x1="16" y1="3" x2="14" y2="21"/>
                </svg>
              </div>
            `,
            { fragment: true }
          ).children,
        } as AutoLinkOptions,
      ],
      rehypei18nAutolinkHeadings,
    ],
  },
});

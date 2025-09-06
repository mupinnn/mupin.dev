import { execSync } from "node:child_process";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeUnwrapImages from "rehype-unwrap-images";
import { fromHtmlIsomorphic } from "hast-util-from-html-isomorphic";
import { visit } from "unist-util-visit";
import { h } from "hastscript";
import getReadingTime from "reading-time";
import { toString as mdastToString } from "mdast-util-to-string";
import sitemap from "@astrojs/sitemap";

function remarkGitModifiedTime() {
  return function (tree, file) {
    const filePath = file.history[0];
    const result = execSync(`git log -1 --pretty="format:%cI" "${filePath}"`);
    file.data.astro.frontmatter.updatedAt = result.toString();
  };
}

function rehypeExternalLinkNewTab() {
  return function (tree) {
    visit(tree, "element", node => {
      if (
        node.tagName === "a" &&
        node.properties?.href &&
        node.properties.href.toString().startsWith("http")
      ) {
        node.properties.target = "_blank";
        node.properties.rel = "noopener noreferrer";
      }
    });
  };
}

function rehypeResponsiveTable() {
  return function (tree) {
    visit(tree, "element", (node, i, parent) => {
      if (node.tagName === "table") {
        parent.children[i] = h("div", { class: "overflow-x-auto" }, [node]);
      }
    });
  };
}

function rehypeWrapImageInFigure() {
  return function (tree) {
    visit(tree, "element", (node, i, parent) => {
      if (node.tagName === "img") {
        const figure = h("figure", [h("img", { ...node.properties })]);
        parent.children[i] = figure;
      }
    });
  };
}

function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = mdastToString(tree);
    const readingTime = getReadingTime(textOnPage);
    data.astro.frontmatter.readingTime = readingTime.text;
  };
}

// https://astro.build/config
export default defineConfig({
  site: "https://mupin.dev",
  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkGitModifiedTime, remarkReadingTime],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: "catppuccin-frappe", defaultLang: "plaintext" }],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: "heading-anchor group",
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
        },
      ],
      rehypeExternalLinkNewTab,
      rehypeUnwrapImages,
      rehypeResponsiveTable,
      rehypeWrapImageInFigure,
    ],
  },

  integrations: [icon(), mdx(), react({ experimentalReactChildren: true }), sitemap()],
});


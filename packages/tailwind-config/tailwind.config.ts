import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import { hexToRgb } from "@mupin.dev/utils";
import typography from "@tailwindcss/typography";

const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx,md}",
    "./components/**/*.{js,ts,jsx,tsx,mdx,md}",
    "./app/**/*.{js,ts,jsx,tsx,mdx,md}",
    "../../packages/shared/**/*.{js,ts,jsx,tsx,mdx.md}",
  ],
  theme: {
    colors: {
      slate: colors.slate,
    },

    extend: {
      fontFamily: {
        sans: ["var(--font-plus-jakarta-sans)"],
        serif: ["var(--font-lora)"],
      },

      typography: {
        slate: {
          css: {
            "--tw-prose-body": colors.slate[900],
            "--tw-prose-headings": colors.slate[900],
            "--tw-prose-lead": colors.slate[500],
            "--tw-prose-links": colors.slate[900],
            "--tw-prose-bold": colors.slate[900],
            "--tw-prose-counters": colors.slate[700],
            "--tw-prose-bullets": colors.slate[700],
            "--tw-prose-hr": colors.slate[300],
            "--tw-prose-quotes": colors.slate[900],
            "--tw-prose-quote-borders": colors.slate[300],
            "--tw-prose-captions": colors.slate[500],
            "--tw-prose-kbd": colors.slate[900],
            "--tw-prose-kbd-shadows": hexToRgb(colors.slate[900]),
            "--tw-prose-code": colors.slate[900],
            "--tw-prose-pre-code": colors.slate[50],
            "--tw-prose-pre-bg": colors.slate[900],
            "--tw-prose-th-borders": colors.slate[500],
            "--tw-prose-td-borders": colors.slate[300],

            "--tw-prose-invert-body": colors.slate[50],
            "--tw-prose-invert-headings": colors.slate[50],
            "--tw-prose-invert-lead": colors.slate[300],
            "--tw-prose-invert-links": colors.slate[50],
            "--tw-prose-invert-bold": colors.slate[50],
            "--tw-prose-invert-counters": colors.slate[300],
            "--tw-prose-invert-bullets": colors.slate[300],
            "--tw-prose-invert-hr": colors.slate[500],
            "--tw-prose-invert-quotes": colors.slate[50],
            "--tw-prose-invert-quote-borders": colors.slate[500],
            "--tw-prose-invert-captions": colors.slate[300],
            "--tw-prose-invert-kbd": colors.slate[50],
            "--tw-prose-invert-kbd-shadows": hexToRgb(colors.slate[50]),
            "--tw-prose-invert-code": colors.slate[50],
            "--tw-prose-invert-pre-code": colors.slate[50],
            "--tw-prose-invert-pre-bg": colors.slate[50],
            "--tw-prose-invert-th-borders": colors.slate[300],
            "--tw-prose-invert-td-borders": colors.slate[700],
          },
        },
      },
    },
  },
  plugins: [typography],
} satisfies Config;

export default config;

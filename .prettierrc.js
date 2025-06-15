/** @type {import("prettier").Options} */
export default {
  printWidth: 100,
  arrowParens: "avoid",
  tabWidth: 2,
  endOfLine: "lf",
  quoteProps: "preserve",
  trailingComma: "es5",
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};

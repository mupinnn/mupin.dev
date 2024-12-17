/**
 * @type {import("prettier").Options}
 */
module.exports = {
  printWidth: 100,
  arrowParens: "avoid",
  tabWidth: 2,
  endOfLine: "lf",
  quoteProps: "preserve",
  trailingComma: "es5",
  plugins: ["prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: "*.{md,mdx}",
      options: {
        proseWrap: "always",
        printWidth: 120,
      },
    },
  ],
};

const path = require("path");

const buildNextEslintCommand = filenames =>
  `next lint --fix --file ${filenames.map(f => path.relative(process.cwd(), f)).join(" --file ")}`;

module.exports = {
  nextEslint: { "**/*.{js,jsx,ts,tsx}": [buildNextEslintCommand] },
};

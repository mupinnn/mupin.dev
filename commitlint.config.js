module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [
      2,
      "always",
      ["deps", "docs", "release", "turbo", "config", "main", "memoir", "resume", "shared"],
    ],
    "type-enum": [
      2,
      "always",
      ["chore", "docs", "feat", "fix", "perf", "refactor", "test", "revert", "ci", "release"],
    ],
  },
};

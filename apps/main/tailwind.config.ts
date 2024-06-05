import type { Config } from "tailwindcss";
import tailwindConfig from "@mupin.dev/shared/tw-config";

// TODO: fix this error when using tailwind preset from shared package
const config: Pick<Config, "presets" | "content"> = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx,md}",
    "./components/**/*.{js,ts,jsx,tsx,mdx,md}",
    "./app/**/*.{js,ts,jsx,tsx,mdx,md}",
    "../../packages/shared/**/*.{js,ts,jsx,tsx,mdx.md}",
  ],
  presets: [tailwindConfig],
};

export default config;

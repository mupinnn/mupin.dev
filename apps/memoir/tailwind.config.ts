import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
    },
  },
  plugins: [],
};
export default config;

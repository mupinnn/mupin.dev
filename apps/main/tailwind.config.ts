import type { Config } from "tailwindcss";
import tailwindConfig from "@mupin.dev/shared/tw-config";

const config: Pick<Config, "presets" | "theme"> = {
  presets: [tailwindConfig],
  theme: {
    extend: {
      typography: ({ theme }: { theme: any }) => ({
        DEFAULT: {
          css: {
            "h1, h2, h3, h4, h5, h6": {
              "a": {
                display: "inline-block",
                textDecoration: "none",
                fontWeight: theme("fontWeight.bold"),
                position: "relative",
              },
            },
          },
        },
      }),
    },
  },
};

export default config;

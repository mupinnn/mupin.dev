import type { Config } from "tailwindcss";
import tailwindConfig from "@mupin.dev/tailwind-config";

const config: Pick<Config, "presets"> = {
  presets: [tailwindConfig],
};

export default config;

import type { Config } from "tailwindcss";
import tailwindConfig from "@mupin.dev/shared/tw-config";

const config: Pick<Config, "presets"> = {
  presets: [tailwindConfig],
};

export default config;

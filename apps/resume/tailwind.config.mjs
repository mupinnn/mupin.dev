import tailwindConfig from "@mupin.dev/shared/tw-config";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [tailwindConfig],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            "p:first-child": {
              marginTop: 0,
            },
            "p:last-child": {
              marginBottom: 0,
            },

            ul: {
              paddingLeft: "2rem",
            },
          },
        },
      },
    },
  },
};

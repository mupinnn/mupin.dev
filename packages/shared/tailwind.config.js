/** @type {import("tailwindcss").Config} */
module.exports = {
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            a: {
              wordWrap: "break-word",
            },
            "h1, h2, h3, h4, h5, h6": {
              scrollMarginTop: "calc(var(--spacing) * 6)",

              "a": {
                display: "inline-block",
                textDecoration: "none",
                fontWeight: theme("fontWeight.bold"),
                position: "relative",
              },
            },
            "pre, img": {
              paddingInline: 0,
              borderRadius: 0,
              '@media (min-width: theme("screens.sm"))': {
                borderRadius: "var(--radius-md)",
              },
            },
            img: {
              width: "100%",
              objectFit: "contain",
            },
            figure: {
              marginInline: "calc(var(--spacing) * -4)",
            },
          },
        },

        slate: {
          css: {
            "--tw-prose-body": "var(--color-slate-900)",
            "--tw-prose-headings": "var(--color-slate-900)",
            "--tw-prose-lead": "var(--color-slate-500)",
            "--tw-prose-links": "var(--color-slate-900)",
            "--tw-prose-bold": "var(--color-slate-900)",
            "--tw-prose-counters": "var(--color-slate-700)",
            "--tw-prose-bullets": "var(--color-slate-700)",
            "--tw-prose-hr": "var(--color-slate-300)",
            "--tw-prose-quotes": "var(--color-slate-900)",
            "--tw-prose-quote-borders": "var(--color-slate-300)",
            "--tw-prose-captions": "var(--color-slate-500)",
            "--tw-prose-kbd": "var(--color-slate-900)",
            "--tw-prose-kbd-shadows": "var(--color-slate-900)",
            "--tw-prose-code": "var(--color-slate-900)",
            "--tw-prose-pre-code": "var(--color-slate-50)",
            "--tw-prose-pre-bg": "var(--color-slate-900)",
            "--tw-prose-th-borders": "var(--color-slate-500)",
            "--tw-prose-td-borders": "var(--color-slate-300)",

            "--tw-prose-invert-body": "var(--color-slate-50)",
            "--tw-prose-invert-headings": "var(--color-slate-50)",
            "--tw-prose-invert-lead": "var(--color-slate-300)",
            "--tw-prose-invert-links": "var(--color-slate-50)",
            "--tw-prose-invert-bold": "var(--color-slate-50)",
            "--tw-prose-invert-counters": "var(--color-slate-300)",
            "--tw-prose-invert-bullets": "var(--color-slate-300)",
            "--tw-prose-invert-hr": "var(--color-slate-500)",
            "--tw-prose-invert-quotes": "var(--color-slate-50)",
            "--tw-prose-invert-quote-borders": "var(--color-slate-500)",
            "--tw-prose-invert-captions": "var(--color-slate-300)",
            "--tw-prose-invert-kbd": "var(--color-slate-50)",
            "--tw-prose-invert-kbd-shadows": "var(--color-slate-50)",
            "--tw-prose-invert-code": "var(--color-slate-50)",
            "--tw-prose-invert-pre-code": "var(--color-slate-50)",
            "--tw-prose-invert-pre-bg": "var(--color-slate-50)",
            "--tw-prose-invert-th-borders": "var(--color-slate-300)",
            "--tw-prose-invert-td-borders": "var(--color-slate-700)",
          },
        },
      }),
    },
  },
};

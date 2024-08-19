import type { Metadata } from "next";
import { defu } from "defu";

const extractTitle = ({ title, template }: { title: string; template: string }): string => {
  return template.replace("%s", title);
};

type CreateMetadata = Metadata & {
  canonical?: string;
};

export const createMetadata = ({ canonical = "", ...meta }: CreateMetadata): Metadata => {
  const siteURL = new URL(
    process.env.VERCEL_ENV === "development"
      ? `http://localhost:${process.env.PORT ?? 3000}`
      : `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  );
  const siteName = "mupin.dev";
  const canonicalURL = new URL(canonical, siteURL);
  const canonicalURLPathname = canonicalURL.pathname === "/" ? "" : canonicalURL.pathname;
  const defaultMetadata: Metadata = {
    title: {
      template: `%s | ${siteName}`,
      default: "Ahmad Muwaffaq",
    },
    description:
      "I'm a web developer that tinkering the front of the web. Sharing my learnings and projects.",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      languages: {
        id: "id",
        en: "en"
      }
    },
    openGraph: {
      images: "api/og?title=Test"
    }
  };

  // return defu(meta, defaultMetadata);
  return {
    alternates: {
      canonical: '/',
      languages: {
        id: '/id',
        en: "/en",
      },
    },
    openGraph: {
      images: "/api/og?title=Test",
    },
  }
};

// maybe unsafe, but it works
// @see https://github.com/vercel/next.js/discussions/50189#discussioncomment-9224262
export const gethPathnameFromMetadataState = (state: any): string | undefined => {
  const res = Object.getOwnPropertySymbols(state || {})
    .map(p => state[p])
    .find(state => Object.prototype.hasOwnProperty.call(state, "urlPathname"));

  return res?.urlPathname?.replace(/\?.+/, "");
};

import type { Metadata } from "next";
import { defu } from "defu";
import { match } from "ts-pattern";

type CreateMetadata = Omit<Metadata, "title"> & {
  canonical?: string;
  title?: string;
  useOGTitleTemplate?: boolean;
};

export const createMetadata = ({
  canonical = "",
  useOGTitleTemplate = true,
  ...meta
}: CreateMetadata): Metadata => {
  const siteURL = new URL(
    match(process.env.VERCEL_ENV)
      .with("development", () => `http://localhost:${process.env.PORT ?? 3000}`)
      .with("preview", () => `https://${process.env.VERCEL_BRANCH_URL ?? process.env.VERCEL_URL}`)
      .with("production", () => `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
      .exhaustive()
  );
  const siteName = "mupin.dev";
  const canonicalURL = new URL(canonical, siteURL);

  const title = meta.title ?? "Ahmad Muwaffaq";
  const titleTemplate = `%s | ${siteName}`;
  const description = meta.description ?? "";
  const ogTitle = useOGTitleTemplate ? titleTemplate.replace("%s", title) : title;
  const ogImage = `/api/og?title=${ogTitle}&description=${description}`;

  const defaultMetadata: Metadata = {
    metadataBase: siteURL,
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description,
    robots: {
      follow: true,
      index: true,
    },
    alternates: {
      canonical: canonicalURL.toString(),
    },
    openGraph: {
      title: ogTitle,
      description,
      siteName,
      images: ogImage,
      url: canonicalURL.toString(),
      type: "website",
    },
    twitter: {
      title: ogTitle,
      description,
      card: "summary_large_image",
      creator: "@itsmupinnn",
      images: [ogImage],
    },
    generator: "Next.js",
    applicationName: "Ahmad Muwaffaq's Dev Blog",
    referrer: "origin-when-cross-origin",
    creator: "Ahmad Muwaffaq",
    publisher: "Ahmad Muwaffaq",
    authors: [{ name: "Ahmad Muwaffaq", url: `https://${siteName}` }],
  };

  return defu(meta, defaultMetadata);
};

// maybe unsafe, but it works
// @see https://github.com/vercel/next.js/discussions/50189#discussioncomment-9224262
export const getPathnameFromMetadataState = (state: any): string | undefined => {
  const res = Object.getOwnPropertySymbols(state || {})
    .map(p => state[p])
    .find(state => Object.hasOwn(state || {}, "urlPathname"));

  return res?.urlPathname?.replace(/\?.+/, "") ?? "";
};

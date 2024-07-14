import type { Metadata } from "next";

type CreateMetadata = Metadata & {
  canonical?: string;
};

export const createMetadata = ({ canonical = "", ...meta }: CreateMetadata): Metadata => {
  const siteURL = new URL(
    `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` ||
      `http://localhost:${process.env.PORT || 3000}`
  );
  const siteName = "mupin.dev";
  const title = meta.title ?? "Ahmad Muwaffaq | Front-End Developer";
  const description =
    meta.description ?? "I'm a web developer that tinkering the front of the web.";
  const ogImage = `/api/og?title=${title}&description=${description}`;
  const canonicalURL = new URL(canonical, siteURL);
  const canonicalURlPathname = canonicalURL.pathname === "/" ? "" : canonicalURL.pathname;

  return {
    ...meta,
    title,
    description,
    metadataBase: siteURL,
    alternates: {
      languages: {
        id: `/id${canonicalURlPathname}`,
        en: `/en${canonicalURlPathname}`,
      },
      ...meta.alternates,
      canonical: canonicalURL.toString(),
    },
    robots: {
      follow: true,
      index: true,
    },
    openGraph: {
      title,
      description,
      images: ogImage,
      siteName,
      url: canonicalURL.toString(),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@itsmupinnn",
      images: [ogImage],
    },
  };
};

import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { Pathnames, LocalePrefix } from "next-intl/routing";

export const locales = ["en", "id"] as const;
export type Locales = typeof locales;

export const defaultLocale = "en" as const;
export const localePrefix: LocalePrefix<Locales> = "always";

export const pathnames = {
  "/": "/",
  "/blog": "/blog",
  "/about": {
    en: "/about",
    id: "/tentang",
  },
  "/now": {
    en: "/now",
    id: "/kini",
  },
  "/projects": {
    en: "/projects",
    id: "/proyek",
  },
  "/projects/[projectSlug]": {
    en: "/projects/[projectSlug]",
    id: "/proyek/[projectSlug]",
  },
} satisfies Pathnames<Locales>;

export default getRequestConfig(async ({ locale }) => {
  // TODO: Of course this casting need to be fixed.
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});

import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale, pathnames, localePrefix } from "./i18n";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
  pathnames,
});

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(id|en)/:path*",

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};

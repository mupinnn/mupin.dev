import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { Pathnames } from "next-intl/routing";
import { Blog } from "#content";
import { locales, defaultLocale, pathnames, localePrefix, Locales } from "./i18n";
import { getAllBlogPostByLocale } from "./content";

export default async function middleware(request: NextRequest) {
  // life saver, @see https://github.com/amannn/next-intl/issues/929#issuecomment-2275905708
  const allEnglishBlogPosts = getAllBlogPostByLocale(defaultLocale);
  const blogPostsPathnames = allEnglishBlogPosts.reduce(
    (postPathname: Pathnames<Locales>, post: Blog) => {
      const matchingIndonesianPost = getAllBlogPostByLocale("id").find(
        idPost => idPost.slugByDefaultLocale === post.slug
      );
      postPathname[`/blog/${post.slug}`] = {
        en: `/blog/${post.slug}`,
        id: `/blog/${matchingIndonesianPost?.slug}`,
      };
      return postPathname;
    },
    {}
  );

  const handleI18nRouting = createMiddleware({
    locales,
    defaultLocale,
    localePrefix,
    pathnames: {
      ...pathnames,
      ...blogPostsPathnames,
    },
  });

  return handleI18nRouting(request);
}

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(id|en)/:path*",

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};

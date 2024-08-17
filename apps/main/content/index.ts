import { pages, blog } from "#content";

const allPages = pages;
const allBlogPosts = blog.filter(post => post.isPublished);

const getPageBySlug = (slug: string, locale: string = "en") => {
  return allPages.find(page => page.slug === slug && page.locale === locale);
};

const getAllBlogPostByLocale = (locale: string = "en") => {
  return allBlogPosts.filter(post => post.locale === locale);
};

const getBlogPostDetail = (slug: string, locale: string = "en") => {
  const matchBySlug = allBlogPosts.find(post => post.slug === slug);
  const matchByLocale = allBlogPosts.find(
    post => post.locale === locale && post.slugByDefaultLocale === slug
  );

  if (matchBySlug?.slug === slug && matchByLocale?.slug === slug) {
    return matchBySlug;
  }

  return matchByLocale;
};

export { allPages, getPageBySlug, allBlogPosts, getBlogPostDetail, getAllBlogPostByLocale };

import { pages, blog } from "#content";

const allPages = pages;
const allBlogPosts = blog;

const getPageBySlug = (slug: string, locale: string = "en") => {
  return allPages.find(page => page.slug === slug && page.locale === locale);
};

const getAllBlogPostByLocale = (locale: string = "en") => {
  return allBlogPosts.filter(post => post.locale === locale);
};

const getBlogPostBySlug = (slug: string, locale: string = "en") => {
  return allBlogPosts.find(post => post.slug === slug && post.locale === locale);
};

export { allPages, getPageBySlug, allBlogPosts, getBlogPostBySlug, getAllBlogPostByLocale };

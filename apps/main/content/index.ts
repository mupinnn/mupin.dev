import { pages } from "#content";

const allPages = pages;

const getPageBySlug = (slug: string, locale: string = "en") => {
  return allPages.find(page => page.slug === slug && page.locale === locale);
};

export { allPages, getPageBySlug };

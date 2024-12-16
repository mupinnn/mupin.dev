import { pages, blog, projects } from "#content";

const allPages = pages;
const allBlogPosts = blog.filter(post => post.isPublished);
const allProjects = projects;

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

const getAllBlogPostTagByLocale = (locale: string = "en") => {
  const tagsByLocale = allBlogPosts
    .filter(post => post.locale === locale)
    .map(post => post.tags)
    .flat();
  return [...new Set(tagsByLocale)].sort();
};

const getAllBlogPostByTag = (tagSlug: string, locale: string = "en") => {
  return getAllBlogPostByLocale(locale).filter(post => post.tags.includes(tagSlug));
};

const getAllBlogPostTag = () => {
  const allTags = allBlogPosts
    .map(post => ({ locale: post.locale, tags: post.tags }))
    .reduce<Array<{ tagSlug: string; locale: string | undefined }>>((acc, curr) => {
      curr.tags.forEach(tag => {
        acc.push({ tagSlug: tag, locale: curr.locale });
      });

      return acc;
    }, []);
  return allTags;
};

const getAllProjectsByLocale = (locale: string = "en") => {
  return allProjects.filter(project => project.locale === locale);
};

const getProjectDetail = (slug: string, locale: string = "en") => {
  const matchBySlug = allProjects.find(project => project.slug === slug);
  const matchByLocale = allProjects.find(project => {
    return project.locale === locale && project.slugByDefaultLocale === slug;
  });

  if (matchBySlug?.slug === slug && matchByLocale?.slug === slug) {
    return matchBySlug;
  }

  return matchByLocale;
};

export {
  allPages,
  getPageBySlug,
  allBlogPosts,
  getBlogPostDetail,
  getAllBlogPostByLocale,
  getAllBlogPostTagByLocale,
  getAllBlogPostByTag,
  getAllBlogPostTag,
  allProjects,
  getAllProjectsByLocale,
  getProjectDetail,
};

import { getCollection } from "astro:content";
import { type Locale } from "@/types";

// TODO: sort by latest
export async function getPublishedBlogPosts() {
  const posts = await getCollection("blog");
  return posts.filter(p => p.data.isPublished);
}

export async function getEnglishBlogPosts() {
  const posts = await getPublishedBlogPosts();
  return posts.filter(p => p.data.locale === "en");
}

export async function getPostTranslations(path: string, locale: Locale) {
  const posts = await getPublishedBlogPosts();
  return posts.filter(p => p.data.path === path && p.data.locale !== locale);
}

export async function getBlogTags() {
  const posts = await getPublishedBlogPosts();
  const allTags = Array.from(new Set(posts.flatMap(post => post.data.tags)));

  return allTags;
}

export async function getPostsByTag(tag: string) {
  const posts = await getEnglishBlogPosts();
  return posts.filter(p => p.data.tags.some(t => t === tag));
}

export async function getLatestBlogPost() {
  const posts = await getEnglishBlogPosts();
  return posts[0];
}

export async function getProjects() {
  const projects = await getCollection("projects");
  return projects;
}

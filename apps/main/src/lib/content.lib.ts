import { getCollection } from "astro:content";
import { type Locale } from "@/types";

export async function getEnglishBlogPosts() {
  const posts = await getCollection("blog");
  console.log(posts);
  return posts.filter(p => p.data.locale === "en");
}

export async function getPostTranslations(path: string, locale: Locale) {
  const posts = await getCollection("blog");
  return posts.filter(p => p.data.path === path && p.data.locale !== locale);
}

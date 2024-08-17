import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { PageLayout } from "@/components";
import { createMetadata } from "@/utils/create-metadata";
import { getAllBlogPostByTag, getAllBlogPostTag } from "@/content";
import { PostList } from "@mupin.dev/shared";

export function generateStaticParams() {
  return getAllBlogPostTag();
}

export const metadata = createMetadata({
  canonical: "tags",
});

export default function TagsDetailPage({
  params: { locale, tagSlug },
}: Readonly<{
  params: { locale: string; tagSlug: string };
}>) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("TagsPage");
  const tBlog = useTranslations("BlogPage");
  const allBlogPostByTag = getAllBlogPostByTag(tagSlug, locale).map(post => ({
    title: post.title,
    slug: `${locale}/blog/${post.slug}`,
    createdAt: post.publishedAt,
    locale,
  }));

  return (
    <PageLayout
      title={
        <>
          {t("detail")}: {tagSlug}
        </>
      }
    >
      <PostList data={allBlogPostByTag} emptyMessage={tBlog("noPost")} />
    </PageLayout>
  );
}

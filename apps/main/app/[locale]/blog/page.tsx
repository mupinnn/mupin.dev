import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { PageLayout } from "@/components";
import { getAllBlogPostByLocale } from "@/content";
import { createMetadata } from "@/utils/create-metadata";
import { PostList } from "@mupin.dev/shared";

export const metadata = createMetadata({
  canonical: "blog",
});

export default function BlogPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("BlogPage");
  const allBlogPost = getAllBlogPostByLocale(locale).map(post => ({
    title: post.title,
    slug: `${locale}/blog/${post.slug}`,
    createdAt: post.publishedAt,
    locale,
  }));

  return (
    <PageLayout title={t("title")} subtitle={t("subtitle")}>
      <PostList emptyMessage={t("noPost")} data={allBlogPost} />
    </PageLayout>
  );
}

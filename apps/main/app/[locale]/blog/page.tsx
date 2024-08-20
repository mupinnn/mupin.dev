import type { Metadata, ResolvingMetadata } from "next";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import { PageLayout } from "@/components";
import { getAllBlogPostByLocale } from "@/content";
import { createMetadata, getPathnameFromMetadataState } from "@/utils/create-metadata";
import { PostList } from "@mupin.dev/shared";
import type { PageProps } from "@/types";

export async function generateMetadata(
  { params: { locale } }: PageProps,
  state: ResolvingMetadata
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "BlogPage" });
  const pathname = getPathnameFromMetadataState(state);

  return createMetadata({
    title: t("title"),
    description: t("subtitle"),
    canonical: pathname,
  });
}

export default function BlogPage({ params: { locale } }: PageProps) {
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

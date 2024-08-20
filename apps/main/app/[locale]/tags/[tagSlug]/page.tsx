import type { Metadata, ResolvingMetadata } from "next";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import { PageLayout } from "@/components";
import { createMetadata, getPathnameFromMetadataState } from "@/utils/create-metadata";
import { getAllBlogPostByTag, getAllBlogPostTag } from "@/content";
import { PostList } from "@mupin.dev/shared";
import type { PageProps } from "@/types";

export function generateStaticParams() {
  return getAllBlogPostTag();
}

export async function generateMetadata(
  { params: { locale, tagSlug } }: PageProps<{ tagSlug: string }>,
  state: ResolvingMetadata
): Promise<Metadata> {
  const t = await getTranslations({ namespace: "TagsPage", locale });
  const pathname = getPathnameFromMetadataState(state);

  return createMetadata({
    title: t("detail", { tag: tagSlug }),
    canonical: pathname,
    description: t("description"),
  });
}

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
    <PageLayout title={t("detail", { tag: tagSlug })}>
      <PostList data={allBlogPostByTag} emptyMessage={tBlog("noPost")} />
    </PageLayout>
  );
}

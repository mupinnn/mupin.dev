import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import { formatDate } from "@mupin.dev/shared";
import { MDXContent, PageLayout } from "@/components";
import { allBlogPosts, getBlogPostDetail } from "@/content";
import { createMetadata, getPathnameFromMetadataState } from "@/utils/create-metadata";
import type { PageProps } from "@/types";

export function generateStaticParams() {
  return allBlogPosts.map(post => ({ locale: post.locale, blogSlug: post.slug }));
}

export async function generateMetadata(
  { params: { locale, blogSlug } }: PageProps<{ blogSlug: string }>,
  state: ResolvingMetadata
): Promise<Metadata> {
  const t = await getTranslations({ locale });
  const pathname = getPathnameFromMetadataState(state);
  const content = getBlogPostDetail(blogSlug, locale);

  if (!content) {
    return createMetadata({
      title: t("NotFoundPage.title"),
      description: t("NotFoundPage.description"),
      canonical: pathname,
    });
  }

  return createMetadata({
    title: content.title,
    description: content.description,
    canonical: pathname,
    keywords: content.tags,
    useOGTitleTemplate: false,
    openGraph: {
      type: "article",
      authors: "Ahmad Muwaffaq",
      publishedTime: content.publishedAt,
      modifiedTime: content.lastUpdatedAt,
      tags: content.tags,
    },
  });
}

export default function BlogDetailPage({
  params: { locale, blogSlug },
}: PageProps<{ blogSlug: string }>) {
  unstable_setRequestLocale(locale);
  const content = getBlogPostDetail(blogSlug, locale);
  const t = useTranslations("BlogDetailPage");

  if (!content) notFound();

  return (
    <PageLayout
      title={content.title}
      tags={content.tags}
      subtitle={
        <>
          <p className="text-xs text-slate-500 dark:text-slate-300">
            {t("publishedAt", {
              publishedAt: formatDate(
                content.publishedAt,
                { month: "long", day: "numeric" },
                locale
              ),
            })}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-300">
            {t("lastUpdatedAt", {
              lastUpdatedAt: formatDate(
                content.lastUpdatedAt,
                { month: "long", day: "numeric" },
                locale
              ),
            })}{" "}
            &mdash; {t("readingTime", { min: content.metadata.readingTime })}
          </p>
        </>
      }
    >
      <MDXContent code={content.body} />
    </PageLayout>
  );
}

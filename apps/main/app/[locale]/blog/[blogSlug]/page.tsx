import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { formatDate } from "@mupin.dev/shared";
import { MDXContent, PageLayout } from "@/components";
import { allBlogPosts, getBlogPostDetail } from "@/content";
import { createMetadata } from "@/utils/create-metadata";

export function generateStaticParams() {
  return allBlogPosts.map(post => ({ locale: post.locale, blogSlug: post.slug }));
}

export const metadata = createMetadata({
  canonical: "blog",
});

export default function BlogDetailPage({
  params: { locale, blogSlug },
}: Readonly<{
  params: { locale: string; blogSlug: string };
}>) {
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

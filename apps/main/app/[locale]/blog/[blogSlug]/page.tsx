import { notFound } from "next/navigation";
import { unstable_setRequestLocale } from "next-intl/server";
import { MDXContent, PageLayout } from "@/components";
import { getBlogPostDetail } from "@/content";
import { createMetadata } from "@/utils/create-metadata";

export const metadata = createMetadata({
  canonical: "blog",
});

export default function BlogDetailPage({
  params: { locale, blogSlug },
}: {
  params: { locale: string; blogSlug: string };
}) {
  unstable_setRequestLocale(locale);
  const content = getBlogPostDetail(blogSlug, locale);

  if (!content) notFound();

  return (
    <PageLayout title={content.title}>
      <MDXContent code={content.body} />
    </PageLayout>
  );
}

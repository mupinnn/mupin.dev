import { notFound } from "next/navigation";
import { unstable_setRequestLocale } from "next-intl/server";
import { MDXContent, PageLayout, CloudinaryImg } from "@/components";
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
      <CloudinaryImg
        src="blog/dummy-article/retrosupply-jLwVAUtLOAQ-unsplash.jpg"
        alt="Photo by RetroSupply"
      />
      <MDXContent code={content.body} />
    </PageLayout>
  );
}

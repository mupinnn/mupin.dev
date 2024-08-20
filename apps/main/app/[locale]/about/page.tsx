import type { Metadata, ResolvingMetadata } from "next";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import { PageLayout, MDXContent } from "@/components";
import { getPageBySlug } from "@/content";
import { notFound } from "next/navigation";
import { createMetadata, getPathnameFromMetadataState } from "@/utils/create-metadata";
import { PageProps } from "@/types";

export async function generateMetadata(
  { params: { locale } }: PageProps,
  state: ResolvingMetadata
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "AboutPage" });
  const parentMeta = await state;
  const pathname = getPathnameFromMetadataState(state);

  return createMetadata({
    canonical: pathname,
    title: t("title"),
    description: parentMeta.description,
  });
}

export default function AboutPage({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("AboutPage");
  const content = getPageBySlug("about", locale);

  if (!content) notFound();

  return (
    <PageLayout title={t("title")}>
      <MDXContent code={content.body} />
    </PageLayout>
  );
}

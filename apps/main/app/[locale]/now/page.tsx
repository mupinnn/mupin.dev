import type { Metadata, ResolvingMetadata } from "next";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import { PageLayout, MDXContent } from "@/components";
import { getPageBySlug } from "@/content";
import { notFound } from "next/navigation";
import { formatDate } from "@mupin.dev/shared";
import { createMetadata, getPathnameFromMetadataState } from "@/utils/create-metadata";
import { PageProps } from "@/types";

export async function generateMetadata(
  { params: { locale } }: PageProps,
  state: ResolvingMetadata
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "NowPage" });
  const pathname = getPathnameFromMetadataState(state);

  return createMetadata({
    canonical: pathname,
    title: t("title"),
    description: t("description"),
  });
}

export default function NowPage({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("NowPage");
  const content = getPageBySlug("now", locale);

  if (!content) notFound();

  return (
    <PageLayout
      title={t("title")}
      subtitle={t("subtitle", {
        lastUpdatedAt: formatDate(
          content.lastUpdatedAt,
          { month: "long", day: "numeric", timeZone: "Asia/Jakarta" },
          locale
        ),
      })}
    >
      <MDXContent code={content.body} />
    </PageLayout>
  );
}

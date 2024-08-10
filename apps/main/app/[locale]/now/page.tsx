import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { PageLayout, MDXContent } from "@/components";
import { getPageBySlug } from "@/content";
import { notFound } from "next/navigation";
import { createMetadata } from "@/utils/create-metadata";
import { formatDate } from "@mupin.dev/shared";

export const metadata = createMetadata({
  canonical: "about",
});

export default function NowPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("NowPage");
  const content = getPageBySlug("now", locale);

  if (!content) notFound();

  return (
    <PageLayout
      title={t("title")}
      subtitle={t("subtitle", {
        lastUpdatedAt: formatDate(
          content.lastUpdatedAt!,
          { month: "long", day: "numeric", timeZone: "Asia/Jakarta" },
          locale
        ),
      })}
    >
      <MDXContent code={content.body} />
    </PageLayout>
  );
}

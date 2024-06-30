import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { PageLayout, MDXContent } from "@/components";
import { getPageBySlug } from "@/content";
import { notFound } from "next/navigation";

export default function AboutPage({ params: { locale } }: { params: { locale: string } }) {
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

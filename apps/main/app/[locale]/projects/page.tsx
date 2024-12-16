import type { Metadata, ResolvingMetadata } from "next";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import { PageLayout, ProjectList } from "@/components";
import { createMetadata, getPathnameFromMetadataState } from "@/utils/create-metadata";
import type { PageProps } from "@/types";
import { getAllProjectsByLocale } from "@/content";

export async function generateMetadata(
  { params: { locale } }: PageProps,
  state: ResolvingMetadata
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "ProjectsPage" });
  const pathname = getPathnameFromMetadataState(state);

  return createMetadata({
    title: t("title"),
    description: t("description"),
    canonical: pathname,
  });
}

export default function ProjectsPage({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("ProjectsPage");
  const allProjects = getAllProjectsByLocale(locale);

  return (
    <PageLayout title={t("title")} subtitle={t("subtitle")}>
      <ProjectList emptyMessage={t("noProject")} data={allProjects} />
    </PageLayout>
  );
}

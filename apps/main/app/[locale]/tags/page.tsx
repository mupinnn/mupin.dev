import type { Metadata, ResolvingMetadata } from "next";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import { PageLayout, Tag } from "@/components";
import { createMetadata, getPathnameFromMetadataState } from "@/utils/create-metadata";
import { getAllBlogPostTagByLocale } from "@/content";
import { Link } from "@/navigation";
import type { PageProps } from "@/types";

export async function generateMetadata(
  { params: { locale } }: PageProps,
  state: ResolvingMetadata
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "TagsPage" });
  const pathname = getPathnameFromMetadataState(state);

  return createMetadata({
    title: t("list"),
    description: t("description"),
    canonical: pathname,
  });
}

export default function TagsPage({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("TagsPage");
  const tags = getAllBlogPostTagByLocale(locale);

  return (
    <PageLayout title={t("list")}>
      <div className="flex flex-wrap gap-2">
        {tags.length === 0 ? (
          <p>{t("noTags")}</p>
        ) : (
          tags.map(tag => (
            <Link key={tag} href={{ pathname: "/tags/[tagSlug]", params: { tagSlug: tag } }}>
              <Tag>#{tag}</Tag>
            </Link>
          ))
        )}
      </div>
    </PageLayout>
  );
}

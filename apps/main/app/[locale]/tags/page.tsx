import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { PageLayout, Tag } from "@/components";
import { createMetadata } from "@/utils/create-metadata";
import { getAllBlogPostTagByLocale } from "@/content";
import { Link } from "@/navigation";

export const metadata = createMetadata({
  canonical: "tags",
});

export default function TagsPage({ params: { locale } }: { params: { locale: string } }) {
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

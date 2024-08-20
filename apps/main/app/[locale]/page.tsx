import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { SocialLinks } from "@/components";
import type { PageProps } from "@/types";

export default function Home({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale);
  const t = useTranslations();

  return (
    <div className="flex flex-col justify-center gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="mb-2 inline-flex flex-col gap-2 text-5xl font-extrabold leading-[40px]">
          {t.rich("HomePage.title", {
            span: chunks => <span className="text-2xl">{chunks}</span>,
            br: () => <br />,
          })}
        </h1>
        <p className="text-xs">{t("HomePage.subtitle")}</p>
        <p className="text-xs">{t("HomePage.description")}</p>
      </div>
      <SocialLinks />
    </div>
  );
}

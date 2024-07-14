import { useTranslations } from "next-intl";

export default function NotFoundPage() {
  const t = useTranslations("NotFoundPage");
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-[32px] font-bold">{t("title")}</h1>
      <p>{t("description")}</p>
    </div>
  );
}

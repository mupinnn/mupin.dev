"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@mupin.dev/shared";
import { usePathname, useRouter } from "@/navigation";
import { locales } from "@/i18n";

const localeMap = {
  id: {
    label: "Bahasa Indonesia",
    flagCode: "id",
  },
  en: {
    label: "English",
    flagCode: "gb",
  },
};

export const LocaleSwitcher = () => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("LocaleSwitcher");

  const onLocaleChange = (selectedLocale: string) => {
    // @ts-expect-error
    // @see https://github.com/amannn/next-intl/issues/643
    // @see https://github.com/amannn/next-intl/issues/726#issuecomment-1859914146
    router.replace({ pathname, params }, { locale: selectedLocale as "id" | "en" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="inline-flex h-8 w-8 items-center justify-center rounded border-2 border-slate-800 bg-slate-300 dark:border-slate-300 dark:bg-slate-800"
          aria-label={t("label")}
        >
          <Image
            src={`https://flagcdn.com/16x12/${
              localeMap[locale as keyof typeof localeMap].flagCode
            }.png`}
            width={16}
            height={12}
            alt=""
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={locale} onValueChange={onLocaleChange}>
          {locales.map(locale => {
            const { flagCode, label } = localeMap[locale as keyof typeof localeMap];
            return (
              <DropdownMenuRadioItem key={locale} value={locale}>
                <Image
                  src={`https://flagcdn.com/16x12/${flagCode}.png`}
                  width={16}
                  height={12}
                  alt=""
                />
                {label}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

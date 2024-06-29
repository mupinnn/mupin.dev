import { NextPage } from "next";
import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

export const locales = ["en", "id"];
export type NextPageWithLocale = NextPage<{ params: { locale: (typeof locales)[number] } }>;

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});

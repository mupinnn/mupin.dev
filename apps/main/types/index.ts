import { locales } from "@/i18n";

export type Locale = (typeof locales)[number];

export type PageProps<TParams = {}, TSearch = null> = {
  params: {
    locale: Locale;
  } & TParams;
} & (TSearch extends null
  ? {}
  : { searchParams: { [key: string]: string | string[] | undefined } });

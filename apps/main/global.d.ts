import en from "./messages/en.json";

type Messages = typeof en;

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}

  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_UMAMI_WEBSITE_ID: string;
      NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;
    }
  }
}

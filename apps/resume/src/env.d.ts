/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PRIVATE_PHONE_NUMBER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

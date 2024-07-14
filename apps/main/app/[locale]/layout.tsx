import React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Lora } from "next/font/google";
import { getMessages, getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider, Footer } from "@mupin.dev/shared";
import { LocaleSwitcher, Navbar } from "@/components";
import { locales } from "@/i18n";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
});

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export const metadata: Metadata = {
  title: "Ahmad Muwaffaq | Front-End Developer",
  description: "I'm a web developer that tinkering the front of the web.",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: {
    locale: string;
  };
}>) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations();

  return (
    <html lang={locale} className={`${inter.variable} ${lora.variable}`}>
      <Script
        defer
        async
        src="https://umami.mupin.dev/script.js"
        data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || ""}
        data-domains="mupin.dev"
      />
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-50">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <Navbar />

            <div className="container p-4">
              <div
                role="alert"
                className="flex flex-col gap-4 rounded border border-yellow-500 bg-yellow-700/30 p-4"
              >
                <p>{t("DevelopmentNotice.message")}</p>
                <p>
                  {t("DevelopmentNotice.bored")} <LocaleSwitcher />
                </p>
              </div>
            </div>

            <main className="container mx-auto flex w-full flex-1 p-4 pb-6">{children}</main>
            <Footer>
              {t.rich("Footer", {
                sourcecode: chunks => (
                  <a
                    href="https://github.com/mupinnn/mupin.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-slate-300 decoration-dashed"
                  >
                    {chunks}
                  </a>
                ),
                currentYear: new Date().getFullYear(),
              })}
            </Footer>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

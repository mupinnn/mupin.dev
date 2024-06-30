import React from "react";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Lora } from "next/font/google";
import { getMessages, getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider, Footer } from "@mupin.dev/shared";
import { Navbar } from "@/components";
import { locales } from "@/i18n";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta-sans",
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
    <html lang={locale} className={`${plusJakartaSans.variable} ${lora.variable}`}>
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-50">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <Navbar />
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

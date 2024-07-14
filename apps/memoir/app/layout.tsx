import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Lora } from "next/font/google";
import { Footer, ThemeProvider } from "@mupin.dev/shared";
import "./globals.css";

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

export function generateMetadata(): Metadata {
  const title = "Faqih's Memoir";
  const description =
    "A Faqih personal memoir. Documenting life and all things happening. Occasions, thoughts or reflections. Anything.";
  const ogImage = `https://mupin.dev/api/og?title=${title}&description=${description}`;
  const siteURL = new URL(process.env.VERCEL_URL || `http://localhost:${process.env.PORT || 3000}`);

  return {
    metadataBase: siteURL,
    title,
    description,
    openGraph: {
      images: ogImage,
      siteName: "memoir.mupin.dev",
      title,
      description,
      url: siteURL.toString(),
    },
    twitter: {
      images: [ogImage],
      card: "summary_large_image",
      title,
      description,
      creator: "@itsmupinnn",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <Script
        defer
        async
        src="https://umami.mupin.dev/script.js"
        data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || ""}
        data-domains="memoir.mupin.dev"
      />
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-50">
        <ThemeProvider>
          <main className="container mx-auto flex w-full flex-1 p-4 pb-6">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

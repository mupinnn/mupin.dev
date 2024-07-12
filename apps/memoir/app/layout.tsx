import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Faqih's Memoir",
  description:
    "A Faqih personal memoir. Documenting life and all things happening. Occasions, thoughts or reflections. Anything.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-50">
        <ThemeProvider>
          <main className="container mx-auto flex w-full flex-1 p-4 pb-6">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

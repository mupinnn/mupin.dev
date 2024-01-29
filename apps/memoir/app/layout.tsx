import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Lora } from "next/font/google";

import { Footer } from "@/components";
import { ThemeProvider } from "@/providers";

import "./globals.css";

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
    <html lang="en" className={`${plusJakartaSans.variable} ${lora.variable}`}>
      <body className="flex flex-col min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-50">
        <ThemeProvider>
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

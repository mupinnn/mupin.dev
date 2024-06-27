import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Lora } from "next/font/google";
import { ThemeProvider, Footer } from "@mupin.dev/shared";
import { Navbar } from "@/components";
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
  title: "Ahmad Muwaffaq | Front-End Developer",
  description: "I'm a web developer that tinkering the front of the web.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${lora.variable}`}>
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-50">
        <ThemeProvider>
          <Navbar />
          <main className="container mx-auto flex w-full flex-1 p-4">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

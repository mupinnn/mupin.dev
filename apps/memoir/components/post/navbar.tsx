"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { ThemeSelector } from "@mupin.dev/shared";

export const Navbar = ({ title }: { title: string }) => {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleOnScroll = () => {
      if (!headerRef.current) return;
      if (window.scrollY > 10) {
        setScrolled(true);
        headerRef.current?.classList.add("bg-slate-100", "dark:bg-slate-800");
      } else {
        setScrolled(false);
        headerRef.current?.classList.remove("bg-slate-100", "dark:bg-slate-800");
      }
    };

    document.addEventListener("scroll", handleOnScroll);
    return () => {
      document.removeEventListener("scroll", handleOnScroll);
    };
  }, []);

  if (!mounted) return null;

  return (
    <header
      className="sticky top-0 -m-4 mb-0 flex items-center justify-between gap-2 p-4 transition-colors"
      ref={headerRef}
    >
      <Link href="/" title="Ke beranda">
        <FiArrowLeft size={24} />
        <span className="sr-only">Ke beranda</span>
      </Link>
      <p className="overflow-hidden text-ellipsis whitespace-nowrap font-serif font-bold">
        {scrolled && title}
      </p>
      <ThemeSelector />
    </header>
  );
};

"use client";

import { useState, useEffect } from "react";
import {
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineComputerDesktop,
  HiOutlineEllipsisHorizontal,
} from "react-icons/hi2";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "./ui";

const themeIconMap = {
  light: HiOutlineSun,
  dark: HiOutlineMoon,
  system: HiOutlineComputerDesktop,
};

export default function ThemeSelector() {
  const [mounted, setMounted] = useState(false);
  const { theme, themes, setTheme } = useTheme();
  const CurrentThemeIcon = themeIconMap[theme as keyof typeof themeIconMap];

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="inline-flex h-8 w-8 items-center justify-center rounded border-2 border-slate-800 bg-slate-300 dark:border-slate-300 dark:bg-slate-800"
          aria-label="Select a theme"
        >
          {mounted ? (
            <CurrentThemeIcon className="size-5" />
          ) : (
            <HiOutlineEllipsisHorizontal className="size-5" />
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={mounted ? theme : "dark"} onValueChange={setTheme}>
          {themes.map(theme => {
            const ThemeIcon = themeIconMap[theme as keyof typeof themeIconMap];
            return (
              <DropdownMenuRadioItem key={theme} value={theme} className="capitalize">
                <ThemeIcon className="size-5" />
                {theme}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

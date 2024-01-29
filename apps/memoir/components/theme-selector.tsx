"use client";

import { useState, useEffect } from "react";
import { ToggleGroup, ToggleGroupValueChangeDetails } from "@ark-ui/react";
import { SunIcon, MoonIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";

const themeIconMap = {
  light: SunIcon,
  dark: MoonIcon,
  system: ComputerDesktopIcon,
};

export default function ThemeSelector() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, themes } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const onThemeChange = (details: ToggleGroupValueChangeDetails) => {
    if (details.value.length > 0) {
      setTheme(details.value[0] as string);
    }
  };

  return (
    <ToggleGroup.Root
      className="flex border border-slate-300 dark:border-slate-500 rounded-full"
      value={mounted ? [theme as string] : []}
      onValueChange={onThemeChange}
    >
      {themes.map(theme => {
        const ThemeIcon = themeIconMap[theme as keyof typeof themeIconMap];
        return (
          <ToggleGroup.Item
            key={theme}
            value={theme}
            className="h-8 w-8 flex items-center justify-center rounded-full aria-checked:bg-slate-300 dark:aria-checked:bg-slate-700"
          >
            <ThemeIcon className="h-5 w-5" />
          </ToggleGroup.Item>
        );
      })}
    </ToggleGroup.Root>
  );
}

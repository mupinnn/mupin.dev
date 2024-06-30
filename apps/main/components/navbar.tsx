import { Avatar, ThemeSelector, cn } from "@mupin.dev/shared";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

const navKeys = ["blog", "projects", "now", "about"] as const;

export default function Navbar() {
  const t = useTranslations("Navigation");

  return (
    <nav className="container flex items-center justify-between gap-2 p-4">
      <Link href="/" title="Home">
        <Avatar width={32} height={32} aria-hidden="true" focusable={false} />
        <span className="sr-only">{t("home")}</span>
      </Link>
      <ol className="flex items-center gap-4 overflow-auto font-serif font-semibold">
        {navKeys.map((link, index) => (
          <li
            key={link}
            className={cn(
              "relative",
              index < navKeys.length - 1 &&
                "after:absolute after:inset-y-1/2 after:-right-2.5 after:block after:h-1 after:w-1 after:rounded-full after:bg-slate-500 after:dark:bg-slate-300"
            )}
          >
            <Link href={`/${link}`}>{t(link)}</Link>
          </li>
        ))}
      </ol>
      <ThemeSelector />
    </nav>
  );
}

import Link from "next/link";
import { Avatar, ThemeSelector, cn } from "@mupin.dev/shared";
import { IconType } from "react-icons";

export type NavItem = {
  path: string;
  label: string;
  icon?: IconType;
};

const navLinks: NavItem[] = [
  {
    path: "/blog",
    label: "Blog",
  },
  {
    path: "/projects",
    label: "Projects",
  },
  {
    path: "/now",
    label: "Now",
  },
  {
    path: "/about",
    label: "About",
  },
];

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4">
      <Link href="/" title="Home">
        <Avatar width={32} height={32} aria-hidden="true" focusable={false} />
        <span className="sr-only">Home</span>
      </Link>
      <ol className="flex items-center gap-4 font-serif font-semibold">
        {navLinks.map((link, index) => (
          <li
            key={link.path}
            className={cn(
              "relative",
              index < navLinks.length - 1 &&
                "after:absolute after:inset-y-1/2 after:-right-2.5 after:block after:h-1 after:w-1 after:rounded-full after:bg-slate-500 after:dark:bg-slate-300"
            )}
          >
            <Link href={link.path}>{link.label}</Link>
          </li>
        ))}
      </ol>
      <ThemeSelector />
    </nav>
  );
}

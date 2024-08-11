import Link from "next/link";
import { cn, formatDate } from "../..";

export interface PostListItemProps {
  title: string;
  slug: string;
  createdAt: string;
  locale: string;
  itemIndex: number;
  totalPost: number;
}

export const PostListItem = ({
  title,
  slug,
  createdAt,
  locale,
  totalPost,
  itemIndex,
}: PostListItemProps) => {
  return (
    <li
      key={slug}
      className={cn(
        "relative flex flex-col gap-1",
        itemIndex < totalPost - 1 &&
          "after:absolute after:-bottom-5 after:block after:h-4 after:border-r after:border-dashed after:border-slate-300 after:dark:border-slate-500"
      )}
    >
      <Link href={`/${slug}`}>
        <p className="text-xs text-slate-500 dark:text-slate-300">
          {formatDate(
            createdAt,
            {
              day: "numeric",
              month: "long",
              hour: "numeric",
              minute: "numeric",
              timeZone: "Asia/Jakarta",
              timeZoneName: "short",
            },
            locale
          ).replace("pukul", "-")}
        </p>
        <h2 className="font-serif font-semibold">{title}</h2>
      </Link>
    </li>
  );
};

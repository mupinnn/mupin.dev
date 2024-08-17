import { cn } from "@mupin.dev/shared";
import { Link } from "@/navigation";
import { Tag } from "../ui";

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: React.ReactNode;
  tags?: string[];
}

export const PageLayout = ({ children, title, subtitle, tags }: PageLayoutProps) => {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className={cn("flex flex-col", typeof subtitle === "string" ? "gap-1" : "gap-2")}>
        <h1 className="text-[32px] font-bold leading-tight">{title}</h1>
        {typeof subtitle === "string" ? (
          <p className="text-xs text-slate-500 dark:text-slate-300">{subtitle}</p>
        ) : (
          subtitle
        )}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <Link key={tag} href={{ pathname: "/tags/[tagSlug]", params: { tagSlug: tag } }}>
                <Tag>#{tag}</Tag>
              </Link>
            ))}
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

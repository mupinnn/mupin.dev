export interface PostItemProps {
  slug: string;
  title: string;
  excerpt: string;
  createdAt: string;
}

export default function PostItem({ title, excerpt, createdAt }: PostItemProps) {
  return (
    <article className="flex flex-col gap-2 relative after:content-[''] after:absolute after:-bottom-3 after:w-full after:h-[1px] after:bg-slate-300 last:after:hidden dark:after:bg-slate-500">
      <h3 className="font-serif font-semibold text-base">{title}</h3>
      <p className="text-xs text-slate-600 dark:text-slate-300">{excerpt}</p>
      <p className="text-xs text-slate-600 dark:text-slate-300">{createdAt}</p>
    </article>
  );
}

import ReactMarkdown from "react-markdown";
import { getMemoirBySlug } from "@/lib/notion";

export default async function Detail({ params }: { params: { slug: string } }) {
  const memoirBySlug = await getMemoirBySlug(params.slug);

  return (
    <div className="relative flex w-full flex-col gap-6">
      <header className="flex flex-col">
        <h1 className="font-serif text-[2rem] font-bold leading-tight">{memoirBySlug.title}</h1>
      </header>

      <div className="prose prose-slate prose-li:break-words dark:prose-invert">
        <ReactMarkdown
          components={{
            a({ children, node, ...restProps }) {
              return (
                <a target="_blank" rel="noopener noreferrer" {...restProps}>
                  {children}
                </a>
              );
            },
          }}
        >
          {memoirBySlug.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

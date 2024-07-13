import ReactMarkdown from "react-markdown";
import { getMemoirBySlug } from "@/lib/notion";

export default async function Detail({ params }: { params: { slug: string } }) {
  const memoirBySlug = await getMemoirBySlug(params.slug);

  return (
    <div className="relative flex flex-col gap-6">
      <header className="flex flex-col">
        <h1 className="font-serif text-[32px] font-bold">{memoirBySlug.title}</h1>
      </header>

      <div className="prose prose-slate dark:prose-invert">
        <ReactMarkdown>{memoirBySlug.content}</ReactMarkdown>
      </div>
    </div>
  );
}

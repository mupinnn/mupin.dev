import { notFound } from "next/navigation";
import { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import { formatDate } from "@mupin.dev/shared";
import { getMemoirBySlug } from "@/lib/notion";
import { Navbar } from "@/components/post";

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const memoirBySlug = await getMemoirBySlug(params.slug);
  return {
    title: memoirBySlug?.title,
  };
}

export default async function Detail({ params }: PageProps) {
  const memoirBySlug = await getMemoirBySlug(params.slug);

  if (!memoirBySlug) notFound();

  return (
    <div className="flex w-full flex-col gap-1">
      <Navbar title={memoirBySlug.title} />
      <p className="text-xs text-slate-500 dark:text-slate-300">
        Terakhir diperbarui pada{" "}
        {formatDate(
          memoirBySlug.updated_at,
          {
            day: "numeric",
            month: "long",
            hour: "numeric",
            minute: "numeric",
            timeZoneName: "short",
          },
          "id-ID"
        ).replace("pukul", "-")}
      </p>
      <div className="prose prose-slate prose-li:break-words dark:prose-invert">
        <h1 className="font-serif text-[2rem] font-bold leading-tight">{memoirBySlug.title}</h1>
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

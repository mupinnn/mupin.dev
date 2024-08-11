import { ThemeSelector, PostList } from "@mupin.dev/shared";
import { getAllMemoirs } from "@/lib/notion";

export default async function Home() {
  const allMemoirs = await getAllMemoirs();

  return (
    <div className="relative flex flex-col gap-6">
      <ThemeSelector className="absolute right-0 top-0" />
      <header className="flex flex-col gap-4">
        <h1 className="font-serif text-5xl font-bold">Memoar</h1>
        <p>
          Sebuah memoar pribadi <span className="line-through decoration-4">Faqih</span>.
          Mendokumentasikan kehidupan dan semua hal yang terjadi. Peristiwa, pikiran, atau refleksi.
          Apa pun.
        </p>
      </header>

      <hr className="text-slate-300 dark:text-slate-500" />

      <PostList
        data={allMemoirs.map(memoir => ({
          title: memoir.title,
          slug: memoir.slug,
          createdAt: memoir.created_at,
          locale: "id",
        }))}
        emptyMessage="Belum ada apa pun nih . . ."
      />
    </div>
  );
}

import Link from "next/link";
import { ThemeSelector, cn, formatDate } from "@mupin.dev/shared";
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

      {allMemoirs.length > 0 ? (
        <ul className="flex flex-col gap-6">
          {allMemoirs.map((memoir, i) => (
            <li
              className={cn(
                "relative flex flex-col gap-1",
                i < allMemoirs.length - 1 &&
                  "after:absolute after:-bottom-5 after:block after:h-4 after:border-r after:border-dashed after:border-slate-300 after:dark:border-slate-500"
              )}
              key={memoir.slug}
            >
              <Link href={`/${memoir.slug}`}>
                <p className="text-xs text-slate-500 dark:text-slate-300">
                  {formatDate(
                    memoir.created_at,
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
                <h2 className="font-serif font-semibold">{memoir.title}</h2>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Belum ada apa pun nih . . .</p>
      )}
    </div>
  );
}

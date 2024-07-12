import { ThemeSelector, cn } from "@mupin.dev/shared";

export default function Home() {
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
      <ul className="flex flex-col gap-6">
        {[...Array(10).keys()].map(i => (
          <li
            className={cn(
              "relative flex flex-col gap-1",
              i < 9 &&
                "after:absolute after:-bottom-5 after:block after:h-4 after:border-r after:border-dashed after:border-slate-300 after:dark:border-slate-500"
            )}
            key={i}
          >
            <p className="text-xs text-slate-500 dark:text-slate-300">26 April 2001 - 17.00 WIB</p>
            <h2 className="font-serif font-semibold">This is title {i}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}

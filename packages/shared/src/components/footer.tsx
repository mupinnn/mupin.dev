export default function Footer() {
  return (
    <footer className="container px-4 py-6 text-center text-[10px]">
      <p className="text-slate-500 dark:text-slate-300">
        built and designed with ✨ full of joy ✨ by{" "}
        <a
          href="https://github.com/mupinnn/mupin.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-slate-300 decoration-dashed"
        >
          me &lt;3
        </a>{" "}
        &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
}

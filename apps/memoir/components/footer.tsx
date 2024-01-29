import ThemeSelector from "./theme-selector";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center gap-4 p-6 max-w-3xl mx-auto border-t border-slate-300 dark:border-slate-500">
      <ThemeSelector />
      <p className="text-center text-sm">&copy; {new Date().getFullYear()} Ahmad Muwaffaq</p>
    </footer>
  );
}

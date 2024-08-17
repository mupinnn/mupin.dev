export interface TagProps {
  children: React.ReactNode;
}

export const Tag = ({ children }: TagProps) => {
  return (
    <span className="inline-flex items-center rounded border border-slate-800 bg-slate-300 px-1 py-0.5 text-xs font-semibold text-slate-800 dark:border-slate-300 dark:bg-slate-800 dark:text-slate-300">
      {children}
    </span>
  );
};

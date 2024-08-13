interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const PageLayout = ({ children, title, subtitle }: PageLayoutProps) => {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-[32px] font-bold">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500 dark:text-slate-300">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
};

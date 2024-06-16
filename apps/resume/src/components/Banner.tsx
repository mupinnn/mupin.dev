import { ThemeProvider, ThemeSelector } from "@mupin.dev/shared";
import resume from "../data/resume.json";

export default function Banner() {
  return (
    <div className="flex items-center justify-between p-2 border-b sm:border print:hidden">
      <a href={resume.basics.url} target="_blank" rel="noopener noreferrer">
        Check out my portfolio!
      </a>
      <ThemeProvider defaultTheme="light">
        <ThemeSelector />
      </ThemeProvider>
    </div>
  );
}

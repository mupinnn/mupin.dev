import { useLocale, useTranslations } from "next-intl";
import resume from "@mupin.dev/shared/data/resume.json";
import { formatDate } from "@mupin.dev/shared";

export default function ExperienceList() {
  const locale = useLocale();
  const t = useTranslations("Experience");

  return (
    <ul>
      {resume.work.map(work => {
        const formattedStartDate = formatDate(work.startDate, {}, locale);
        const formattedEndDate =
          work.startDate === work.endDate ? t("present") : formatDate(work.endDate, {}, locale);
        const position = work.position.split(",");

        return (
          <li className="space-y-0.5 text-xs *:m-0">
            <h3 className="text-lg font-bold">{work.name}</h3>
            <p>
              <span className="font-semibold">{position[0]}</span>{" "}
              {position[1] && `- ${t("intern")}`}
            </p>
            <p>
              {formattedStartDate} - {formattedEndDate}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

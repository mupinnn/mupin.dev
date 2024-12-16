import { Projects } from "#content";
import { Link } from "@/navigation";
import { CloudinaryImg, ProjectStacksIcon } from "@/components";

export type ProjectListItemProps = Pick<
  Projects,
  "title" | "description" | "stacks" | "slug" | "thumbnail"
>;

export const ProjectListItem = ({
  title,
  description,
  stacks,
  slug,
  thumbnail,
}: ProjectListItemProps) => {
  return (
    <Link href={`/projects/${slug}`}>
      <div className="w-full rounded border-2 border-slate-800 bg-slate-300 p-6 text-slate-900">
        <CloudinaryImg
          src={thumbnail}
          alt={`Thumbnail: ${title}`}
          quality={80}
          className="m-auto"
          imgClassName="rounded"
        />
        <div className="relative z-10 -m-6 flex flex-col gap-3 rounded-b-sm bg-slate-50 p-4">
          <div className="flex flex-col gap-1">
            <p className="font-semibold">{title}</p>
            <p className="text-[10px]">{description}</p>
          </div>
          <ProjectStacksIcon stacks={stacks} />
        </div>
      </div>
    </Link>
  );
};

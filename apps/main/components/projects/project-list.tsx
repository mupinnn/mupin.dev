import { ProjectListItem, ProjectListItemProps } from "./project-list-item";

export interface ProjectListProps {
  data: ProjectListItemProps[];
  emptyMessage: string;
}

export const ProjectList = ({ emptyMessage, data }: ProjectListProps) => {
  if (data.length > 0) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data.map((project, i) => (
          <ProjectListItem key={i} {...project} />
        ))}
      </div>
    );
  }

  return <p>{emptyMessage}</p>;
};

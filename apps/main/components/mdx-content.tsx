import * as runtime from "react/jsx-runtime";
import SocialLinks from "./social-links";
import ExperienceList from "./experience-list";

const useMdxComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

interface MDXContentProps {
  code: string;
  components?: Record<string, React.ComponentType>;
}

export const MDXContent = ({ code, components }: MDXContentProps) => {
  const Component = useMdxComponent(code);
  return (
    <div className="prose prose-slate dark:prose-invert">
      <Component components={{ ...components, SocialLinks, ExperienceList }} />
    </div>
  );
};

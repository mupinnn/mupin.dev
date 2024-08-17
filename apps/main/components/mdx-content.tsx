import * as runtime from "react/jsx-runtime";
import SocialLinks from "./social-links";
import ExperienceList from "./experience-list";
import { CloudinaryImg } from "./images";

const defaultComponents = {
  SocialLinks,
  ExperienceList,
  CloudinaryImg,
};

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
    <div className="prose prose-slate prose-headings:scroll-mt-6 prose-pre:px-0 prose-pre:rounded-none dark:prose-invert sm:prose-pre:rounded-md">
      <Component components={{ ...defaultComponents, ...components }} />
    </div>
  );
};

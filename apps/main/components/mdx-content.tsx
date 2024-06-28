import * as runtime from "react/jsx-runtime";

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
  return <Component components={{ ...components }} />;
};

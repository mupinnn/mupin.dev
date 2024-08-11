import { PostListItem, PostListItemProps } from "./post-list-item";

export interface PostListProps {
  data: Pick<PostListItemProps, "title" | "slug" | "createdAt" | "locale">[];
  emptyMessage: string;
}

export const PostList = ({ data, emptyMessage }: PostListProps) => {
  if (data.length > 0) {
    return (
      <ul className="flex flex-col gap-6">
        {data.map((post, i) => (
          <PostListItem {...post} key={i} totalPost={data.length} itemIndex={i} />
        ))}
      </ul>
    );
  }

  return <p>{emptyMessage}</p>;
};

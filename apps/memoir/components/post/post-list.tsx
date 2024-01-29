import PostItem, { PostItemProps } from "./post-item";
import EmptyPost from "./empty-post";

const dummyPost: PostItemProps[] = [
  {
    title: "Kepada Diriku di XX Tahun Mendatang",
    excerpt: "Tak terbayangkan lorem ipsum dolor sit amet, consectetur adipiscing . . .",
    createdAt: "26 April 2001 - 17.00 WIB",
  },
];

export default function PostList() {
  return (
    <section className="flex flex-col gap-6">
      {dummyPost.length > 0 ? (
        dummyPost.map((post, i) => <PostItem key={i} {...post} />)
      ) : (
        <EmptyPost />
      )}
    </section>
  );
}

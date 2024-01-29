import { PostList } from "@/components/post";

export default function Home() {
  return (
    <>
      <header className="flex flex-col gap-4">
        <h1 className="font-serif text-5xl font-bold">
          Faqih's
          <br />
          Memoir
        </h1>
        <h2>
          Documenting life and all things happening. Occasions, thoughts or reflections. Anything.
        </h2>
      </header>

      <hr />

      <PostList />
    </>
  );
}

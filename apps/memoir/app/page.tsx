import { PostList } from "@/components/post";

export default function Home() {
  return (
    <main className="p-6 max-w-3xl mx-auto flex-1">
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
    </main>
  );
}

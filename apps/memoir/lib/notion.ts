import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

const FIFTY_MINUTE_IN_SECONDS = 3600;
const notion = new Client({
  auth: process.env.NOTION_MEMOIR_TOKEN,
  fetch: (url, opts) => {
    return fetch(url, {
      ...opts,

      // Revalidate the cache in 50 minute to match with ISR nature,
      // that the subsequent request will get the fresh data.
      //
      // Notion file public URL will expired in 1 hour.
      // If we revalidate in 1 hour too, user will see image not found first
      // and then after refreshing the page will get the fresh data.
      next: { tags: ["notion"], revalidate: FIFTY_MINUTE_IN_SECONDS },
    });
  },
});

const n2m = new NotionToMarkdown({ notionClient: notion });
const databaseId = process.env.NOTION_MEMOIR_DATABASE_ID || "";

// TODO: find a way to provide better type from the SDK
const generateMemoirMetadata = (memoir: any) => {
  return {
    id: memoir.id,
    title: memoir.properties.Title.title[0].plain_text,
    excerpt: memoir.properties.Excerpt.rich_text[0].plain_text,
    slug: memoir.properties.Slug.formula.string,
    created_at: memoir.properties["Created time"].created_time,
    updated_at: memoir.properties["Last edited time"].last_edited_time,
  };
};

export const getAllMemoirs = async () => {
  const allMemoirs = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Status",
      select: {
        equals: "Published",
      },
    },
  });

  return allMemoirs.results.map((memoir: any) => generateMemoirMetadata(memoir));
};

export const getMemoirBySlug = async (slug: string) => {
  const memoirBySlug = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Slug",
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  });

  if (memoirBySlug.results.length === 0) return null;

  const page = memoirBySlug.results[0]!;
  const metadata = generateMemoirMetadata(page);
  const mdBlocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdBlocks);

  return {
    ...metadata,
    content: mdString.parent,
  };
};

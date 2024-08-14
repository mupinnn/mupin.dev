# mupin.dev monorepo

Consist of:

- Personal memoir
- Main portfolio

## Uploading image to Cloudinary

- Create `images` folder inside the e.g `/content/{type}/{folder}` -> `/content/blog/dummy-article/images` and all
  image files inside the `images` folder will be uploaded with path `{type}/{folder}`.
- Make sure `bun` or other runtime that can run TypeScript directly is installed on the system.
- Run `bun --env-file=./apps/main/.env.local apps/main/lib/cloudinary.ts`
- Image uploaded!

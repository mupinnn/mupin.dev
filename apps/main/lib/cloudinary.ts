import { readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { v2 as cloudinary } from "cloudinary";
import minimist from "minimist";
import pLimit from "p-limit";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourceDir = resolve(__dirname, "../content");
const limit = pLimit(10);

type Argv = {
  folder: string;
  overwrite: boolean;
  invalidate: boolean;
  type: "blog" | "pages";
};
const argv = minimist<Argv>(process.argv.slice(2));

export async function batchUpload({ folder, overwrite, invalidate, type }: Argv) {
  try {
    const images = readdirSync(resolve(sourceDir, type, folder, "images"));
    const imagesToUpload = images.map(image => {
      return limit(async () => {
        const result = await cloudinary.uploader.upload(
          resolve(sourceDir, type, folder, "images", image),
          {
            folder: `${type}/${folder}`,
            overwrite: overwrite,
            invalidate: invalidate,
          }
        );
        return result;
      });
    });
    const uploadedImages = await Promise.all(imagesToUpload);
    console.log("Uploaded! => ", uploadedImages);
  } catch (error) {
    console.error(error);
  }
}

if (argv.folder && argv.type) {
  await batchUpload(argv);
}

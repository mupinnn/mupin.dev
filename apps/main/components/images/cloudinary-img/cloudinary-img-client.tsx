"use client";

import Image, { ImageLoaderProps, ImageProps } from "next/image";
import { constructCloudinaryUrl } from "@cloudinary-util/url-loader";
import { cn } from "@mupin.dev/shared";

function cloudinaryLoader({ width, src, quality }: ImageLoaderProps): string {
  return constructCloudinaryUrl({
    config: {
      cloud: {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      },
    },
    options: {
      src,
      width,
      quality,
      format: "webp",
      crop: "limit",
    },
  });
}

type CloudinaryImgClientProps = {
  imgClassName?: string;
} & ImageProps;

export default function CloudinaryImgClient({
  imgClassName,
  blurDataURL,
  ...props
}: CloudinaryImgClientProps) {
  return (
    <Image
      {...props}
      className={cn("aspect-video sm:rounded", imgClassName)}
      loader={cloudinaryLoader}
      placeholder="blur"
      blurDataURL={blurDataURL}
    />
  );
}

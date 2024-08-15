import { ImageProps } from "next/image";
import { constructCloudinaryUrl } from "@cloudinary-util/url-loader";
import { cn } from "@mupin.dev/shared";
import CloudinaryImgClient from "./cloudinary-img-client";

export type CloudinaryImgProps = {
  imgClassName?: string;
  caption?: string;
} & ImageProps;

export const CloudinaryImg = async ({
  caption,
  imgClassName,
  className,
  ...props
}: CloudinaryImgProps) => {
  const blurSourceURL = constructCloudinaryUrl({
    config: {
      cloud: {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      },
    },
    options: {
      src: props.src as string,
      blur: "1000",
      width: 10,
      crop: "scale",
    },
  });

  const blurImg = await fetch(blurSourceURL);
  const blurImgArrayBuffer = await blurImg.arrayBuffer();
  const blurImgBase64 = Buffer.from(blurImgArrayBuffer).toString("base64");
  const blurImgBase64DataUrl = `data:${blurImg.headers.get("Content-Type") ?? "image/webp"};base64,${blurImgBase64}`;

  return (
    <figure className={cn("relative -mx-4", className)}>
      <CloudinaryImgClient
        imgClassName={imgClassName}
        blurDataURL={blurImgBase64DataUrl}
        {...props}
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
};
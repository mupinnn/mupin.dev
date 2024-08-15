"use client";

import { useEffect, useState } from "react";
import Image, { ImageLoaderProps, ImageProps } from "next/image";
import { constructCloudinaryUrl } from "@cloudinary-util/url-loader";
import { cn } from "@mupin.dev/shared";

// TODO: consider to create base64 for blur url
// TODO: convert to server component without loader

const config = {
  cloud: {
    cloudName: "dsvv1d3t1",
  },
};

function cloudinaryLoader({ width, src, quality }: ImageLoaderProps): string {
  return constructCloudinaryUrl({
    config,
    options: {
      src,
      width,
      quality,
      format: "auto",
      crop: "limit",
    },
  });
}

type CloudinaryImgProps = {
  imgClassName?: string;
  caption?: string;
} & ImageProps;

export const CloudinaryImg = ({ imgClassName, caption, ...props }: CloudinaryImgProps) => {
  const [blurURLBase64, setBlurURLBase64] = useState("");

  const blurURL = constructCloudinaryUrl({
    config,
    options: {
      src: props.src as string,
      blur: "1000",
      width: 10,
      crop: "scale",
    },
  });

  useEffect(() => {
    (async () => {
      const blurImg = await fetch(blurURL);
      const arrayBuffer = await blurImg.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString("base64");
      console.log({
        base64: `data:${blurImg.headers.get("Content-Type")};base64,${base64}`,
      });
      setBlurURLBase64(`data:${blurImg.headers.get("Content-Type")};base64,${base64}`);
    })();
  }, []);

  return (
    <figure className="relative -mx-4 rounded">
      <div className="absolute h-full w-full rounded-lg object-cover object-center backdrop-blur-xl" />

      {/* <Image
        {...props}
        className={cn("rounded", imgClassName)}
        loader={cloudinaryLoader}
        width={1920}
        height={1280}
      /> */}
      <img
        className={cn("rounded", imgClassName)}
        src="https://res.cloudinary.com/dsvv1d3t1/image/upload/e_blur:1000/c_scale,w_10/f_auto/q_auto/v1/blog/dummy-article/retrosupply-jLwVAUtLOAQ-unsplash.jpg?_a=BATAXdAA0"
        width={1920}
        height={1280}
      />
      {/* <img
        className={cn("rounded", imgClassName)}
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAMAAAAGcixRAAAAeFBMVEXKxKFwcWHSzaiwpIbDv5/Pxp+Ae2bRy6bNyae7spG8uJrHwJzc3r/j58jW0bBdYFSJgWxKTUMuS0k3U0+UhGu4oXe8q4Wrn4Oxqo2zqo9EUEqak3XW1rjIu5RlZFaEeF1PcWdUWVCzr5CHj3pteWmJnolLW1OWnISJY/AjAAAASklEQVQIHQXBhQGAMAADsI65McHd4f8PSUBu9lR51/OAN39XSqH0DqIip9im0juQSGEXziXDIbSCLKTqsIYeVhVoG4zRKMOgaf0DsQYD9uzrBxsAAAAASUVORK5CYII="
        width={1920}
        height={1280}
      /> */}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
};

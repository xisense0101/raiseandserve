"use client";

import Image, { type ImageProps } from "next/image";
import { cloudinaryLoader } from "@/lib/cloudinary";

type Props = Omit<ImageProps, "src" | "loader"> & {
  /** Cloudinary public ID, e.g. "rise/gallery/2026-07-06-meal/img-8190". */
  publicId: string;
};

/**
 * next/image backed by Cloudinary: responsive srcset, lazy loading and
 * AVIF/WebP via f_auto, without running images through Next's optimizer.
 */
export default function CloudinaryImage({ publicId, alt, ...props }: Props) {
  return <Image {...props} alt={alt} src={publicId} loader={cloudinaryLoader} />;
}

"use client";

import { Play } from "lucide-react";
import { formatDuration, type PlayableVideo } from "@/lib/media";
import { cn } from "@/lib/utils";
import { useVideoModal } from "./VideoModal";

type Props = {
  video: PlayableVideo;
  /** Small caption over the bottom of the poster. */
  label?: string;
  tone?: "accent" | "sage";
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Above-the-fold posters load eagerly. */
  priority?: boolean;
};

const CIRCLE = { sm: "size-12", md: "size-[60px]", lg: "size-[72px]" };
const ICON = { sm: "size-4", md: "size-5", lg: "size-6" };

/** A video poster that opens the shared player. Native frame ratio, no cropping. */
export default function PlayCard({ video, label, tone = "accent", size = "lg", className, priority }: Props) {
  const { open } = useVideoModal();
  return (
    <button
      type="button"
      onClick={() => open(video)}
      aria-label={`${video.title} (${formatDuration(video.duration)})`}
      className={cn(
        "group relative block w-full overflow-hidden rounded-soft-lg bg-neutral-800 text-left shadow-md",
        className,
      )}
      style={{ aspectRatio: `${video.width} / ${video.height}` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized Cloudinary poster */}
      <img
        src={video.poster}
        alt=""
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,color-mix(in_srgb,var(--color-neutral-900)_72%,transparent))]" />
      <span
        className={cn(
          "absolute top-1/2 left-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-white shadow-lg transition-transform group-hover:scale-105",
          tone === "accent" ? "bg-accent" : "bg-accent-2",
          CIRCLE[size],
        )}
      >
        <Play aria-hidden className={cn("translate-x-px fill-current", ICON[size])} strokeWidth={0} />
      </span>
      <span className="absolute right-4 bottom-4 left-4 flex flex-col text-[13px] leading-snug font-semibold text-white">
        {label ?? video.title}
        <span className="font-normal opacity-80">{formatDuration(video.duration)}</span>
      </span>
    </button>
  );
}

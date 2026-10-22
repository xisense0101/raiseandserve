"use client";

import { Play } from "lucide-react";
import { formatDuration, type PlayableVideo } from "@/lib/media";
import { useVideoModal } from "./VideoModal";

/** Small pill that opens a film (hero top-left badge in the hi-fi). */
export default function PlayBadge({ video, label }: { video: PlayableVideo; label: string }) {
  const { open } = useVideoModal();
  return (
    <button
      type="button"
      onClick={() => open(video)}
      className="flex items-center gap-2 rounded-full bg-neutral-900/55 py-[7px] pr-3.5 pl-2 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:bg-neutral-900/75"
    >
      <span className="grid size-[22px] place-items-center rounded-full bg-accent">
        <Play aria-hidden className="size-2.5 translate-x-px fill-current" strokeWidth={0} />
      </span>
      {label}
      <span className="font-normal opacity-75">{formatDuration(video.duration)}</span>
    </button>
  );
}

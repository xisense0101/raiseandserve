"use client";

import { useEffect, useRef, useState } from "react";

type AutoplayMuxEmbedProps = {
  src: string;
  title: string;
};

export default function AutoplayMuxEmbed({ src, title }: AutoplayMuxEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldPlay, setShouldPlay] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldPlay(true);
        }
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const videoSrc = shouldPlay ? `${src}?autoplay=true` : src;

  return (
    <div
      ref={containerRef}
      className="mx-auto overflow-hidden rounded-2xl"
      style={{
        width: "min(100%, 24rem, calc(100dvh - 8rem))",
      }}
    >
      <iframe
        src={videoSrc}
        style={{
          width: "100%",
          border: "none",
          aspectRatio: "9 / 16",
          maxHeight: "calc(100dvh - 8rem)",
        }}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowFullScreen
        title={title}
      />
    </div>
  );
}

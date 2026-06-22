"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Heart, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    image: "/hero-1.png",
    // Group shot — keep faces in view, anchor top
    objectPosition: "center 15%",
    heading: ["Learning", "Beyond Limits"],
    headingColor: "#007ED1",
    subtext:
      "Your contribution can make a real difference in the lives of students, and help build a brighter future for our community.",
    ctaLabel: "Donate Now",
    ctaHref: "/donate",
    ctaSecondary: "Explore Services",
    ctaSecondaryHref: "/services",
  },
  {
    id: 2,
    image: "/add-image-2.png",
    // Volunteer group shot — center keeps the team framed cleanly
    objectPosition: "center center",
    heading: ["Empowering", "Our Community"],
    headingColor: "#FF9B00",
    subtext:
      "Established in September 2023, RISE is committed to empowering individuals to excel academically through workshops, seminars, and community service events.",
    ctaLabel: "Learn More",
    ctaHref: "/about",
    ctaSecondary: "Volunteer",
    ctaSecondaryHref: "/volunteer",
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/7156167/pexels-photo-7156167.jpeg?cs=srgb&dl=pexels-gustavo-fring-7156167.jpg&fm=jpg",
    // Donation boxes and volunteers read best with a centered crop
    objectPosition: "center center",
    heading: ["Rise Together,", "Rise Always"],
    headingColor: "#007ED1",
    subtext:
      "Join our ongoing donation efforts to support education and provide essential assistance to those in need today.",
    ctaLabel: "Donate Now",
    ctaHref: "/donate",
    ctaSecondary: "See Events",
    ctaSecondaryHref: "/events",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const goTo = useCallback(
    (idx: number, dir: "left" | "right" = "right") => {
      if (animating || idx === current) return;
      setDirection(dir);
      setAnimating(true);
      setPrev(current);
      setCurrent(idx);
      setTimeout(() => {
        setPrev(null);
        setAnimating(false);
      }, 800);
    },
    [animating, current]
  );

  const nextSlide = useCallback(() => {
    goTo((current + 1) % SLIDES.length, "right");
  }, [current, goTo]);

  const prevSlide = useCallback(() => {
    goTo((current - 1 + SLIDES.length) % SLIDES.length, "left");
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "calc(100vh - 80px)", minHeight: 560 }}
    >
      {/* ── Background slides with Ken Burns zoom ── */}
      {SLIDES.map((s, i) => {
        const isActive = i === current;
        const isPrev = i === prev;
        return (
          <div
            key={s.id}
            className="absolute inset-0"
            style={{
              zIndex: isActive ? 2 : isPrev ? 1 : 0,
              pointerEvents: isActive ? "auto" : "none",
            }}
          >
            <img
              src={s.image}
              alt=""
              className="w-full h-full object-cover"
              style={{
                objectPosition: s.objectPosition,
                transform: isActive && animating
                  ? "scale(1.08)"
                  : isActive
                  ? "scale(1.04)"
                  : "scale(1)",
                transition: isActive
                  ? "transform 6s ease-out, opacity 0.8s ease"
                  : "opacity 0.8s ease",
                opacity: isActive ? 1 : isPrev && animating ? 0 : 0,
              }}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/85 via-gray-900/50 to-transparent" />
          </div>
        );
      })}

      {/* ── Slide content — each slide owns its full-height centering ── */}
      {SLIDES.map((s, i) => {
        const isActive = i === current;
        return (
          <div
            key={s.id}
            className="absolute inset-0 z-10 flex items-center"
            style={{
              opacity: isActive ? 1 : 0,
              transform: isActive
                ? "translateX(0)"
                : direction === "right"
                ? "translateX(48px)"
                : "translateX(-48px)",
              transition: isActive
                ? "opacity 0.65s ease 0.1s, transform 0.65s cubic-bezier(0.22,1,0.36,1) 0.1s"
                : "opacity 0.35s ease, transform 0.35s ease",
              pointerEvents: isActive ? "auto" : "none",
            }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              {/* Heading */}
              <h1
                className="text-5xl sm:text-6xl md:text-7xl font-heading font-extrabold text-white leading-[1.1] mb-6 text-shadow"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0)" : "translateY(22px)",
                  transition: "opacity 0.65s ease 0.2s, transform 0.65s ease 0.2s",
                }}
              >
                <span style={{ color: s.headingColor }}>{s.heading[0]}</span>
                <br />
                {s.heading[1]}
              </h1>

              {/* Subtext */}
              <p
                className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed mb-10"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0)" : "translateY(16px)",
                  transition: "opacity 0.65s ease 0.35s, transform 0.65s ease 0.35s",
                }}
              >
                {s.subtext}
              </p>

              {/* CTAs */}
              <div
                className="flex flex-col sm:flex-row gap-4"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0)" : "translateY(14px)",
                  transition: "opacity 0.65s ease 0.5s, transform 0.65s ease 0.5s",
                }}
              >
                <Link
                  href={s.ctaHref}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold text-white bg-accent hover:bg-accent-hover transition-all duration-200 hover:-translate-y-1 shadow-lg shadow-accent/30"
                >
                  {s.ctaLabel}
                  <Heart className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href={s.ctaSecondaryHref}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-sm transition-all duration-200 hover:-translate-y-1"
                >
                  {s.ctaSecondary}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        );
      })}

      {/* ── Arrows ── */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white hidden md:flex items-center justify-center backdrop-blur-sm transition-all duration-200 hover:scale-110"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white hidden md:flex items-center justify-center backdrop-blur-sm transition-all duration-200 hover:scale-110"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* ── Dots ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? "right" : "left")}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-8 h-3 bg-accent"
                : "w-3 h-3 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

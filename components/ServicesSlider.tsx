"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  UtensilsCrossed,
  Library,
  ShoppingBasket,
  Rocket,
  Shirt,
  HandHeart,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ICON_MAP = {
  UtensilsCrossed: UtensilsCrossed,
  Library: Library,
  ShoppingBasket: ShoppingBasket,
  Rocket: Rocket,
  Shirt: Shirt,
  HandHeart: HandHeart,
};

const PROGRAMS = [
  {
    title: "Community Feeding",
    iconName: "UtensilsCrossed" as const,
    desc: "Free meals for families and individuals facing food insecurity. No charge. No conditions.",
    cta: "See Events",
    href: "/events",
  },
  {
    title: "Accessible Education",
    iconName: "Library" as const,
    desc: "Empowering individuals through accessible education opportunities and academic support.",
    cta: "Our Services",
    href: "/services",
  },
  {
    title: "Food Bank Initiatives",
    iconName: "ShoppingBasket" as const,
    desc: "Supporting food bank initiatives to provide essential nourishment and support.",
    cta: "Donate Now",
    href: "/donate",
  },
  {
    title: "Talent Pipeline",
    iconName: "Rocket" as const,
    desc: "Career development, mentorship, and opportunity-building support.",
    cta: "Apply to RISE",
    href: "/apply",
  },
  {
    title: "Clothing Drives",
    iconName: "Shirt" as const,
    desc: "Collecting and distributing essential clothing items to support families.",
    cta: "Get Involved",
    href: "/volunteer",
  },
  {
    title: "Community Service",
    iconName: "HandHeart" as const,
    desc: "Hands-on events that bring volunteers, donors, and neighbors together.",
    cta: "View Events",
    href: "/events",
  },
];

export default function ServicesSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 55;
    const isRightSwipe = distance < -55;

    if (isLeftSwipe && activeIndex < PROGRAMS.length - 1) {
      setActiveIndex((prev) => prev + 1);
    } else if (isRightSwipe && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const nextSlide = () => {
    if (activeIndex < PROGRAMS.length - 1) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full">
      {/* ─── Desktop Grid (Visible from sm breakpoint) ─── */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
        {PROGRAMS.map((program, i) => {
          const IconComponent = ICON_MAP[program.iconName];
          return (
            <div
              key={i}
              className="group bg-white p-8 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col hover-sheen"
            >
              <div className="h-14 w-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:scale-110">
                <IconComponent size={28} />
              </div>
              <h4 className="text-xl font-heading font-bold text-gray-900 mb-3">
                {program.title}
              </h4>
              <p className="text-gray-600 mb-8 flex-grow leading-relaxed">
                {program.desc}
              </p>
              <Link
                href={program.href}
                className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-dark group/link"
              >
                {program.cta}
                <ArrowRight
                  size={16}
                  className="ml-1.5 group-hover/link:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          );
        })}
      </div>

      {/* ─── Mobile Slider (Hidden on sm screens and up) ─── */}
      <div className="sm:hidden w-full relative flex flex-col overflow-hidden">
        {/* Slider Window */}
        <div
          className="w-full overflow-hidden px-4"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out gap-4 py-4"
            style={{
              transform: `translate3d(calc(-${activeIndex} * (82% + 1rem)), 0, 0)`,
            }}
          >
            {PROGRAMS.map((program, i) => {
              const IconComponent = ICON_MAP[program.iconName];
              const isActive = i === activeIndex;
              return (
                <div
                  key={i}
                  className={`w-[82%] shrink-0 transition-all duration-500 ease-out origin-center ${
                    isActive
                      ? "scale-100 opacity-100 shadow-lg shadow-slate-200/50 border-primary/30"
                      : "scale-95 opacity-50 border-gray-100"
                  } bg-white p-7 rounded-2xl border flex flex-col`}
                >
                  <div
                    className={`h-12 w-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 ${
                      isActive ? "bg-primary text-white scale-110" : "bg-primary/10 text-primary"
                    }`}
                  >
                    <IconComponent size={24} />
                  </div>
                  <h4 className="text-lg font-heading font-bold text-gray-900 mb-2">
                    {program.title}
                  </h4>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed flex-grow">
                    {program.desc}
                  </p>
                  <Link
                    href={program.href}
                    className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-dark group/link"
                  >
                    {program.cta}
                    <ArrowRight
                      size={14}
                      className="ml-1 group-hover/link:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls: Prev Button, Dot Indicators, Next Button */}
        <div className="flex items-center justify-between mt-4 px-4">
          {/* Prev Arrow */}
          <button
            onClick={prevSlide}
            disabled={activeIndex === 0}
            className={`p-2 rounded-full border transition-all duration-200 ${
              activeIndex === 0
                ? "border-gray-100 text-gray-300 cursor-not-allowed opacity-50"
                : "border-gray-200 text-gray-700 hover:bg-gray-50 active:scale-95"
            }`}
            aria-label="Previous service"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {PROGRAMS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-6 bg-primary"
                    : "w-2 bg-gray-200 hover:bg-gray-300"
                }`}
                aria-label={`Go to service ${i + 1}`}
              />
            ))}
          </div>

          {/* Next Arrow */}
          <button
            onClick={nextSlide}
            disabled={activeIndex === PROGRAMS.length - 1}
            className={`p-2 rounded-full border transition-all duration-200 ${
              activeIndex === PROGRAMS.length - 1
                ? "border-gray-100 text-gray-300 cursor-not-allowed opacity-50"
                : "border-gray-200 text-gray-700 hover:bg-gray-50 active:scale-95"
            }`}
            aria-label="Next service"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/motion/Magnetic";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Events", href: "/events" },
  { label: "Apply", href: "/apply" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className={cn("transition-all duration-300", isScrolled ? "py-2" : "py-4")}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              "flex items-center justify-between rounded-3xl border px-3 md:px-5 transition-all duration-300",
              isScrolled
                ? "h-14 bg-background/85 backdrop-blur-xl border-border shadow-lg shadow-primary-900/5"
                : "h-18 bg-background/50 backdrop-blur-md border-white/50 shadow-sm"
            )}
          >
            <div className="flex items-center">
              <Link href="/" className="flex flex-shrink-0 items-center group">
                <div
                  className={cn(
                    "relative overflow-hidden transition-all duration-300",
                    isScrolled ? "h-9 w-9 md:h-10 md:w-10" : "h-12 w-12 md:h-14 md:w-14"
                  )}
                >
                  <Image
                    src="/logo.jpeg"
                    alt="RISE Logo"
                    fill
                    className="object-contain rounded-xl group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
            </div>

            <nav className="hidden md:block">
              <ul className="flex items-center gap-1 lg:gap-1.5 rounded-full bg-foreground/5 p-1 ring-1 ring-border/60">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "relative inline-flex items-center justify-center rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-300 ease-out group overflow-hidden",
                          "hover:-translate-y-0.5 hover:text-primary",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2",
                          isActive
                            ? "text-primary font-semibold bg-primary-light shadow-sm"
                            : "text-muted-foreground"
                        )}
                      >
                        <span className="relative z-10">{link.label}</span>
                        <span
                          className={cn(
                            "absolute bottom-1.5 left-1/2 z-10 h-1 w-1 rounded-full bg-primary transition-all duration-300",
                            isActive
                              ? "-translate-x-1/2 opacity-100 scale-100"
                              : "-translate-x-1/2 opacity-0 scale-0"
                          )}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="hidden md:flex items-center">
              <Magnetic strength={0.25}>
                <Link
                  href="/donate"
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-full shadow-sm text-sm font-semibold text-white bg-accent hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/25 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-all duration-300 hover-sheen"
                >
                  Donate Now
                </Link>
              </Magnetic>
            </div>

            <div className="flex md:hidden items-center">
              <button
                onClick={toggleMenu}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary-light/60 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div
            className={cn(
              "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
              isOpen ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"
            )}
            id="mobile-menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 rounded-3xl glass-card border border-border/60">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200",
                      isActive
                        ? "text-primary bg-primary-light shadow-sm"
                        : "text-muted-foreground hover:text-primary hover:bg-primary-light/60 hover:translate-x-1"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-4 pb-2 px-3">
                <Link
                  href="/donate"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center px-4 py-3 rounded-full shadow-sm text-base font-medium text-white bg-accent hover:bg-accent-hover transition-colors"
                >
                  Donate Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

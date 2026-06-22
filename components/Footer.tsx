"use client";

import Link from "next/link";
import Image from "next/image";

const Facebook = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const Instagram = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Linkedin = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function Footer() {

  return (
    <footer className="bg-[#0f172a] text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Mission */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <div className="flex items-center">
                <div className="relative h-14 w-14 bg-white rounded-xl p-1.5 overflow-hidden flex items-center justify-center shadow-lg shadow-black/10 hover:scale-105 transition-all duration-300">
                  <Image src="/logo.jpeg" alt="RISE Logo" fill className="object-contain animate-fade-in" />
                </div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              RISE uplifts individuals in need through empowerment, education, and community service for a brighter future. Let&apos;s rise together.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 bg-gray-800 rounded-full hover:bg-primary" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 bg-gray-800 rounded-full hover:bg-primary" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 bg-gray-800 rounded-full hover:bg-primary" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-heading font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 transition-colors text-sm relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:-bottom-1 after:left-0 after:bg-primary-light after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left hover:text-white">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 transition-colors text-sm relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:-bottom-1 after:left-0 after:bg-primary-light after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left hover:text-white">About Us</Link></li>
              <li><Link href="/services" className="text-gray-400 transition-colors text-sm relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:-bottom-1 after:left-0 after:bg-primary-light after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left hover:text-white">Services</Link></li>
              <li><Link href="/events" className="text-gray-400 transition-colors text-sm relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:-bottom-1 after:left-0 after:bg-primary-light after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left hover:text-white">Events</Link></li>
              <li><Link href="/volunteer" className="text-gray-400 transition-colors text-sm relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:-bottom-1 after:left-0 after:bg-primary-light after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left hover:text-white">Volunteer</Link></li>
              <li><Link href="/contact" className="text-gray-400 transition-colors text-sm relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:-bottom-1 after:left-0 after:bg-primary-light after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left hover:text-white">Contact Us</Link></li>
              <li><Link href="/donate" className="text-gray-400 transition-colors text-sm relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:-bottom-1 after:left-0 after:bg-primary-light after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left hover:text-white">Donate Now</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-heading font-semibold text-lg mb-6">Services</h3>
            <ul className="space-y-3">
              <li><Link href="/services#community-feeding" className="text-gray-400 transition-colors text-sm relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:-bottom-1 after:left-0 after:bg-primary-light after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left hover:text-white">Community Feeding</Link></li>
              <li><Link href="/services#talent-pipeline" className="text-gray-400 transition-colors text-sm relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:-bottom-1 after:left-0 after:bg-primary-light after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left hover:text-white">Talent Pipeline</Link></li>
              <li><Link href="/services#food-bank" className="text-gray-400 transition-colors text-sm relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:-bottom-1 after:left-0 after:bg-primary-light after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left hover:text-white">Food Pantry</Link></li>
              <li><Link href="/services#clothing-drives" className="text-gray-400 transition-colors text-sm relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:-bottom-1 after:left-0 after:bg-primary-light after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left hover:text-white">Clothing Drives</Link></li>
              <li><Link href="/apply" className="text-gray-400 transition-colors text-sm relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:-bottom-1 after:left-0 after:bg-primary-light after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left hover:text-white">Apply Now</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <div>
              <address className="not-italic text-sm text-gray-400 space-y-1">
                <p className="text-white font-medium mb-2">Contact Us</p>
                <p><a href="tel:9725233544" className="hover:text-white transition-colors">(972) 523-3544</a></p>
                <p>539 W Commerce St</p>
                <p>Suite 6954</p>
                <p>Dallas, Texas 75208</p>
                <p><a href="https://riseandserve.org" className="text-primary hover:text-primary-light transition-colors mt-1 inline-block">riseandserve.org</a></p>
              </address>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col justify-center items-center gap-4">
          <p className="text-xs text-gray-500 text-center">
            Copyright © Resourceful Impact in Scholastic Education {new Date().getFullYear()}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

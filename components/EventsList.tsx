"use client";

import { useState, useEffect, useRef } from "react";
import { Calendar, MapPin, Clock, ArrowRight, X } from "lucide-react";
import Script from "next/script";

interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageSrc: string;
  zeffyLink: string;
}

const EVENTS: EventItem[] = [
  {
    id: "event1",
    title: "EVENT 1",
    date: "Monday, July 6, 2026",
    time: "4:00 PM - 7:00 PM",
    location: "",
    description: "Join us for an unforgettable culinary experience that supports a great cause. Our 'Eat It, Love It' event brings the community together to share delicious food, meet local chefs, and support RISE's ongoing initiatives. Tickets are completely free, and any voluntary donations go directly towards our community feeding programs, scholastic education, and essential support drives.",
    imageSrc: "/event-catfish.jpg",
    zeffyLink: "https://www.zeffy.com/embed/ticketing/eat-it-love-it?modal=true"
  },
  {
    id: "event2",
    title: "EVENT 2",
    date: "Monday, July 20, 2026",
    time: "10:00 AM - 12:00 PM",
    location: "",
    description: "Join us for our second major community initiative. This event supports RISE's programs, bringing volunteers, neighbors, and community members together to build a brighter future. Tickets are completely free, and any voluntary donations help fund educational workshops, community feeding events, and local assistance drives.",
    imageSrc: "/event-cis.jpg",
    zeffyLink: "https://www.zeffy.com/embed/ticketing/2st-event?modal=true"
  }
];

export default function EventsList() {
  const [activeUrl, setActiveUrl] = useState<string | null>(null);
  const [activeFlyer, setActiveFlyer] = useState<EventItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    document.body.style.overflow = activeUrl || activeFlyer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeFlyer, activeUrl]);

  // Handle Zeffy close message
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.id === "zeffy-iframe" && e.data.close) {
        setIsOpen(false);
        setTimeout(() => {
          setActiveUrl(null);
        }, 250);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeFlyer) {
          setActiveFlyer(null);
          return;
        }
        setIsOpen(false);
        setTimeout(() => {
          setActiveUrl(null);
        }, 250);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeFlyer]);

  const handleOpen = (url: string) => {
    // Add cachebust parameter
    const parsedUrl = new URL(url);
    parsedUrl.searchParams.set("cachebust", Date.now().toString());
    setActiveUrl(parsedUrl.toString());
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleClose = () => {
    setIsOpen(false);
    // Delay clearing active URL to let the fade transition finish
    setTimeout(() => {
      setActiveUrl(null);
    }, 250);
  };

  const handleFlyerOpen = (event: EventItem) => {
    setActiveFlyer(event);
  };

  const handleFlyerClose = () => {
    setActiveFlyer(null);
  };

  const handleIframeLoad = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        { id: "zeffy-iframe", open: true },
        "*"
      );
    }
  };

  return (
    <div className="w-full">
      {/* Events Container */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {EVENTS.map((event) => (
          <div 
            key={event.id}
            className="flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-200/60 shadow-sm h-full"
          >
            {/* Image Banner - Full resolution, scales to fit bounds, no crop */}
            <button
              type="button"
              onClick={() => handleFlyerOpen(event)}
              className="group relative w-full h-64 bg-slate-50/50 flex items-center justify-center p-6 shrink-0 cursor-zoom-in"
              aria-label={`Enlarge flyer for ${event.title}`}
            >
              <img 
                src={event.imageSrc} 
                alt={event.title}
                className="max-w-full max-h-full w-auto h-auto object-contain rounded-2xl"
              />
              <div className="pointer-events-none absolute inset-x-6 bottom-5 rounded-xl bg-slate-900/72 px-4 py-2 text-center text-xs font-semibold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                Click to enlarge flyer
              </div>
            </button>

            {/* Details Section */}
            <div className="p-6 lg:p-8 flex flex-col justify-between flex-grow">
              <div className="space-y-4 flex-1 flex flex-col mb-6">
                <div className="space-y-2 flex-none">
                  <h2 className="text-2xl font-heading font-extrabold text-slate-900 leading-tight">
                    {event.title}
                  </h2>
                  
                  {/* Meta details */}
                  <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs text-slate-650 font-semibold border-y border-slate-100 py-3">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{event.time}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description - Flows naturally */}
                <div className="flex-1">
                  <p className="text-slate-600 leading-relaxed text-sm font-body whitespace-pre-line">
                    {event.description}
                  </p>
                </div>
              </div>

              {/* Sign Up Button */}
              <div className="pt-4 border-t border-slate-100 flex-none">
                <button
                  onClick={() => handleOpen(event.zeffyLink)}
                  {...{ "zeffy-form-link": event.zeffyLink }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark shadow-sm transition-colors duration-200 cursor-pointer text-sm lg:text-base font-body"
                >
                  <span>Sign Up</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Zeffy Modal Popup Overlay */}
      {activeUrl && (
        <>
          {/* Backdrop */}
          <div 
            onClick={handleClose}
            className={`fixed inset-0 bg-black/60 z-[10000] transition-opacity duration-250 ${
              isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            style={{ backdropFilter: "blur(4px)" }}
          />

          {/* Modal Container */}
          <div 
            className={`fixed z-[10001] transition-all duration-250 bg-white shadow-2xl flex flex-col ${
              isOpen 
                ? "opacity-100 scale-100" 
                : "opacity-0 scale-95 pointer-events-none"
            } inset-0 md:top-[5%] md:bottom-[5%] md:left-[10%] md:right-[10%] md:rounded-2xl overflow-hidden`}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-[10002] p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-colors"
              aria-label="Close form"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Zeffy Iframe */}
            <iframe 
              ref={iframeRef}
              title="Form powered and secured by Zeffy" 
              className="w-full h-full border-none"
              src={activeUrl}
              allow="payment"
              onLoad={handleIframeLoad}
            />
          </div>
        </>
      )}

      {activeFlyer && (
        <>
          <div
            onClick={handleFlyerClose}
            className="fixed inset-0 z-[10020] bg-black/80"
            style={{ backdropFilter: "blur(6px)" }}
          />
          <div className="fixed inset-0 z-[10021] flex items-center justify-center p-4 md:p-8">
            <button
              type="button"
              onClick={handleFlyerClose}
              className="absolute right-4 top-4 z-[10022] rounded-full bg-white/90 p-2 text-slate-700 transition-colors hover:bg-white"
              aria-label="Close flyer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={activeFlyer.imageSrc}
              alt={`${activeFlyer.title} flyer`}
              className="max-h-full max-w-full rounded-2xl bg-white object-contain shadow-2xl"
            />
          </div>
        </>
      )}

      {/* Zeffy script for popup modal binding */}
      <Script 
        src="https://zeffy-scripts.s3.ca-central-1.amazonaws.com/embed-form-script.min.js"
        strategy="lazyOnload"
      />
    </div>
  );
}

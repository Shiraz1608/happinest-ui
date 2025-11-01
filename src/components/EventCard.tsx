
"use client";

import React from "react";
import { useTheme } from "@/app/providers/ThemeProvider";
import { CalendarDays, MapPin, Users, Eye } from "lucide-react";

interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  location: string;
  guests: string | number;
  tags: string[];
  image: string;
}

interface EventCardProps {
  event: Event;
  view: "list" | "grid";
}

export default function EventCard({ event, view }: EventCardProps) {
  const { theme } = useTheme();
  const [imgError, setImgError] = React.useState(false);

  const baseCardStyle =
    theme === "light"
      ? "bg-white border border-gray-100 text-gray-800"
      : "bg-gray-800 border border-gray-700 text-white";

  const getTagStyles = (tag: string) => {
    if (tag === "Live") {
      return theme === "light"
        ? "bg-yellow-50 text-yellow-700 border border-yellow-100"
        : "bg-yellow-600 text-yellow-100 border border-yellow-700";
    }
    if (tag === "Complete") {
      return theme === "light"
        ? "bg-purple-50 text-purple-700 border border-purple-100"
        : "bg-purple-600 text-purple-100 border border-purple-700";
    }
    return theme === "light"
      ? "bg-teal-50 text-teal-700 border border-teal-100"
      : "bg-teal-600 text-teal-100 border border-teal-700";
  };

  /** ✅ Updated Fallback Image */
  const FallbackImage = () => (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[var(--brand-pink)] to-[var(--brand-teal)]">
      {/* soft blobs */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/3 w-40 h-40 bg-white/20 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* heart box */}
    <div className="absolute inset-0 flex items-center justify-center">
  <div className="p-6 rounded-xl border border-white/30 bg-white/10 backdrop-blur-xl flex items-center justify-center shadow-lg">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="h-14 w-14"        // 56x56 px
      fill="none"
      stroke="white"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="heart"
    >
      <path d="M2 9.5a5.5 5.5 0 0 1 9.5-3.7 0.6 0.6 0 0 0 .9 0A5.5 5.5 0 0 1 22 9.5c0 2.3-1.5 4-3 5.5l-5.5 5.3a2 2 0 0 1-3 0L5 15C3.5 13.5 2 11.8 2 9.5Z" />
    </svg>
  </div>
</div>


      {/* soft bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
    </div>
  );

  // ✅ LIST VIEW
  if (view === "list") {
    return (
      <div
        className={`group flex rounded-xl shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 gap-4 w-full cursor-pointer p-4 ${baseCardStyle} z-0`}
      >
        <div className="w-60 flex-shrink-0 h-32 rounded-lg overflow-hidden">
          {!imgError && event?.image ? (
            <img
              src={event.image}
              alt={event?.name}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <FallbackImage />
          )}
        </div>

        <div className="flex flex-col justify-between flex-1 gap-3">
          <div className="flex flex-col gap-4">
            <div className="flex gap-1.5">
              {event?.tags?.map((tag, i) => (
                <span
                  key={i}
                  className={`text-xs font-medium px-1.5 py-0.5 rounded-md ${getTagStyles(
                    tag
                  )}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="text-sm font-semibold transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-purple-500 group-hover:text-transparent group-hover:bg-clip-text">
              {event?.name}
            </h3>

            <p className="text-xs line-clamp-1">{event?.description}</p>
          </div>

          <div className="flex flex-wrap gap-1.5 text-xs">
            <div className="flex items-center gap-0.5">
              <CalendarDays className="w-3 h-3 text-pink-400" />
              {event?.date}
            </div>
            <div className="flex items-center gap-0.5">
              <MapPin className="w-3 h-3 text-pink-400" />
              {event?.location}
            </div>
            <div className="flex items-center gap-0.5">
              <Users className="w-3 h-3 text-pink-400" />
              {event?.guests} guests
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ GRID VIEW
  return (
    <div
      className={`group rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 w-full sm:w-[22rem] h-[30rem] flex flex-col cursor-pointer ${baseCardStyle}`}
    >
      <div className="w-full h-52 overflow-hidden">
        {!imgError && event?.image ? (
          <img
            src={event.image}
            alt={event?.name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <FallbackImage />
        )}
      </div>

      <div className="flex flex-col justify-between flex-1 p-5">
        <div className="flex flex-col">
          <div className="flex gap-2">
            {event?.tags.map((tag, i) => (
              <span
                key={i}
                className={`text-xs font-medium px-3 py-1 rounded-full ${getTagStyles(
                  tag
                )}`}
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-lg font-semibold mt-2 group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-purple-500 group-hover:text-transparent group-hover:bg-clip-text">
            {event?.name}
          </h3>

          <p className="text-sm mt-1 line-clamp-2">{event?.description}</p>

          <div className="mt-2 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-pink-400" />
              <span>{event?.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-pink-400" />
              <span>{event?.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-pink-400" />
              <span>{event?.guests} guests</span>
            </div>
          </div>
        </div>

        <button className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white font-medium py-2.5 rounded-2xl hover:opacity-90 transition mt-5">
          <Eye className="w-4 h-4" />
          View Event
        </button>
      </div>
    </div>
  );
}

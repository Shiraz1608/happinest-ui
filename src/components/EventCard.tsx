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

  // Fully opaque backgrounds
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

 
  // LIST VIEW
if (view === "list") {
  return (
    <div
      className={`group flex rounded-xl shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 gap-4 w-full cursor-pointer p-4 ${baseCardStyle} z-0`}
    >
      {/* Image */}
      <div className="w-60 flex-shrink-0 h-32">
        <img
          src={event?.image || "/placeholder.jpg"}
          alt={event?.name || "Event Image"}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Event Details */}
      <div className="flex flex-col justify-between flex-1 gap-3"> {/* slightly increased gap */}
        <div className="flex flex-col gap-4"> {/* slightly increased gap */}
          {/* Tags */}
          <div className="flex gap-1.5">
            {event?.tags?.map((tag, i) => (
              <span
                key={i}
                className={`text-xs font-medium px-1.5 py-0.5 rounded-md ${getTagStyles(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3
            className="text-sm font-semibold transition-all duration-300 
            group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-purple-500 
            group-hover:text-transparent group-hover:bg-clip-text"
          >
            {event?.name || "Untitled Event"}
          </h3>

          <p className="text-xs line-clamp-1">
            {event?.description || "No description available"}
          </p>
        </div>

        {/* Info */}
        <div className="flex flex-wrap gap-1.5 text-xs"> {/* smaller gaps */}
          <div className="flex items-center gap-0.5">
            <CalendarDays className="w-3 h-3 text-pink-400" />
            {event?.date || "TBD"}
          </div>
          <div className="flex items-center gap-0.5">
            <MapPin className="w-3 h-3 text-pink-400" />
            {event?.location || "Online"}
          </div>
          <div className="flex items-center gap-0.5">
            <Users className="w-3 h-3 text-pink-400" />
            {event?.guests ?? 0} guests
          </div>
        </div>
      </div>
    </div>
  );
}


  // GRID VIEW
  return (
    <div
      className={`group rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 w-full sm:w-[22rem] h-[30rem] flex flex-col cursor-pointer ${baseCardStyle} z-0`}
    >
      {/* Event Image */}
      <img
        src={event?.image || "/placeholder.jpg"}
        alt={event?.name || "Event Image"}
        className="w-full h-52 object-cover"
      />

      {/* Event Details */}
      <div className="flex flex-col justify-between flex-1 p-5">
        <div className="flex flex-col">
          {/* Tags */}
          <div className="flex gap-2">
            {event?.tags?.map((tag, i) => (
              <span
                key={i}
                className={`text-xs font-medium px-3 py-1 rounded-full ${getTagStyles(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3
            className="text-lg font-semibold mt-2 transition-all duration-300 
            group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-purple-500 
            group-hover:text-transparent group-hover:bg-clip-text"
          >
            {event?.name || "Untitled Event"}
          </h3>

          <p className="text-sm mt-1 line-clamp-2">
            {event?.description || "No description available"}
          </p>

          {/* Info */}
          <div className="mt-2 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-pink-400" />
              <span>{event?.date || "TBD"}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-pink-400" />
              <span>{event?.location || "Online"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-pink-400" />
              <span>{event?.guests ?? 0} guests</span>
            </div>
          </div>
        </div>

        {/* View Button */}
        <button className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white font-medium py-2.5 rounded-2xl hover:opacity-90 transition mt-5">
          <Eye className="w-4 h-4" />
          View Event
        </button>
      </div>
    </div>
  );
}

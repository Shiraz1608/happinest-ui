"use client";

import React, { useState } from "react";
import { useTheme } from "@/app/providers/ThemeProvider";
import EventCard from "./EventCard";
import { ChevronDown, ChevronUp } from "lucide-react";

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

interface LiveEventsProps {
  events: Event[];
  view: "list" | "grid";
}

export default function LiveEvents({ events, view }: LiveEventsProps) {
  const [showLiveEvents, setShowLiveEvents] = useState(true);
  const { theme } = useTheme();

  if (!events || events.length === 0) {
    return <p className="text-gray-600 dark:text-gray-300">No events found.</p>;
  }

  return (
    <div>
      {/* 🔴 Header with live indicator and toggle */}
      <div className="flex items-center justify-between">
        <h2
          className={`text-lg font-semibold flex items-center gap-2 transition-colors duration-300 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          <div className="h-3 w-3 rounded-full bg-purple-500 animate-pulse"></div>
          Live Events
          <span className="text-sm bg-pink-100 text-pink-700 dark:bg-pink-700 dark:text-pink-100 rounded-md px-2 py-0.5">
            {events.length}
          </span>
        </h2>

        {/* ⬇️ Toggle Button */}
        <button
          onClick={() => setShowLiveEvents(!showLiveEvents)}
          className="flex items-center justify-center p-1 rounded-md text-gray-500 dark:text-gray-200 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          {showLiveEvents ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* 🧾 Event Cards */}
      {showLiveEvents && (
        <div
          className={
            view === "grid"
              ? "flex flex-wrap gap-6 mt-4"
              : "flex flex-col gap-4 mt-4"
          }
        >
          {events.map((event) =>
            event ? <EventCard key={event.id} event={event} view={view} /> : null
          )}
        </div>
      )}
    </div>
  );
}

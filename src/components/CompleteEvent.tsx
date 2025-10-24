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

interface CompleteEventsProps {
  events: Event[];
  view: "list" | "grid";
}

export default function CompleteEvents({ events, view }: CompleteEventsProps) {
  const [showCompleteEvents, setShowCompleteEvents] = useState(true);
  const { theme } = useTheme();

  if (!events || events.length === 0) {
    return <p className="text-gray-600 dark:text-gray-300">No completed events.</p>;
  }

  return (
    <div>
      {/* Header with title and toggle */}
      <div className="flex items-center justify-between">
        <h2
          className={`text-lg font-semibold flex items-center gap-2 transition-colors duration-300 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          <span className="text-cyan-500">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check h-6 w-6 text-[var(--brand-pink)]" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
          </span>
          Complete Events
          <span className="text-sm bg-cyan-400 text-cyan-700 dark:bg-cyan-800 dark:text-cyan-100 rounded-md px-2 py-0.5">
            {events.length}
          </span>
        </h2>

        {/* Toggle button */}
        <button
          onClick={() => setShowCompleteEvents(!showCompleteEvents)}
          className="flex items-center justify-center p-1 rounded-md text-gray-500 dark:text-gray-200 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          {showCompleteEvents ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Event cards */}
      {showCompleteEvents && (
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

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

interface UpcomingEventsProps {
  events: Event[];
  view: "list" | "grid";
}

export default function UpcomingEvents({ events, view }: UpcomingEventsProps) {
  const [showUpcomingEvents, setShowUpcomingEvents] = useState(true);
  const { theme } = useTheme();

  if (!events || events.length === 0) {
    return <p className="text-gray-600 dark:text-gray-300">No upcoming events.</p>;
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-calendar h-6 w-6 text-[var(--brand-teal)]"
              aria-hidden="true"
            >
              <path d="M8 2v4"></path>
              <path d="M16 2v4"></path>
              <rect width="18" height="18" x="3" y="4" rx="2"></rect>
              <path d="M3 10h18"></path>
            </svg>
          </span>
          Upcoming Events
          <span className="text-sm bg-cyan-400 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-100 rounded-md px-2 py-0.5">
            {events.length}
          </span>
        </h2>

        {/* Toggle button */}
        <button
          onClick={() => setShowUpcomingEvents(!showUpcomingEvents)}
          className="flex items-center justify-center p-1 rounded-md text-gray-500 dark:text-gray-200 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          {showUpcomingEvents ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Event cards */}
      {showUpcomingEvents && (
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

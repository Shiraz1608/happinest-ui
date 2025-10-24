"use client";

import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import LiveEvents from "@/components/LiveEvents";
import CompleteEvents from "@/components/CompleteEvent";
import UpcomingEvents from "./UpcomingEvent";
import { useTheme } from "@/app/providers/ThemeProvider";
import EventAnimation from "@/components/EventAnimation";
import EmptyEventsCard from "@/components/CreateEvent"; // 👈 Import this

export default function DashboardMain() {
  const [view, setView] = useState<"list" | "grid">("grid");
  const { theme } = useTheme();

  const eventsData = {
    live: [
      // {
      //   id: 1,
      //   name: "TechVista Summit 2025",
      //   description: "Innovation. Collaboration. Growth.",
      //   date: "October 9–11, 2025",
      //   location: "Bangalore International Convention Centre",
      //   guests: "1200",
      //   tags: ["Conference", "Live"],
      //   image:
      //     "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
      // },
      // {
      //   id: 2,
      //   name: "AI Expo Global 2025",
      //   description: "Exploring Future Intelligence.",
      //   date: "November 15–17, 2025",
      //   location: "Dubai Expo Center",
      //   guests: "800",
      //   tags: ["Expo", "Live"],
      //   image:
      //     "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
      // },
    ],
    complete: [
      // {
      //   id: 3,
      //   name: "Startup Connect 2026",
      //   description: "Networking the next generation.",
      //   date: "January 20–21, 2026",
      //   location: "San Francisco Tech Hub",
      //   guests: "650",
      //   tags: ["Networking", "Complete"],
      //   image:
      //     "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
      // },
      // {
      //   id: 4,
      //   name: "FutureTech Forum 2026",
      //   description: "Innovating the digital frontier.",
      //   date: "February 10–12, 2026",
      //   location: "London Convention Hall",
      //   guests: "900",
      //   tags: ["Forum", "Complete"],
      //   image:
      //     "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
      // },
    ],
  };

  // ✅ Check if data exists and has content
  const hasEvents =
    eventsData &&
    ((eventsData.live && eventsData.live.length > 0) ||
      (eventsData.complete && eventsData.complete.length > 0));

  return (
    <main
      className={`relative min-h-screen px-6 pb-20 overflow-hidden transition-all duration-700 ${
        theme === "dark"
          ? "bg-[#0b0f1a] text-blue-100"
          : "bg-[radial-gradient(circle_at_top,_white_100%,_white_100%)] text-gray-900"
      }`}
    >
      <EventAnimation />

     

      <section className="max-w-6xl mx-auto mt-10 space-y-10">
        {hasEvents ? (
          <>
           <div className="mt-8 flex flex-col items-center space-y-4">
        <SearchBar view={view} setView={setView} />
      </div>
            <LiveEvents events={eventsData.live} view={view} />
            <UpcomingEvents events={eventsData.live} view={view} />
            <CompleteEvents events={eventsData.complete} view={view} />
          </>
        ) : (
          <EmptyEventsCard /> // 👈 Show this when no events exist
        )}
      </section>
    </main>
  );
}

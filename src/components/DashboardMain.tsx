"use client";

import React, { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import LiveEvents from "@/components/LiveEvents";
import CompleteEvents from "@/components/CompleteEvent";
import UpcomingEvents from "./UpcomingEvent";
import { useTheme } from "@/app/providers/ThemeProvider";
import EventAnimation from "@/components/EventAnimation";
import EmptyEventsCard from "@/components/CreateEvent";

export default function DashboardMain() {
  const [view, setView] = useState<"list" | "grid">("grid");
  const { theme } = useTheme();
  const [eventsData, setEventsData] = useState({ live: [], complete: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);

        const token = sessionStorage.getItem("token"); // ✅ token stored after login
const stored = sessionStorage.getItem("happinest_user_data");
let user: any = null; // ✅ use let (not const), initialize as null

if (stored) {
  user = JSON.parse(stored);
}

const userId = user?.userId || null; // ✅ safely get userId (9)

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/api/Event/GetUserEvents`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/plain",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: Number(userId),
            deviceTime: new Date().toISOString(),
            guestType: 1,
            pageNumber: 0,
            pageSize: 0,
          }),
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const result = await response.json();
        const stories = result?.data?.items?.[0]?.stories || [];

        // ✅ Transform API data into frontend-friendly format
        const mapped = {
          live: stories
            .filter((s: any) => new Date(s.endDate) >= new Date())
            .map((s: any) => ({
              id: s.storyId,
              name: s.title || "Untitled Event",
              description: s.storyTypeName || "No description available",
date: `${new Date(s.startDate).toLocaleString([], {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
})} - ${new Date(s.endDate).toLocaleString([], {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
})}`,

              location:
                s.address && (s.address.locationName || s.address.city)
                  ? `${s.address.locationName || ""}${s.address.locationName && s.address.city ? ", " : ""}${s.address.city || ""}`
                  : "Venue not specified",
              guests: s.guestCount?.toString() || "0",
              tags: [s.storyTypeName || "Event", "Live"],
              image: s.backgroundImageUrl || "",
            })),
          complete: stories
            .filter((s: any) => new Date(s.endDate) < new Date())
            .map((s: any) => ({
              id: s.storyId,
              name: s.title || "Untitled Event",
              description: s.storyTypeName || "No description available",
date: `${new Date(s.startDate).toLocaleString([], {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
})} - ${new Date(s.endDate).toLocaleString([], {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
})}`,
              location:
                s.address && (s.address.locationName || s.address.city)
                  ? `${s.address.locationName || ""}${s.address.locationName && s.address.city ? ", " : ""}${s.address.city || ""}`
                  : "Venue not specified",
              guests: s.guestCount?.toString() || "0",
              tags: [s.eventCode || "Event", "Complete", "Published"],
              image: s.backgroundImageUrl || "",
            })),
        };

        setEventsData(mapped);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);
const formatDateRange = (dateRange: string) => {
  const [start, end] = dateRange.split(" - ");
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return dateRange; // fallback to raw if invalid
  }

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return `${startDate.toLocaleString(undefined, options)} - ${endDate.toLocaleString(
    undefined,
    options
  )}`;
};

  const hasEvents =
    eventsData &&
    ((eventsData.live && eventsData.live.length > 0) ||
      (eventsData.complete && eventsData.complete.length > 0));
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
  return (
    <main
      className={`relative min-h-screen px-6 pb-20 overflow-hidden transition-all duration-700 ${
        theme === "dark"
          ? "bg-[#0b0f1a] text-blue-100"
          : "bg-[radial-gradient(circle_at_top,_white_100%,_white_100%)] text-gray-900"
      }`}
    >
      <EventAnimation />

      <section className="max-w-8xl mx-auto mt-10 space-y-10">
        {loading ? (
          <p className="text-center text-gray-500 animate-pulse">Loading events...</p>
        ) : hasEvents ? (
          <>
            <div className="mt-8 flex flex-col items-center space-y-4">
              <SearchBar view={view} setView={setView} />
            </div>
            <LiveEvents events={eventsData.live as any} view={view} />
            <CompleteEvents events={eventsData.complete as any} view={view} />
          </>
        ) : (
          <EmptyEventsCard />
        )}
      </section>
    </main>
  );
}

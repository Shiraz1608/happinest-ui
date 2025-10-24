"use client";

import React from "react";
import { useTheme } from "@/app/providers/ThemeProvider";
import { Calendar, MapPin, Users } from "lucide-react";

export function EventHeroCard() {
  const { theme } = useTheme();

  // Keep same header gradient in both themes
  const headerGradient =
    "linear-gradient(135deg, rgb(255, 245, 247), rgb(209, 72, 144))";

  // Base card adapts to theme
  const baseCardStyle =
    theme === "light"
      ? "bg-white border border-gray-300 text-gray-800"
      : "bg-black border border-white/10 text-white";

  // AI recommendation box color — same border in both themes
  const aiBoxStyle =
    theme === "light"
      ? "bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200"
      : "bg-gray-800 border border-cyan-200";

  return (
    <div
      className={`rounded-xl overflow-hidden shadow-sm transition-all duration-300 ${baseCardStyle}`}
    >
      {/* HEADER */}
      <div
        className="relative h-32 flex items-center justify-center"
        style={{ background: headerGradient }}
      >
        <div className="text-center text-white relative z-10 px-6">
          <span className="inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-medium bg-white/20 text-white border border-white/30 backdrop-blur-sm mb-2">
            Weddings
          </span>
          <h1 className="text-3xl font-bold mb-1">My Indian Wedding</h1>
          <p className="text-white/90">
            Traditional multi-day wedding celebration with ceremonies, sangeet,
            and reception
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* DETAILS SECTION */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Date & Time */}
          <div className="flex gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center flex-shrink-0">
              <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Date & Time
              </p>
              <p className="font-medium">Saturday, November 22, 2025</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Day 1, 6:00 PM
              </p>
            </div>
          </div>

          {/* Venue */}
          <div className="flex gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center flex-shrink-0">
              <MapPin className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Venue</p>
              <p className="font-medium">TBD</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">TBD</p>
            </div>
          </div>

          {/* Guests */}
          <div className="flex gap-3">
            <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-950 flex items-center justify-center flex-shrink-0">
              <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Expected Guests
              </p>
              <p className="font-medium text-xl">500</p>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        {/* AI Recommendation */}
        <div
          className={`flex gap-3 p-4 rounded-lg transition-all duration-300 ${aiBoxStyle}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5"
          >
            <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
            <path d="M20 2v4" />
            <path d="M22 4h-4" />
            <circle cx="4" cy="20" r="2" />
          </svg>
          <div>
            <p className="font-medium mb-1">AI Recommendation</p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Perfect template for your Indian wedding! I've configured all
              essential modules and settings based on typical requirements for
              events with 500 guests. You can customize any details in the
              preview stage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

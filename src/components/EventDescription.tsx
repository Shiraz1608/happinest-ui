"use client";
import React from "react";
import { useTheme } from "@/app/providers/ThemeProvider";

const EventDescription = () => {
  const { theme } = useTheme();

  // --- Base card styling depending on theme ---
  const baseCardStyle =
    theme === "light"
      ? "bg-white text-gray-800 border border-gray-100"
      : "bg-gray-800 text-white border border-gray-700";

  // --- Muted text color depending on theme ---
  const mutedText =
    theme === "light" ? "text-gray-500" : "text-gray-400";

  // --- Field (textarea) background and border based on theme ---
  const fieldStyle =
    theme === "light"
      ? "bg-gray-50 border-slate-300 focus:border-[var(--brand-teal)]"
      : "bg-[#151122] border-slate-700 focus:border-[var(--brand-teal)]";

  return (
    <div
      className={`rounded-3xl p-10 shadow-2xl backdrop-blur-md max-w-3xl mx-auto transition-all duration-500 ${baseCardStyle}`}
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex h-12 w-12 rounded-xl bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)] items-center justify-center mb-2">
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
              className="lucide lucide-sparkles h-6 w-6 text-white"
            >
              <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
              <path d="M20 2v4" />
              <path d="M22 4h-4" />
              <circle cx="4" cy="20" r="2" />
            </svg>
          </div>
          <h2 className="text-3xl bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)] bg-clip-text text-transparent">
            Tell us what you're planning
          </h2>
          <p className={`${mutedText}`}>
            Describe your event in your own words. The more details, the better!
          </p>
        </div>

        {/* Textarea */}
        <div className="space-y-4">
          <textarea
            className={`flex field-sizing-content w-full text-base outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--brand-teal)]/30 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm min-h-[150px] resize-none rounded-2xl p-4 transition-colors ${fieldStyle}`}
            placeholder="Phoenix X1 Smartphone Launch Event at JW Marriott Mumbai on April 12, 2025 for 250 VIP guests including press, influencers, and industry leaders..."
          />
          <div className="flex justify-between items-center">
            <p className={`text-xs ${mutedText}`}>
              Start typing your event description...
            </p>
          </div>
        </div>

        {/* Suggestions */}
        <div className="space-y-3">
          <p className={`text-sm ${mutedText}`}>Quick suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {[
              "Wedding",
              "Corporate Event",
              "Birthday Party",
              "Tech Conference",
              "Music Festival",
              "Product Launch",
              "Team Retreat",
              "Community Festival",
            ].map((suggestion) => (
              <span
                key={suggestion}
                className={`inline-flex items-center justify-center rounded-md border text-xs font-medium w-fit whitespace-nowrap shrink-0 cursor-pointer hover:scale-105 hover:shadow-md transition-all duration-200 px-4 py-2 ${
                  theme === "light"
                    ? "text-gray-800 border-slate-200"
                    : "text-gray-200 border-slate-700"
                } hover:bg-gradient-to-r hover:from-[var(--brand-pink)] hover:to-[var(--brand-teal)] hover:text-white`}
              >
                {suggestion}
              </span>
            ))}
          </div>
        </div>

        {/* Button */}
        <button
          disabled
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium rounded-md px-6 w-full h-14 bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-purple)] text-white border-0 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
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
            className="lucide lucide-sparkles mr-2 h-5 w-5"
          >
            <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
            <path d="M20 2v4" />
            <path d="M22 4h-4" />
            <circle cx="4" cy="20" r="2" />
          </svg>
          Generate Event Draft
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
            className="lucide lucide-arrow-right ml-2 h-5 w-5"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EventDescription;

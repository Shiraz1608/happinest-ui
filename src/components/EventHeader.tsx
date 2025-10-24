
"use client";

import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useTheme } from "@/app/providers/ThemeProvider";
import { Button } from "./ui/Button"; // <-- your Button with asChild support

const EventHeader = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`relative z-10 border-b w-full backdrop-blur-sm shadow-sm transition-colors duration-500 ${
        theme === "light"
          ? "border-gray-100 bg-white/80"
          : "border-gray-700 bg-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center px-8 py-6 gap-4">
        {/* Header Text */}
        <div>
          <h2
            className={`text-3xl font-semibold mb-1 ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            Events Dashboard
          </h2>
          <p
            className={`text-sm ${
              theme === "light" ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Manage all your events in one place
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          {/* CREATE NEW EVENT – Now navigates to /events/create */}
          <Button
            asChild
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-400 to-purple-500 
                       text-white px-6 py-2.5 rounded-md text-sm font-medium shadow-sm 
                       hover:opacity-90 hover:scale-105 active:scale-95 transition h-10"
          >
            <Link href="">
              <Plus className="w-5 h-5" aria-hidden="true" />
              Create New Event
            </Link>
          </Button>

          {/* Clear Events Button (still works as before) */}
          {/* <button
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium border transition h-8 ${
              theme === "light"
                ? "border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100"
                : "border-gray-600 bg-gray-900 text-gray-100 hover:bg-gray-700 hover:text-white"
            }`}
            title="Clear all events"
            onClick={() => {
              // Add your clear logic here
              console.log("Clear all events");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v0a1 1 0 001 1h4a1 1 0 001-1v0a1 1 0 00-1-1m-4 0h4"
              />
            </svg>
            Clear Events
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default EventHeader;
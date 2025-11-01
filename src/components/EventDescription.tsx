"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "@/app/providers/ThemeProvider";
import { useRouter } from "next/navigation";
import { LoadingAnimation } from "./LoadingAnimation";
import { GenerateEvent } from "@/app/hook/GenerateEvent";

const EventDescription = ({ setGlobalLoading }: { setGlobalLoading: (value: boolean) => void }) => {
  const { theme } = useTheme();
  const router = useRouter();

const [description, setDescription] = useState("");

useEffect(() => {
  // ✅ Only runs in browser
  if (typeof window !== "undefined") {
    const savedDescription = sessionStorage.getItem("description");
    if (savedDescription) {
      setDescription(savedDescription);
    }
  }
}, []);  const [loading, setLoading] = useState(false);
    const [Animationloading, setAnimationloading] = useState(false);

  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  // ✅ Fetch all suggestions on component mount
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/api/Event/suggestions`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch suggestions");

        const data = await response.json();
        setSuggestions(data);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
        setError("Unable to load event suggestions.");
      }
    };

    fetchSuggestions();
  }, []);

  // ✅ Fetch event description by ID (only when user clicks)
  const fetchDescriptionById = async (eventId: number) => {
    try {
      setLoading(true);
      setError("");

      const token = sessionStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/api/Event/${eventId}/description`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} - Failed to load`);
      }

      const data = await response.json();

      // ✅ Handle both object and string responses
      const desc =
        typeof data === "string"
          ? data
          : data.defaultDescription || data.description || "";

      setDescription(desc);
    } catch (err) {
      console.error("Error fetching event description:", err);
      setError("Failed to fetch event description.");
    } finally {
    }
  };

 

  // --- THEME STYLES ---
  const baseCardStyle =
    theme === "light"
      ? "bg-white text-gray-800 border border-gray-100"
      : "bg-[#1a1a24]/95 backdrop-blur-md p-10 text-white border border-gray-800";

  const mutedText = theme === "light" ? "text-gray-500" : "text-gray-400";

  const fieldStyle =
    theme === "light"
      ? "bg-gray-50 border-slate-300 focus:border-[var(--brand-teal)]"
      : "bg-[#151122] border-slate-700 focus:border-[var(--brand-teal)]";

  return (
   <>
     {/* Global Loading Overlay */}
    {Animationloading && (
      <div
        className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center 
                   bg-black bg-opacity-50 backdrop-blur-sm z-[9999]"
        role="alert"
        aria-busy="true"
      >
        <LoadingAnimation />
      </div>
    )}

    {/* Page Content */}
    <div className="relative">
      {/* your main page content here */}
    </div>
  

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

        {/* Description Textarea */}
        <div className="space-y-4">
          {/* {loading && (
            <p className="text-center text-sm text-gray-400">
              Loading description...
            </p>
          )} */}
          {error && <p className="text-center text-red-500">{error}</p>}

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`flex field-sizing-content w-full text-base outline-none focus-visible:ring-[3px] focus-visible:ring-[#9ca3af]/30 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm min-h-[150px] resize-none rounded-2xl p-4 transition-colors
 ${fieldStyle}`}
            placeholder="Phoenix X1 Smartphone Launch Event..."
          />
          <div className="flex justify-between items-center">
  <p className={`text-xs ${mutedText}`}>
    {description.length > 0
      ? `${description.length} characters`
      : "Start typing your event description..."}
  </p>
</div>

        </div>

        {/* Suggestions (Dynamic from DB) */}
        <div className="space-y-3">
          <p className={`text-sm ${mutedText}`}>Quick suggestions:</p>

          <div className="flex flex-wrap gap-2">
            {suggestions.length === 0 ? (
              <p className="text-xs text-gray-400">No suggestions available.</p>
            ) : (
              suggestions.map((suggestion) => (
                <span
                  key={suggestion.id}
                  onClick={() => fetchDescriptionById(suggestion.id)}
                  className={`inline-flex items-center justify-center rounded-md border text-xs font-medium w-fit whitespace-nowrap shrink-0 cursor-pointer hover:scale-105 hover:shadow-md transition-all duration-200 px-4 py-2 ${
                    theme === "light"
                      ? "text-gray-800 border-slate-200"
                      : "text-gray-200 border-slate-700"
                  } hover:bg-gradient-to-r hover:from-[var(--brand-pink)] hover:to-[var(--brand-teal)] hover:text-white`}
                >
                  {suggestion.suggestionName}
                </span>
              ))
            )}
          </div>
        </div>

        {/* Generate Event Button */}
        <button
 onClick={() =>
    GenerateEvent(description, router, setGlobalLoading, setError, setLoading)
  }          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium rounded-md px-6 w-full h-14 bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-purple)] text-white border-0 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
    </>
  );
};

export default EventDescription;

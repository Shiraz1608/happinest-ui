"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "@/app/providers/ThemeProvider";
import { useRouter } from "next/navigation";

const EventDescription = () => {
  const { theme } = useTheme();
  const router = useRouter();

  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
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
      setLoading(false);
    }
  };

 interface Venue {
  name: string;
  city: string;
  country: string;
}

interface ActivityItem {
  startTime: string;
  durationMinutes: number;
  title: string;
}

interface ActivityDay {
  day: number;
  date: string;
  items: ActivityItem[];
}

interface ActivityData {
  totalActivities: number;
  totalDays: number;
  days: ActivityDay[];
}

interface BudgetCategory {
  name: string;
  amount: number;
  percent: number;
}

interface BudgetData {
  currency: string;
  total: number;
  categories: BudgetCategory[];
}

interface FieldMeta {
  [key: string]: {
    confidence: number;
    reason: string;
  };
}

interface AIEvent {
  eventType: string;
  eventTheme: string;
  title: string;
  tagline: string;
  description: string;
  aiRecommendation: string;
  venue: Venue;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  expectedGuests: number;
  fieldMeta: FieldMeta;
  activities: ActivityData;
  budget: BudgetData;
  venueSuggestions: any;
}

interface Modules {
  venue: boolean;
  schedule: boolean;
  budget: boolean;
  vendors: boolean;
  logistics: boolean;
  analytics: boolean;
  approval: boolean;
  guest: boolean;
  gallery: boolean;
  happiVids: boolean;
  logisticsNote?: string | null;
}

interface Settings {
  visibility: string;
  joinMode: string;
  contribution: string;
  moderation: boolean;
}

interface Flags {
  isMultiDay: boolean;
  guestBand: string;
}

interface ApiResponse {
  success: boolean;
  data: {
    ai: AIEvent;
    flags: Flags;
    modules: Modules;
    settings: Settings;
    needsReview: boolean;
    activities: ActivityData;
    budget: BudgetData;
  };
  error?: string | null;
}

const GenerateEvent = async () => {
  try {
    setLoading(true);
    setError("");

    const token = sessionStorage.getItem("token");
    if (!token) {
      setError("User not authenticated.");
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/api/Event/CreateAIEvent`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          text:
            description ||
            "We’re planning a 3-day Diwali Mela in Delhi for around 500 guests",
        }),
      }
    );

    if (!response.ok)
      throw new Error(`HTTP ${response.status} - Failed to create event`);

    const data: ApiResponse = await response.json();
    console.log("🎯 AI Generated Event Response:", data);

    if (data?.success && data?.data?.ai) {
      const ai = data.data.ai;

      // 🧠 Normalize main event info
      const normalizedEventData = {
        title: ai.title || "Untitled Event",
        tagline: ai.tagline || "Your event tagline goes here",
        eventType:
          ai.eventType?.charAt(0).toUpperCase() + ai.eventType?.slice(1) ||
          "Event",
        eventTheme: ai.eventTheme || "General",
        venue: {
          name: ai.venue?.name || "Venue TBD",
          city: ai.venue?.city || "",
          country: ai.venue?.country || "",
        },
        expectedGuests: ai.expectedGuests || 0,
        startDate: ai.startDate || "",
        endDate: ai.endDate || "",
        startTime: ai.startTime || "",
        endTime: ai.endTime || "",
        description: ai.description || "",
        aiRecommendation: ai.aiRecommendation || "",
      };

      // 🧾 Normalize Activities
      const normalizedActivities =
        ai.activities?.days?.map((day: ActivityDay) => ({
          day: day.day,
          date: day.date,
          items: day.items.map((item: ActivityItem) => ({
            startTime: item.startTime,
            durationMinutes: item.durationMinutes,
            title: item.title,
          })),
        })) || [];

      // 💰 Normalize Budget
      const normalizedBudget = {
        currency: ai.budget?.currency || "INR",
        total: ai.budget?.total || 0,
        categories:
          ai.budget?.categories?.map((cat: BudgetCategory) => ({
            name: cat.name,
            amount: cat.amount,
            percent: cat.percent,
          })) || [],
      };

      // 🧩 Normalize Modules
      const modules = data.data.modules || {};
      const normalizedEventModules = {
        venue: !!modules.venue,
        schedule: !!modules.schedule,
        budget: !!modules.budget,
        vendors: !!modules.vendors,
        logistics: !!modules.logistics,
        analytics: !!modules.analytics,
        approval: !!modules.approval,
        guest: !!modules.guest,
        gallery: !!modules.gallery,
        happiVids: !!modules.happiVids,
        logisticsNote: modules.logisticsNote || "",
        activeModuleCount: Object.keys(modules).filter(
          (key) => (modules as any)[key] === true
        ).length,
      };

      // ⚙️ Normalize Settings
      const settings = data.data.settings || {};
      const normalizedEventSettings = {
        visibility: settings.visibility || "Private",
        joinMode: settings.joinMode || "InviteOnly",
        contribution: settings.contribution || "Private",
        moderation: !!settings.moderation,
      };

      // 🚩 Normalize Flags
      const flags = data.data.flags || {};
      const normalizedEventFlags = {
        isMultiDay: !!flags.isMultiDay,
        guestBand: flags.guestBand || "Standard",
      };

      // 🧭 Normalize Field Meta
      const fieldMeta = ai.fieldMeta
        ? Object.entries(ai.fieldMeta).map(([key, meta]) => ({
            field: key,
            confidence: meta.confidence,
            reason: meta.reason,
          }))
        : [];

      // 🧐 Review Status
      const needsReview = !!data.data.needsReview;

      // 🗂️ Store in sessionStorage
      if (typeof window !== "undefined" && window.sessionStorage) {
        sessionStorage.setItem(
          "aiEventData",
          JSON.stringify(normalizedEventData)
        );
        sessionStorage.setItem(
          "aiEventModules",
          JSON.stringify(normalizedEventModules)
        );
        sessionStorage.setItem(
          "aiEventSettings",
          JSON.stringify(normalizedEventSettings)
        );
        sessionStorage.setItem(
          "aiEventFlags",
          JSON.stringify(normalizedEventFlags)
        );
        sessionStorage.setItem(
          "aiEventActivities",
          JSON.stringify(normalizedActivities)
        );
        sessionStorage.setItem(
          "aiEventBudget",
          JSON.stringify(normalizedBudget)
        );
        sessionStorage.setItem(
          "aiEventFieldMeta",
          JSON.stringify(fieldMeta)
        );
        sessionStorage.setItem(
          "aiEventNeedsReview",
          JSON.stringify(needsReview)
        );

        console.log("✅ Stored all normalized data in sessionStorage:", {
          normalizedEventData,
          normalizedEventModules,
          normalizedEventSettings,
          normalizedEventFlags,
          normalizedActivities,
          normalizedBudget,
          fieldMeta,
          needsReview,
        });
      }

      // ✅ Redirect to event page
      router.push("/generateevent");
    }
  } catch (err) {
    console.error("Error creating AI event:", err);
    setError("Failed to generate AI event. Please try again.");
  } finally {
    setLoading(false);
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
          onClick={GenerateEvent}
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

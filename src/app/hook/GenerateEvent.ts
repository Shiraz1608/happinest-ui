"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

/* -------------------------- TYPE DEFINITIONS -------------------------- */
export interface Venue {
  name: string;
  city: string;
  country: string;
}

export interface ActivityItem {
  startTime: string;
  durationMinutes: number;
  title: string;
}

export interface ActivityDay {
  day: number;
  date: string;
  items: ActivityItem[];
}

export interface ActivityData {
  totalActivities: number;
  totalDays: number;
  days: ActivityDay[];
}

export interface BudgetCategory {
  name: string;
  amount: number;
  percent: number;
}

export interface BudgetData {
  currency: string;
  total: number;
  categories: BudgetCategory[];
}

export interface FieldMeta {
  [key: string]: {
    confidence: number;
    reason: string;
  };
}

export interface AIEvent {
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

export interface Modules {
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

export interface Settings {
  visibility: string;
  joinMode: string;
  contribution: string;
  moderation: boolean;
}

export interface Flags {
  isMultiDay: boolean;
  guestBand: string;
}

export interface ApiResponse {
  success: boolean;
  data: {
    ai: AIEvent;
    flags: Flags;
    modules: Modules;
    settings: Settings;
    needsReview: boolean;
    activities: ActivityData;
    budget: BudgetData;
    venues?: any[];
  };
  error?: string | null;
}

/* -------------------------- MAIN FUNCTION -------------------------- */
export const GenerateEvent = async (
  description: string,
  router: AppRouterInstance,
  setGlobalLoading: (value: boolean) => void,
  setError: (message: string) => void,
  setLoading: (value: boolean) => void
) => {
  try {
    setError("");
    const token = sessionStorage.getItem("token");
    if (!token) {
      setError("User not authenticated.");
      return;
    }

    // 🔹 Save params for regenerate
    const savedParams = {
      description,
      timestamp: new Date().toISOString(),
    };
    sessionStorage.setItem("lastGenerateEventParams", JSON.stringify(savedParams));

    setGlobalLoading(true);
    setLoading(true);
    sessionStorage.setItem("description", description);

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

      // ✅ Normalize data
      const normalizedEventData = {
        title: ai.title || "Untitled Event",
        tagline: ai.tagline || "Your event tagline goes here",
        eventType:
          ai.eventType?.charAt(0).toUpperCase() + ai.eventType?.slice(1) || "Event",
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

      const modules = data.data.modules || ({} as any);
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

      const settings = data.data.settings || ({} as any);
      const normalizedEventSettings = {
        visibility: settings.visibility || "Private",
        joinMode: settings.joinMode || "InviteOnly",
        contribution: settings.contribution || "Private",
        moderation: !!settings.moderation,
      };

      const flags = data.data.flags || ({} as any);
      const normalizedEventFlags = {
        isMultiDay: !!flags.isMultiDay,
        guestBand: flags.guestBand || "Standard",
      };

      const fieldMeta = ai.fieldMeta
        ? Object.entries(ai.fieldMeta).map(([key, meta]) => ({
            field: key,
            confidence: (meta as any).confidence,
            reason: (meta as any).reason,
          }))
        : [];

      const rawVenues: any[] = data.data.venues || ai.venueSuggestions || [];
      const normalizedVenues = Array.isArray(rawVenues)
        ? rawVenues.map((v: any) => ({
            name: v.name || "",
            capacity: v.capacity
              ? v.capacity
              : v.capacityMin && v.capacityMax
              ? `${v.capacityMin}-${v.capacityMax}`
              : v.capacityMin
              ? `${v.capacityMin}+`
              : v.capacityMax
              ? `${v.capacityMax}`
              : "",
            style: v.style || "",
          }))
        : [];

      const needsReview = !!data.data.needsReview;

      // ✅ Save normalized data to sessionStorage
      if (typeof window !== "undefined" && window.sessionStorage) {
        sessionStorage.setItem("aiEventData", JSON.stringify(normalizedEventData));
        sessionStorage.setItem("aiEventModules", JSON.stringify(normalizedEventModules));
        sessionStorage.setItem("aiEventSettings", JSON.stringify(normalizedEventSettings));
        sessionStorage.setItem("aiEventFlags", JSON.stringify(normalizedEventFlags));
        sessionStorage.setItem("aiEventActivities", JSON.stringify(normalizedActivities));
        sessionStorage.setItem("aiEventBudget", JSON.stringify(normalizedBudget));
        sessionStorage.setItem("aiEventFieldMeta", JSON.stringify(fieldMeta));
        sessionStorage.setItem("aiEventNeedsReview", JSON.stringify(needsReview));
        sessionStorage.setItem("aiEventVenues", JSON.stringify(normalizedVenues));
      }

      router.push("/generateevent");
    }
  } catch (err) {
    console.error("Error creating AI event:", err);
    setError("Failed to generate AI event. Please try again.");
  } finally {
  }
};

/* -------------------------- REGENERATE FUNCTION -------------------------- */
export const RegenerateEvent = async (
  router: AppRouterInstance,
  setGlobalLoading: (value: boolean) => void,
  setError: (message: string) => void,
  setLoading: (value: boolean) => void
) => {
  const saved = sessionStorage.getItem("lastGenerateEventParams");
  if (!saved) {
    setError("No previous event parameters found for regeneration.");
    return;
  }

  const { description } = JSON.parse(saved);
  console.log("♻️ Regenerating event with:", description);
  return await GenerateEvent(description, router, setGlobalLoading, setError, setLoading);
};

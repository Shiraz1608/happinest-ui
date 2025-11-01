"use client";

import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { useTheme } from '@/app/providers/ThemeProvider';
import { useRouter } from 'next/navigation';
import { GenerateEvent,RegenerateEvent } from "@/app/hook/GenerateEvent";
import React, { useState, useEffect } from "react";

export default function StickyNav({ setGlobalLoading }: { setGlobalLoading: (value: boolean) => void }) {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [Animationloading, setAnimationloading] = useState(false);

  const [error, setError] = useState("");
  const handleContinue = async () => {
    try {
      const readJSON = (key: string, fallback: any) => {
        try {
          const raw = sessionStorage.getItem(key);
          return raw ? JSON.parse(raw) : fallback;
        } catch {
          return fallback;
        }
      };

      const aiEventData = readJSON("aiEventData", {});
      const aiEventModules = readJSON("aiEventModules", {});
      const aiEventSettings = readJSON("aiEventSettings", {});
      const aiEventFlags = readJSON("aiEventFlags", {});
      const aiEventActivities = readJSON("aiEventActivities", { totalActivities: 0, totalDays: 0, days: [] });
      const aiEventBudget = readJSON("aiEventBudget", { currency: "", total: 0, categories: [] });
      const aiEventVenues = readJSON("aiEventVenues", []);
      const aiEventFieldMeta = readJSON("aiEventFieldMeta", {});
      const aiNeedsReview = readJSON("aiEventNeedsReview", false);

      // Normalize fieldMeta to a dictionary<string, {confidence:number, reason:string}>
      const normalizeFieldMeta = (src: any): Record<string, { confidence: number; reason: string }> => {
        if (!src) return {};
        if (Array.isArray(src)) {
          return src.reduce((acc: any, item: any, idx: number) => {
            const key = item?.key || item?.name || item?.field || `field${idx + 1}`;
            const confidence = typeof item?.confidence === 'number' ? item.confidence : 0;
            const reason = typeof item?.reason === 'string' ? item.reason : '';
            acc[key] = { confidence, reason };
            return acc;
          }, {} as Record<string, { confidence: number; reason: string }>);
        }
        if (typeof src === 'object') {
          // assume already a dictionary; coerce values
          const out: Record<string, { confidence: number; reason: string }> = {};
          for (const k of Object.keys(src)) {
            const v: any = src[k] ?? {};
            out[k] = { confidence: typeof v.confidence === 'number' ? v.confidence : 0, reason: typeof v.reason === 'string' ? v.reason : '' };
          }
          return out;
        }
        return {};
      };

      const normalizeActivities = (src: any) => {
        if (!src) return { totalActivities: 0, totalDays: 0, days: [] };
        if (Array.isArray(src)) {
          const items = src.map((it: any) => ({
            startTime: it?.startTime || "",
            durationMinutes: typeof it?.durationMinutes === 'number' ? it.durationMinutes : 0,
            title: it?.title || "",
          }));
          return { totalActivities: items.length, totalDays: items.length ? 1 : 0, days: [{ day: 1, date: "", items }] };
        }
        if (typeof src === 'object' && Array.isArray(src.days)) {
          const totalActivities = typeof src.totalActivities === 'number' ? src.totalActivities : (src.days?.reduce((sum: number, d: any) => sum + (d?.items?.length || 0), 0) || 0);
          const totalDays = typeof src.totalDays === 'number' ? src.totalDays : (src.days?.length || 0);
          return { totalActivities, totalDays, days: src.days };
        }
        return { totalActivities: 0, totalDays: 0, days: [] };
      };

      const payload = {
        event: {
          ai: {
            eventType: aiEventData.eventType || "",
            eventTheme: aiEventData.eventTheme || aiEventData.theme || "",
            title: aiEventData.title || "",
            tagline: aiEventData.tagline || "",
            description: aiEventData.description || "",
            aiRecommendation: aiEventData.aiRecommendation || "",
            venue: {
              name: aiEventData.venue?.name || "",
              city: aiEventData.venue?.city || "",
              country: aiEventData.venue?.country || "",
            },
            startDate: aiEventData.startDate || "",
            endDate: aiEventData.endDate || "",
            startTime: aiEventData.startTime || "",
            endTime: aiEventData.endTime || "",
            expectedGuests: aiEventData.expectedGuests || 0,
            fieldMeta: normalizeFieldMeta(aiEventFieldMeta),
            activities: normalizeActivities(aiEventActivities),
            budget: aiEventBudget,
            venueSuggestions: aiEventData.venueSuggestions || [],
          },
          flags: aiEventFlags || {},
          modules: aiEventModules || {},
          settings: aiEventSettings || {},
          needsReview: !!aiNeedsReview,
          activities: normalizeActivities(aiEventActivities),
          budget: aiEventBudget,
          venues: aiEventVenues,
        },
      };

      const token = sessionStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/api/Event/SaveAIEvent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      let data: any = {};
      try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text }; }

      if (!res.ok) {
        console.error("SaveAIEvent failed", res.status, data);
        alert((data && (data.validationMessage || data.message)) || `Failed to save AI event. (${res.status})`);
        return;
      }
 if (res.ok) {
    alert("Event Saved Successfully!");
  } else {
    alert((data && (data.validationMessage || data.message)) || `(${res.status})`);
  }
      //router.push("/eventconfiguration");
    } catch (err) {
      console.error("Error while saving AI event", err);
      alert("Something went wrong while saving the event.");
    }
  };

  const handleEditPrompt = () => {
    router.back(); // ✅ Go back to the previous page in browser history
  };
  

  return (
    <div
      className={`sticky top-0 z-10 border-b backdrop-blur-md  ${
        theme === 'dark' ? 'bg-gray-900/80 border-neutral-700' : 'bg-white/80 border-gray-300'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <button       onClick={handleEditPrompt}

            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 gap-2 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Edit Prompt</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)] flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            <div className="hidden sm:block">
              <h2 className="font-semibold">Configure Your Event</h2>
              <p className="text-xs text-gray-500">Review and customize settings</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button   onClick={() => RegenerateEvent(router, setGlobalLoading, setError, setAnimationloading)}

              className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 border text-foreground hover:bg-gray-200 dark:hover:bg-gray-800 dark:bg-neutral-800/30 h-9 px-4 py-2 gap-2
                ${theme==="light"?
"border-gray-300":"border-neutral-500 bg-input/30  hover:bg-input/50 hover:bg-neutral-700 bg-neutral-800 border-gray-300"
              }`}
              
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Regenerate</span>
            </button>
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 hover:opacity-90 shadow-sm h-9 px-4 py-2 bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)] text-white border-0 gap-2"
              onClick={handleContinue}
            >
              <span className="hidden sm:inline">Get Started</span>
              <span className="sm:hidden">Continue</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";
import { Sparkles } from "lucide-react";
import { useTheme } from "@/app/providers/ThemeProvider";

interface AIRecommendationProps {
  data: any;
}

export default function RecommendationCard({ data }: AIRecommendationProps) {
  const { theme } = useTheme();

  return (
    <div
      className={`text-card-foreground flex flex-col gap-6 rounded-xl border border-[var(--brand-teal)] 
      ${
        theme === "light"
          ? "bg-gradient-to-br from-cyan-50 to-blue-50"
          : "bg-gradient-to-br from-cyan-950/20 to-blue-950/20"
      }`}
    >
      <div data-slot="card-content" className="[&:last-child]:pb-6 p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[var(--brand-pink)] to-[var(--brand-teal)] flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-5 w-5 text-white" aria-hidden="true" />
          </div>

          <div className="flex-1">
            <h3 className="font-medium text-2xl mb-1">
              Happinest AI Reasoning
            </h3>
            <p className="text-sm tracking-wide opacity-60">
              AI-generated insights for your event plan
            </p>
          </div>
        </div>

        {/* Event Summary */}
        <div className="space-y-4">
          <div
            className={`rounded-lg p-4 ${
              theme === "light" ? "bg-gray-100" : "bg-neutral-900"
            }`}
          >
            <p className="text-xs mb-1.5 uppercase tracking-wide opacity-60">
            Why these suggestions?

            </p>
           
            <p className="text-sm opacity-80">
              {data?.tagline || "Your event tagline goes here"}
            </p>

           
          </div>

          {/* Event Description */}
         

          {/* AI Recommendation */}
          <div
            className={`rounded-lg p-4 ${
              theme === "light" ? "bg-gray-100" : ""
            }`}
          >
            <p className="text-xs mb-2 uppercase tracking-wide opacity-60">
              AI Recommendation
            </p>
            <p className="text-sm leading-relaxed">
              {data?.aiRecommendation ||
                "No AI recommendations available for this event."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

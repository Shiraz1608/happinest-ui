"use client";

import { useTheme } from "@/app/providers/ThemeProvider";
import { Check, Sparkles, ArrowRight } from "lucide-react";

export function ConfigurationCompleteCard() {
  const { theme } = useTheme();

  const buttonStyle =
    theme === "light"
      ? "border-gray-300 bg-white hover:bg-gray-50 text-gray-800"
      : "border-gray-700 bg-neutral-800 hover:bg-neutral-700 text-white";

  // ✅ Same dark theme bg as ReadyToLaunchCard (no border color change)
  const cardBgStyle =
    theme === "light"
      ? "bg-gradient-to-r from-pink-50 via-purple-50 to-cyan-50 border border-pink-500 text-gray-800"
      : "bg-gradient-to-br from-purple-950/20 to-pink-950/20 border border-pink-500 text-white";

  return (
    <div
      className={`rounded-xl p-6 shadow-sm transition-all duration-300 ${cardBgStyle}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-pink-500 to-teal-500 flex items-center justify-center">
            <Check className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="font-semibold text-lg">Configuration Complete</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ready to enter workspace
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            className={`inline-flex items-center justify-center h-9 px-4 py-2 border rounded-md transition-all gap-2 ${buttonStyle}`}
          >
            <Sparkles className="h-4 w-4" />
            Regenerate with AI
          </button>

          <button className="inline-flex items-center justify-center h-10 px-6 rounded-md shadow-sm bg-gradient-to-r from-pink-500 to-teal-500 text-white hover:opacity-90 transition-all gap-2">
            Continue to Workspace
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

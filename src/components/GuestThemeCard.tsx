"use client";

import React from "react";
import { Palette, Check, Eye } from "lucide-react";
import { useTheme } from "@/app/providers/ThemeProvider";

export function GuestThemeCard() {
  const { theme } = useTheme();

  // ✅ Consistent card style for both themes
  const baseCardStyle =
    theme === "light"
      ? "bg-white border border-gray-300 text-gray-800"
      : "bg-black border border-white/10 text-white";

  // ✅ Preview button style
  const buttonStyle =
    theme === "light"
      ? "border-gray-300 bg-white hover:bg-gray-50"
      : "border-gray-700 bg-neutral-800 hover:bg-neutral-700";

  // ✅ Theme Option (Modern Professional) — refined light + dark gradient + border
 const modernButtonStyle =
  theme === "light"
    ? "bg-gradient-to-br from-pink-100 to-pink-50 border border-pink-200 hover:border-pink-300 hover:shadow-md"
    : "bg-gradient-to-br from-purple-950/20 to-pink-950/20 border border-pink-500/30 hover:border-pink-500/40";


  return (
    <div
      className={`rounded-xl p-6 space-y-6 shadow-sm transition-all duration-300 ${baseCardStyle}`}
    >
      {/* Header */}
      <div>
        <h4 className="flex items-center gap-2 text-lg font-semibold mb-2">
          <Palette className="h-5 w-5 text-teal-500" />
          Guest Site Theme
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Choose how your event page will look to guests
        </p>
      </div>

      {/* ✅ Modern Professional Option */}
      <button
        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left ${modernButtonStyle}`}
      >
        <div className="h-10 w-10 rounded-lg bg-white dark:bg-black flex items-center justify-center text-xl flex-shrink-0">
          🎯
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">Modern Professional</span>
            <span className="px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-pink-500 to-teal-500 text-white rounded">
              Recommended
            </span>
          </div>
        </div>
        <Check className="h-5 w-5 text-pink-500 flex-shrink-0" />
      </button>

      {/* ✅ Preview Button */}
      <button
        className={`w-full h-9 px-4 py-2 border rounded-md transition-all flex items-center justify-center gap-2 ${buttonStyle}`}
      >
        <Eye className="h-4 w-4" />
        <span className="text-sm">Preview will be available in workspace</span>
      </button>
    </div>
  );
}

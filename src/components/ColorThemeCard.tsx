"use client";

import React from "react";
import { useTheme } from "@/app/providers/ThemeProvider";

export function ColorThemeCard() {
  const { theme } = useTheme();

  const colors = ['#FFF5F7', '#FFE4E9', '#D14890', '#FF69B4'];

  // ✅ Same base background rule as other cards
  const baseCardStyle =
    theme === "light"
      ? "bg-white border border-gray-300 text-gray-800"
      : "bg-black border border-white/10 text-white";

  return (
    <div className={`rounded-xl p-6 space-y-4 shadow-sm transition-all duration-300 ${baseCardStyle}`}>
      <div>
        <h4 className="text-lg font-semibold">Color Theme</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">Dreamy Romance</p>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Soft pinks and romantic pastels perfect for traditional weddings
      </p>

      <div className="flex gap-2">
        {colors.map((color) => (
          <div
            key={color}
            className="h-12 flex-1 rounded-lg border border-gray-300 dark:border-white/10 shadow-sm cursor-pointer hover:scale-105 transition-transform"
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>

      <p className="text-xs italic text-gray-500 dark:text-gray-400">
        Colors can be customized in the workspace
      </p>
    </div>
  );
}

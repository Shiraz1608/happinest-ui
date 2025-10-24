"use client";

import React from "react";
import { useTheme } from "@/app/providers/ThemeProvider";

interface ReadyToLaunchCardProps {
  activeModulesCount: number;
}

export function ReadyToLaunchCard({ activeModulesCount }: ReadyToLaunchCardProps) {
  const { theme } = useTheme();

  // ✅ Card background styles
  const baseCardStyle =
    theme === "light"
      ? "bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 text-gray-800"
      : "bg-gradient-to-br from-purple-950/20 to-pink-950/20 border border-purple-800 text-white";

  return (
    <div
      className={`rounded-xl p-6 shadow-sm transition-all duration-300 ${baseCardStyle}`}
    >
      <h4 className="text-base font-semibold mb-4">Ready to Launch</h4>
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400">Active Modules</span>
          <span className="font-medium">{activeModulesCount}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400">Guest Site Theme</span>
          <span className="font-medium capitalize">default</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400">Visibility</span>
          <span className="font-medium">public</span>
        </div>
      </div>
    </div>
  );
}

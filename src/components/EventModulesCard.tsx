"use client";

import React from "react";
import { useTheme } from "@/app/providers/ThemeProvider";
import { Settings, Check } from "lucide-react";
import { Switch } from "./switch";

interface EventModulesCardProps {
  activeModules: string[];
  onToggleModule: (module: string) => void;
}

export function EventModulesCard({ activeModules, onToggleModule }: EventModulesCardProps) {
  const { theme } = useTheme();

  // ✅ Base card background — black in dark mode
  const baseCardStyle =
    theme === "light"
      ? "bg-white border border-gray-300 text-gray-800"
      : "bg-black border border-white/10 text-white";

  // Active module style
  const activeBoxStyle =
    theme === "light"
      ? "bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200"
      : "bg-gray-900 border border-cyan-200"; // ✅ darker background for active module in dark mode

  // Inactive module style
  const inactiveBoxStyle =
    theme === "light"
      ? "bg-gray-50/50 border border-gray-200"
      : "bg-[#1a1a1a] border border-gray-700"; // ✅ slightly lighter than pure black for contrast

  const modules = [
    { id: "venue", label: "venue", description: "Essential for Indian wedding" },
    { id: "guests", label: "guests", description: "Essential for Indian wedding" },
    { id: "vendors", label: "vendors", description: "Essential for Indian wedding" },
    { id: "schedule", label: "schedule", description: "Essential for Indian wedding" },
    { id: "content", label: "content", description: "Essential for Indian wedding" },
    { id: "video", label: "video", description: "Essential for Indian wedding" },
    { id: "microsite", label: "microsite", description: "Essential for Indian wedding" },
  ];

  return (
    <div
      className={`rounded-xl p-6 space-y-6 shadow-sm transition-all duration-300 ${baseCardStyle}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="flex items-center gap-2 text-lg font-semibold">
            <Settings className="h-5 w-5 text-pink-500" />
            Event Modules
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Choose features to enable for your event
          </p>
        </div>
        <span className="inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-pink-500 to-teal-500 text-white">
          {activeModules.length} Active
        </span>
      </div>

      {/* Module List */}
      <div className="space-y-3">
        {modules.map((module) => {
          const isActive = activeModules.includes(module.id);
          return (
            <div
              key={module.id}
              className={`flex items-start gap-3 p-3 rounded-lg transition-all hover:shadow-sm ${
                isActive ? activeBoxStyle : inactiveBoxStyle
              }`}
            >
              <Switch
                checked={isActive}
                onCheckedChange={() => onToggleModule(module.id)}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium capitalize">{module.label}</span>
                  {isActive && <Check className="h-4 w-4 text-teal-500" />}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {module.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

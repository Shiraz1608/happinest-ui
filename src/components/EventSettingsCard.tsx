"use client";

import React, { useState } from "react";
import { useTheme } from "@/app/providers/ThemeProvider";
import { Settings } from "lucide-react";
import { Select } from "@/components/select";

export function EventSettingsCard() {
  const { theme } = useTheme();

  const [visibility, setVisibility] = useState("");
  const [joinMode, setJoinMode] = useState("");
  const [contribution, setContribution] = useState("Guests only");
  const [moderation, setModeration] = useState("Yes");

  // ✅ Base card background — now black in dark mode
  const baseCardStyle =
    theme === "light"
      ? "bg-white border border-gray-300 text-gray-800"
      : "bg-black border border-white/10 text-white";

  // Selection input background
  const inputBgStyle =
    theme === "light"
      ? "bg-gray-50 text-gray-800"
      : "bg-[#202027] text-white";

  // Dropdown options background
  const dropdownStyle =
    theme === "light"
      ? "bg-white text-gray-800"
      : "bg-black text-white"; // ✅ stays black at dark mode

  return (
    <div
      className={`rounded-xl p-6 space-y-6 shadow-sm transition-all duration-300 ${baseCardStyle}`}
    >
      <div>
        <h4 className="flex items-center gap-2 text-lg font-semibold">
          <Settings className="h-5 w-5 text-purple-500" />
          Event Settings
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Configure access and privacy settings
        </p>
      </div>

      <div className="space-y-6">
        {/* Event Visibility */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Event Visibility</label>
          <div className={`rounded-md ${inputBgStyle}`}>
            <Select
              value={visibility}
              onChange={setVisibility}
              placeholder="Select visibility"
              options={["Public", "Guests only"]}
              className={`!border-none !bg-transparent !shadow-none focus:!ring-0 ${inputBgStyle}`}
              dropdownClassName={dropdownStyle}
            />
          </div>
        </div>

        <hr className="border-gray-200 dark:border-gray-700" />

        {/* Join Mode */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Join Mode</label>
          <div className={`rounded-md ${inputBgStyle}`}>
            <Select
              value={joinMode}
              onChange={setJoinMode}
              placeholder="Select join mode"
              options={["RSVP", "Registration"]}
              className={`!border-none !bg-transparent !shadow-none focus:!ring-0 ${inputBgStyle}`}
              dropdownClassName={dropdownStyle}
            />
          </div>
        </div>

        <hr className="border-gray-200 dark:border-gray-700" />

        {/* Content Contribution */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Content Contribution</label>
          <div className={`rounded-md ${inputBgStyle}`}>
            <Select
              value={contribution}
              onChange={setContribution}
              options={["Guests only", "Public", "Organizer only"]}
              className={`!border-none !bg-transparent !shadow-none focus:!ring-0 ${inputBgStyle}`}
              dropdownClassName={dropdownStyle}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Only registered guests can contribute content
          </p>
        </div>

        <hr className="border-gray-200 dark:border-gray-700" />

        {/* Content Moderation */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Content Moderation</label>
          <div className={`rounded-md ${inputBgStyle}`}>
            <Select
              value={moderation}
              onChange={setModeration}
              options={["Yes", "No"]}
              className={`!border-none !bg-transparent !shadow-none focus:!ring-0 ${inputBgStyle}`}
              dropdownClassName={dropdownStyle}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

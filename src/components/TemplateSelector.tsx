"use client";

import React, { useCallback } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { useTheme } from "@/app/providers/ThemeProvider"; // ✅ import theme hook

interface Template {
  title: string;
  category: string;
  description: string;
  guests: string;
  budget: string;
  gradient: string;
}

interface TemplateSelectorProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  activeTab = "popular",
  setActiveTab = () => {},
}) => {
  const handleTabChange = useCallback(
    (value: string) => {
      console.log("Tab changed to:", value);
      setActiveTab(value);
    },
    [setActiveTab]
  );

  const validTabs = [
    "popular",
    "Weddings",
    "Personal",
    "Corporate",
    "Music",
    "Social",
    "all",
  ];
  const validActiveTab = validTabs.includes(activeTab)
    ? activeTab
    : "popular";

  const templates: Template[] = [
    {
      title: "Indian Wedding",
      category: "Weddings",
      description: "Traditional multi-day wedding celebration",
      guests: "500",
      budget: "25.0L",
      gradient: "from-rose-500 to-pink-600",
    },
    {
      title: "Milestone Birthday",
      category: "Personal",
      description: "Special milestone birthday celebration",
      guests: "100",
      budget: "2.5L",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      title: "Live Concert",
      category: "Music",
      description: "Professional concert with live performances",
      guests: "2000",
      budget: "50.0L",
      gradient: "from-violet-500 to-fuchsia-600",
    },
    {
      title: "Engagement Party",
      category: "Social",
      description: "Celebrate your engagement with close friends",
      guests: "75",
      budget: "1.5L",
      gradient: "from-amber-400 to-orange-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)] bg-clip-text text-transparent mb-2">
          Start with a Template
        </h3>
        <p className="text-sm text-muted-foreground dark:text-gray-400">
          Pre-configured event setups with smart defaults
        </p>
      </div>

      {/* Tabs */}
      <Tabs.Root
        value={validActiveTab}
        onValueChange={handleTabChange}
        className="flex flex-col gap-2 w-full"
      >
        <Tabs.List className="text-muted-foreground dark:text-gray-300 items-center rounded-xl flex w-full justify-start overflow-x-auto flex-wrap gap-2 bg-transparent">
          {validTabs.map((tab) => (
            <Tabs.Trigger
              key={tab}
              value={tab}
              className="inline-flex h-[calc(100%-1px)] items-center justify-center gap-1.5 border border-transparent 
                text-sm font-medium whitespace-nowrap transition-all 
                data-[state=active]:bg-gradient-to-r 
                data-[state=active]:from-[var(--brand-pink)] 
                data-[state=active]:to-[var(--brand-teal)] 
                data-[state=active]:text-white 
                rounded-full px-4 py-2 
                hover:bg-accent/30 
                dark:hover:bg-accent/20"
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {/* Tab Content */}
        {validTabs.map((tab) => (
          <Tabs.Content key={tab} value={tab} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {tab === "all"
                ? templates.map((t) => <TemplateCard key={t.title} template={t} />)
                : tab === "popular"
                ? templates.map((t) => <TemplateCard key={t.title} template={t} />)
                : templates
                    .filter((t) => t.category === tab)
                    .map((t) => <TemplateCard key={t.title} template={t} />)}
            </div>
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </div>
  );
};

/* ===========================================================
   TemplateCard with Theme-based Background
   =========================================================== */
interface TemplateCardProps {
  template: Template;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  const { theme } = useTheme(); // ✅ theme detection

  // 🎨 Apply theme-based background
  const cardBackground =
    theme === "light" ? "bg-white" : "bg-gray-800";

  const borderColor =
    theme === "light" ? "border-gray-200" : "border-white/10";

  return (
    <button
      className={`group relative rounded-xl 
        ${cardBackground}
        backdrop-blur-md 
        p-4 pb-10 shadow-lg 
        border ${borderColor}
        hover:shadow-xl hover:scale-[1.02] 
        transition-all duration-300 text-left overflow-hidden`}
    >
      {/* Subtle gradient hover overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${template.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
      />

      <div className="relative z-10 space-y-3">
        <div className="flex items-start gap-2">
          <div
            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${template.gradient} flex items-center justify-center shadow-md`}
          >
            <span className="text-white text-lg">★</span>
          </div>
          <div className="flex-1 min-w-0">
            <h4
              className="font-medium text-foreground dark:text-white 
                group-hover:text-transparent 
                group-hover:bg-gradient-to-r 
                group-hover:from-[var(--brand-pink)] 
                group-hover:to-[var(--brand-teal)] 
                group-hover:bg-clip-text truncate transition-all"
            >
              {template.title}
            </h4>
          </div>
        </div>

        {/* Category Tag */}
        <span className="inline-block text-xs border border-gray-300 dark:border-gray-700 rounded-2xl px-3 py-1 mt-1 dark:text-gray-300">
          {template.category}
        </span>

        <p className="text-sm text-muted-foreground dark:text-gray-400 line-clamp-2">
          {template.description}
        </p>

        <div className="flex gap-2 text-xs text-muted-foreground dark:text-gray-400 flex-wrap">
          <span>👥 {template.guests}</span>
          <span>💰 {template.budget}</span>
        </div>
      </div>
    </button>
  );
};

export default TemplateSelector;

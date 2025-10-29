"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

import Navbar from "@/components/AddEventNav";
import { SecondaryNav } from "@/components/SecondaryNav";
import { EventHeroCard } from "@/components/EventHeroCard";
import { EventModulesCard } from "@/components/EventModulesCard";
import { GuestThemeCard } from "@/components/GuestThemeCard";
// import { EventSettingsCard } from "@/components/EventSettingsCard";
import { ColorThemeCard } from "@/components/ColorThemeCard";
import { ReadyToLaunchCard } from "@/components/ReadyToLaunchCard";
import { ConfigurationCompleteCard } from "@/components/ConfigurationCompleteCard";
import Footer from "@/components/Footer";
import { useTheme } from "../providers/ThemeProvider";

export default function EventConfigurePage() {
  const { theme } = useTheme();

  // ✅ Dark theme swapped: use gradient instead of gray-800
  const mainStyle =
    theme === "light"
      ? "bg-gradient-to-br from-pink-50 via-purple-50 to-teal-50"
      : "bg-gradient-to-br from-[#0b0a1a] via-[#121122] to-[#1b1b2a]";

  const [activeModules, setActiveModules] = useState([
    "venue",
    "guests",
    "vendors",
    "schedule",
    "content",
    "video",
    "microsite",
  ]);

  const toggleModule = (module: string) => {
    setActiveModules((prev) =>
      prev.includes(module)
        ? prev.filter((m) => m !== module)
        : [...prev, module]
    );
  };

  const handleBack = () => console.log("Go back to prompt editor");
  const handleContinue = () => console.log("Continue to workspace");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className={`flex-1 pt-20 ${mainStyle}`}>
        <div className="min-h-screen w-full">
          <SecondaryNav onBack={handleBack} onContinue={handleContinue} />

          <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
            <EventHeroCard />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <EventModulesCard
                  activeModules={activeModules}
                  onToggleModule={toggleModule}
                />
                <GuestThemeCard />
              </div>

              <div className="space-y-6">
                {/* <EventSettingsCard /> */}
                <ColorThemeCard />
                <ReadyToLaunchCard activeModulesCount={activeModules.length} />
              </div>
            </div>

            <ConfigurationCompleteCard />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

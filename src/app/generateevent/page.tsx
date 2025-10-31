'use client';

import { useTheme } from '@/app/providers/ThemeProvider';
import Header from '@/components/generateevent/GHeader';
import StickyNav from '@/components/generateevent/GSubHeader';
import EventCard from '@/components/generateevent/GEventCard';
import RecommendationCard from '@/components/generateevent/GAIReccommendation';
import TabsSection from '@/components/generateevent/GTabs';
import { useEffect, useState } from "react";
import { LoadingAnimation } from '@/components/LoadingAnimation';

export default function GenerateEventPage() {
   const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay or wait for data in real use case
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500); // show animation for ~2.5s
    return () => clearTimeout(timer);
  }, []);

  // 🧠 State to hold normalized data
  const [eventData, setEventData] = useState<any>(null);
  const [eventModules, setEventModules] = useState<any>(null);
  const [eventSettings, setEventSettings] = useState<any>(null);
  const [eventFlags, setEventFlags] = useState<any>(null);
  const [eventActivities, setEventActivities] = useState<any[]>([]);
  const [eventBudget, setEventBudget] = useState<any>(null);
  const [eventVenues, setEventVenues] = useState<any[]>([]);
  const [eventFieldMeta, setEventFieldMeta] = useState<any[]>([]);
  const [needsReview, setNeedsReview] = useState<boolean>(false);

  // 🧩 Load normalized data from sessionStorage
  useEffect(() => {
    try {
      const storedEventData = sessionStorage.getItem("aiEventData");
      const storedModules = sessionStorage.getItem("aiEventModules");
      const storedSettings = sessionStorage.getItem("aiEventSettings");
      const storedFlags = sessionStorage.getItem("aiEventFlags");
      const storedActivities = sessionStorage.getItem("aiEventActivities");
      const storedBudget = sessionStorage.getItem("aiEventBudget");
      const storedVenues = sessionStorage.getItem("aiEventVenues");
      const storedFieldMeta = sessionStorage.getItem("aiEventFieldMeta");
      const storedNeedsReview = sessionStorage.getItem("aiEventNeedsReview");

      if (storedEventData) setEventData(JSON.parse(storedEventData));
      if (storedModules) setEventModules(JSON.parse(storedModules));
      if (storedSettings) setEventSettings(JSON.parse(storedSettings));
      if (storedFlags) setEventFlags(JSON.parse(storedFlags));
      if (storedActivities) setEventActivities(JSON.parse(storedActivities));
      if (storedBudget) setEventBudget(JSON.parse(storedBudget));
      if (storedVenues) setEventVenues(JSON.parse(storedVenues));
      if (storedFieldMeta) setEventFieldMeta(JSON.parse(storedFieldMeta));
      if (storedNeedsReview) setNeedsReview(JSON.parse(storedNeedsReview));

      console.log("🎯 Loaded Normalized Data:", {
        eventData: JSON.parse(storedEventData || "{}"),
        eventModules: JSON.parse(storedModules || "{}"),
        eventSettings: JSON.parse(storedSettings || "{}"),
        eventFlags: JSON.parse(storedFlags || "{}"),
        eventActivities: JSON.parse(storedActivities || "[]"),
        eventBudget: JSON.parse(storedBudget || "{}"),
        eventVenues: JSON.parse(storedVenues || "[]"),
        eventFieldMeta: JSON.parse(storedFieldMeta || "[]"),
        needsReview: JSON.parse(storedNeedsReview || "false"),
      });
    } catch (err) {
      console.error("Error loading event data from sessionStorage:", err);
    }
  }, []);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  // Define theme-specific backgrounds
  const mainStyle =
    theme === 'light'
      ? 'bg-gradient-to-br from-pink-50 via-purple-50 to-teal-50'
      : 'bg-gradient-to-r from-[#141018] via-[#0f1013] to-[#0a0c10]';

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 pt-15">
        <div className={`min-h-screen w-full ${mainStyle}`}>
          <StickyNav />
          <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">
            {eventData && (<RecommendationCard  data={eventData}/>)}
            <EventCard />
             {eventData && (
                <TabsSection
                  data={eventData}
                  settingdata={eventSettings}
                  eventModulesdata={eventModules}
                  eventActivities={eventActivities}
                  eventBudget={eventBudget}
                  eventVenues={eventVenues}
                />
              )}
          </div>
        </div>
      </div>
      <section
        aria-label="Notifications alt+T"
        tabIndex={-1}
        aria-live="polite"
        aria-relevant="additions text"
        aria-atomic="false"
      ></section>
    </div>
  );
}

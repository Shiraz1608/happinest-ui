import { useState, useEffect } from "react";

export function useEventData() {
  const [eventData, setEventData] = useState<any>(null);
  const [modules, setModules] = useState<Record<string, boolean>>({});
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const storedEventData = sessionStorage.getItem("aiEventData");
      const storedModules = sessionStorage.getItem("aiEventModules");
      const storedSettings = sessionStorage.getItem("aiEventSettings");

      if (storedEventData) setEventData(JSON.parse(storedEventData));
      if (storedModules) setModules(JSON.parse(storedModules));
      if (storedSettings) setSettings(JSON.parse(storedSettings));
    } catch (error) {
      console.error("Error loading event data from sessionStorage:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const activeModuleCount = Object.entries(modules).filter(
    ([_, value]) => value === true
  ).length;

  return { eventData, modules, settings, activeModuleCount, isLoaded };
}



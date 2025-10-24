
'use client';

import { useEffect, useState } from 'react';
import OrganizerHeader from '@/components/DashboardHeader';
import EventHeader from '@/components/EventHeader';
import DashboardMain from '@/components/DashboardMain';
import EmptyEventsCard from '@/components/CreateEvent';

import EventAnimation from '@/components/EventAnimation';
import { ThemeProvider, useTheme } from '../providers/ThemeProvider';

export default function EventsPage() {
  const [hasEvents, setHasEvents] = useState<boolean | null>(null); // null = loading
 const { theme } = useTheme();

  // ✅ Dark theme swapped: use gradient instead of gray-800
  
  useEffect(() => {
    // Replace with real API call later
    const checkEvents = async () => {
      try {
        // const res = await fetch('/api/events');
        // const data = await res.json();
        const data: any[] = []; // ← mock empty
        setHasEvents(data.length > 0);
      } catch (err) {
        console.error(err);
        setHasEvents(false);
      }
    };
    checkEvents();
  }, []);

  // Show loading skeleton or spinner
  if (hasEvents === null) {
    return (
      <ThemeProvider>
        <EventAnimation />
        <div className="min-h-screen bg-dashboard-light dark:bg-dashboard-dark transition-colors duration-300">
          <OrganizerHeader />
          <EventHeader />
          <div className="p-8 text-center text-muted-foreground">Loading events…</div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      
      <EventAnimation />
      <div className="min-h-screen bg-dashboard-light dark:bg-dashboard-dark transition-colors duration-300">
        <OrganizerHeader />
        <EventHeader />

        {/* Conditional Rendering */}
        <DashboardMain />
        {/* {hasEvents ? <DashboardMain /> : <EmptyEventsCard />} */}
      </div> 
    </ThemeProvider>
  
  );
}


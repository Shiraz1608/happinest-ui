'use client';

import { useEffect, useState } from 'react';
import OrganizerHeader from '@/components/DashboardHeader';
import EventHeader from '@/components/EventHeader';
import DashboardMain from '@/components/DashboardMain';
import EmptyEventsCard from '@/components/CreateEvent';
import EventAnimation from '@/components/EventAnimation';
import { useTheme } from '../providers/ThemeProvider';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EventsPage() {
  const [hasEvents, setHasEvents] = useState<boolean | null>(null); // null = loading
 useEffect(() => {
    const fetchEvents = async () => {
      try {
        // 🔹 TODO: Replace mock with real API call
        // const res = await fetch('/api/events');
        // const data = await res.json();
        const data: any[] = []; // Mock data (empty for now)
        setHasEvents(data.length > 0);
      } catch (error) {
        console.error('Error fetching events:', error);
        setHasEvents(false);
      }
    };

    fetchEvents();
  }, []);
 const { data: session, status } = useSession();
  const [response, setResponse] = useState<any>(null);
  const [manualSession, setManualSession] = useState<any>(null);
  const router = useRouter();
const { theme } = useTheme(); // "light" or "dark"

  // Fetch from sessionStorage (Google or Manual)
  useEffect(() => {
    const savedManualSession = sessionStorage.getItem("manual_session");
    const savedData = sessionStorage.getItem("happinest_user_data");

    if (savedManualSession && savedData) {
      setManualSession(JSON.parse(savedManualSession));
      setResponse(JSON.parse(savedData));
    } else if (status === "authenticated" && session?.idToken) {
      // Google login flow
      const payload = {
        accessToken: session.idToken,
        deviceId: "web-client",
        authenticationSource: "Google",
        guestId: 0,
      };

      fetch(`${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/api/Auth/SocialLogin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => {
          setResponse(data);
          sessionStorage.setItem("happinest_user_data", JSON.stringify(data));
        })
        .catch((err) => console.error("Social login error:", err));
    }
  }, [status, session]);
  //  Unified logout
  const handleSignOut = () => {
    sessionStorage.removeItem("happinest_user_data");
    sessionStorage.removeItem("manual_session");
    sessionStorage.removeItem("token");

    if (manualSession) {
        setTimeout(() => router.push("/login"), 1500);
    } else {
      signOut({ callbackUrl: "/login" }); // Google logout
    }
  };
  //  Loading State
  if (status === "loading" && !manualSession) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-medium">
        Loading...
      </div>
    );
  }

  //  Not Logged In
  if (!session && !manualSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center px-6">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-12 text-center max-w-2xl w-full">
          <h1 className="text-3xl font-semibold mb-6">Welcome to Happinest</h1>
          <p className="text-gray-600 text-lg md:text-xl mb-8">
            Please sign in to continue.
          </p>
          <Link
            href="/login"
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-xl shadow-lg transition transform hover:-translate-y-1"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const displayName =
    session?.user?.name || manualSession?.user?.name || response?.fullName;
  const displayEmail =
    session?.user?.email || manualSession?.user?.email || response?.email;
  // 🔹 Loading state
  if (hasEvents === null) {
    return (
      <div className="relative min-h-screen bg-dashboard-light dark:bg-dashboard-dark transition-colors duration-300 overflow-hidden">
        <EventAnimation />
        <OrganizerHeader />
        <EventHeader />
        <div className="p-8 text-center text-muted-foreground animate-pulse">
          Loading events…
        </div>
      </div>
    );
  }

  return (
 <div
      className={`min-h-screen relative overflow-hidden transition-all duration-700 ${
        theme === "light"
          ? "bg-gradient-to-br from-pink-100 via-white to-teal-100"
          : "bg-[radial-gradient(circle_at_50%_40%,_rgba(131,_24,_176,_0.2),_rgba(20,_10,_40,_0.8)_40%,_rgba(10,_5,_20,_1)_90%)] text-purple-100"
      }`}
    >      <EventAnimation />
      <OrganizerHeader />
      <EventHeader />

      {/* 🔹 Conditional Rendering */}
      {hasEvents ? <DashboardMain /> : <EmptyEventsCard />}
    </div>
  );
}

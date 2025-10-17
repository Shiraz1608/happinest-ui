"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import TwinkleAnimation from "@/components/TwinkleAnimation";
import { useTheme } from "@/app/providers/ThemeProvider";

export default function DashboardPage() {
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
    localStorage.removeItem("token");

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

  //  Logged In View
  return (
    
 <div
  className={`min-h-screen flex items-center justify-center px-6 ${
    theme === "light"
      ? "bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100"
      : "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700"
  }`}
>
  <TwinkleAnimation />
  <div
    className={`p-12 text-center max-w-2xl w-full rounded-3xl shadow-2xl backdrop-blur-md ${
      theme === "light" ? "bg-white/90" : "bg-gray-900/80 text-gray-200"
    }`}
  >
    <div className="flex justify-center mb-6">
      <div
        className={`w-20 h-20 rounded-full flex items-center justify-center animate-pulse ${
          theme === "light" ? "bg-gradient-to-r from-purple-500 to-blue-500" : "bg-gradient-to-r from-purple-700 to-blue-700"
        }`}
      >
        <Sparkles className="w-10 h-10 text-white" />
      </div>
    </div>

    <h1
      className={`text-2xl font-semibold mb-2 ${
        theme === "light" ? "text-gray-800" : "text-gray-100"
      }`}
    >
      Welcome, {displayName || "User"}!
    </h1>
    <p className={`${theme === "light" ? "text-gray-600" : "text-gray-300"} mb-6`}>
      Email: {displayEmail}
    </p>

    <h2
      className={`text-4xl md:text-5xl font-extrabold mb-4 ${
        theme === "light" ? "text-gray-900" : "text-gray-200"
      }`}
    >
      Welcome to <span className={theme === "light" ? "text-purple-600" : "text-purple-400"}>Happinest</span> Dashboard
    </h2>

    <div className="flex flex-col md:flex-row justify-center gap-4">
      <button
        className={`px-6 py-3 font-semibold rounded-xl shadow-lg transition transform hover:-translate-y-1 ${
          theme === "light"
            ? "bg-purple-500 hover:bg-purple-600 text-white"
            : "bg-purple-700 hover:bg-purple-800 text-gray-200"
        }`}
      >
        Get Started
      </button>
      <button
        onClick={handleSignOut}
        className={`px-6 py-3 font-semibold rounded-xl shadow transition transform hover:-translate-y-1 ${
          theme === "light"
            ? "bg-red-100 text-red-600 hover:shadow-md"
            : "bg-red-800 text-red-300 hover:shadow-md"
        }`}
      >
        Sign Out
      </button>
    </div>
  </div>
</div>

  );
}

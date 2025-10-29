"use client";
import OrganizerChangePassword from "@/components/OrganizerChangePassword";
import EventAnimation from "@/components/EventAnimation";
import { useTheme } from "@/app/providers/ThemeProvider";

export default function OrganizerLoginPage() {
  const { theme, toggleTheme } = useTheme();


  return ( <div
        className={`min-h-screen flex flex-col relative overflow-hidden transition-all duration-700 ${
          theme === "light"
            ? "bg-gradient-to-br from-pink-100 via-white to-teal-100"
            : "bg-gradient-to-b from-black via-black to-gray-900 text-purple-100"
        }`}
      >
          <div className="absolute inset-0 z-0">
            <EventAnimation />
          </div>
  
          <OrganizerChangePassword/>
        
      </div>
  );
}

"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Plus, Trash2, Settings, LogOut } from "lucide-react";
import { useTheme } from "@/app/providers/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";

export default function DashboardHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // --- close dropdown when clicking outside ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    // <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <header className="w-full sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 dark:bg-[#0b0f1a] backdrop-blur-xl shadow-sm z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* ---------------- Top Navbar ---------------- */}
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Left Section - Logo + Text */}
        <div className="flex items-center gap-3">
          <Image
            src="/happinest-logo.png"
            alt="Happinest Logo"
            width={110}
            height={35}
            className="h-8 w-auto"
          />
          <span className="hidden sm:inline text-sm font-medium text-gray-600 dark:text-gray-400 border-l pl-3">
            Organizer Portal
          </span>
        </div>

        {/* Center Section - Navigation Links */}
        {/* <nav className="hidden md:flex items-center gap-6 text-gray-600 dark:text-gray-300 text-sm font-medium">
          <a href="#" className="hover:text-purple-600 dark:hover:text-purple-400">
            Events
          </a>
          <a href="#" className="hover:text-purple-600 dark:hover:text-purple-400">
            Templates
          </a>
          <a href="#" className="hover:text-purple-600 dark:hover:text-purple-400">
            Resources
          </a>
        </nav> */}

        {/* Right Section - Theme Toggle + Avatar */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative h-9 w-9 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 
                         text-white flex items-center justify-center font-semibold hover:scale-105 
                         transition-all duration-200 focus:outline-none focus:ring-2 
                         focus:ring-offset-2 focus:ring-pink-300"
            >
              U
            </button>

            {isOpen && (
              <div
                className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-900 
                           border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl 
                           overflow-hidden z-50 animate-fadeIn"
              >
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Event Organizer
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    organizer@happinest.com
                  </p>
                </div>

                <button
                  onClick={() => console.log("Update Profile")}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm 
                             text-gray-700 dark:text-gray-300 hover:bg-gray-100 
                             dark:hover:bg-neutral-800 transition-colors"
                >
                  <Settings className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  Update Profile
                </button>

                <button
                  onClick={() => console.log("Logout")}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm 
                             text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 
                             transition-colors"
                >
                  <LogOut className="h-4 w-4 text-red-600" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>


    </header>
  );
}

"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Sun, Moon, Settings, LogOut } from "lucide-react";
import { useTheme } from "@/app/providers/ThemeProvider"; //  use your custom provider
import ThemeToggle from "@/components/ThemeToggle";
export default function OrganizerHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme(); //  using your context

  // Close dropdown when clicking outside
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
    <header
      className={`fixed top-0 left-0 w-full z-50 
                  bg-white/50 dark:bg-neutral-900/50 
                  backdrop-blur-xl shadow-lg 
                  border-b border-white/30 dark:border-gray-800/40 
                  transition-all duration-300`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center h-16 px-4 sm:px-6">
        {/* ---------------- Left Section: Logo ---------------- */}
        <div className="flex items-center space-x-3">
          <Image
            src="/happinest-logo.png"
            alt="Happinest Logo"
            width={120}
            height={40}
            className="h-8 w-auto drop-shadow-sm"
          />
          <span className="hidden sm:inline text-sm font-medium text-gray-600 dark:text-gray-400 border-l pl-3">
            Organizer Portal
          </span>
        </div>

        {/* ---------------- Right Section ---------------- */}
        <div className="flex items-center space-x-3">
          {/*  Theme Toggle */}
          <ThemeToggle />

          {/*  User Avatar Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative h-9 w-9 rounded-full bg-gradient-to-r from-pink-400 to-teal-400 
                         text-white flex items-center justify-center hover:scale-105 
                         transition-all duration-200 focus:outline-none focus:ring-2 
                         focus:ring-offset-2 focus:ring-pink-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A10.95 10.95 0 0112 15c2.26 0 4.36.7 6.121 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>

            {isOpen && (
              <div
                className="absolute right-0 mt-2 w-56 bg-white/90 dark:bg-neutral-900/90 
                           border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl 
                           overflow-hidden backdrop-blur-md animate-fadeIn z-50"
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

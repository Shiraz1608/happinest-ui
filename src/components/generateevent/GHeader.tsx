
"use client";

import { useTheme } from '@/app/providers/ThemeProvider';
import { Moon, Sun, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
export default function Header() {
   const router = useRouter();
  
  const { theme, toggleTheme } = useTheme()
const handleExit = () => {
    const confirmed = window.confirm("Are you sure you want to exit setup?");
    if (confirmed) {
      router.push("/eventdashboard");
    }
  };
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50   backdrop-blur-xl  border-b   transition-all duration-300
        ${theme==="dark"?
  "bg-neutral-900/50 border-gray-800/40":  "bg-white border-gray-300"}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Left Section: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-pink-400 to-teal-400 shadow-sm" />
          <span
            className="font-medium bg-gradient-to-r from-pink-400 to-teal-400 bg-clip-text text-transparent tracking-wide dark:from-pink-300 dark:to-teal-300"
          >
            Happinest
          </span>
        </Link>

       

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="inline-flex items-center justify-center h-9 w-9 rounded-full    hover:scale-105 transition-all duration-200 "
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-white" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4 text-black" aria-hidden="true" />
            )}
          </button>

          {/* Exit Setup Button */}
          <button onClick={handleExit}
            className={`flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors duration-200
                ${theme==="light" } ?
                "text-gray-700" : "text-gray-300 "`}
          >
            <X className="h-4 w-4" aria-hidden="true" />
            Exit Setup
          </button>
        </div>
      </div>
    </header>
  );
}
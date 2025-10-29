"use client";
import React from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/app/providers/ThemeProvider";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { theme } = useTheme();
 const router = useRouter();

  const handleExit = () => {
    const confirmed = window.confirm("Are you sure you want to exit setup?");
    if (confirmed) {
      router.push("/eventdashboard");
    }
  };

  return (
    <div className="relative">
      {/* Background behind navbar (changes with theme) */}
      <div
        className={`absolute top-0 left-0 right-0 h-[5rem] z-0 transition-colors duration-500 ${
          theme === "light" ? "bg-white" : "bg-black"
        }`}
      />

      {/* Navbar content */}
     <div
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b transition-all ${
        theme === "dark"
          ? "bg-neutral-900/80 border-neutral-700"
          : "bg-white/80 border-gray-300"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative z-10">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)]" />
          <span className="bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)] bg-clip-text text-transparent font-semibold">
            Happinest
          </span>
        </div>

        {/* Center animation */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[var(--brand-teal)]" />
            <div className="h-2 w-8 rounded-full bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)]" />
            <div
              className={`h-2 w-2 rounded-full ${
                theme === "dark" ? "bg-neutral-600" : "bg-gray-300"
              }`}
            />
          </div>
        </div>

        {/* Right-side buttons */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <div className="inline-flex items-center justify-center h-9 w-9 rounded-md hover:bg-accent hover:text-accent-foreground transition-all">
  <ThemeToggle />
</div>


          {/* Exit Button */}
          <button
            onClick={handleExit}
            className="inline-flex items-center justify-center h-8 rounded-md px-3 hover:bg-accent hover:text-accent-foreground transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-x h-4 w-4 mr-2"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
            Exit Setup
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Navbar;

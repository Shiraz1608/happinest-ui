"use client";
import { useTheme } from "@/app/providers/ThemeProvider";
import OrganizerHeader from "@/components/OrganizerHeader";
import OrganizerLoginForm from "@/components/OrganizerLoginForm";
import OrganizerFooter from "@/components/OrganizerFooter";
import TwinkleAnimation from "@/components/TwinkleAnimation";
import EventAnimation from "@/components/EventAnimation";
import ThemeToggle from "@/components/ThemeToggle";

import { Sun, Moon } from "lucide-react";
import Link from "next/link";

export default function OrganizerLoginPage() {
  const { theme, toggleTheme } = useTheme();

  return (
 <div
  className={`min-h-screen flex flex-col items-center justify-center relative overflow-hidden transition-all duration-700 ${
    theme === "light"
      ? "bg-gradient-to-br from-pink-50 via-white to-teal-100 "
      : "bg-gradient-to-b from-black via-black to-gray-900 text-purple-100"
  }`}
>

  
      {/* Background Animation */}
<div className="absolute inset-0 z-0">
  <EventAnimation />
</div>

      {/* ---- TOP LEFT: Back to Home ---- */}
     <div className="absolute top-4 left-4 z-20">
  <Link
    href="/"
    className={`inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all
      disabled:pointer-events-none disabled:opacity-50
      [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0
      outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2
      aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40
      hover:text-accent-foreground
      h-8 px-3 has-[>svg]:px-2.5 rounded-full
      bg-transparent  
      backdrop-blur-md border  
       
      gap-2 ${theme==="light"?"hover:border-gray-400 hover:bg-white/10 border-none":"hover:bg-white/10 hover:border-gray-500 border-neutral-700"}`}
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
      className={`${
        theme === "light" ? "text-gray-900" : "text-white"
      } hidden sm:inline font-medium`}
      aria-hidden="true"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>

    <span
      className={`${
        theme === "light" ? "text-gray-900" : "text-white"
      } hidden sm:inline font-medium`}
    >
      Back to Home
    </span>
  </Link>
</div>


      {/* ---- TOP RIGHT: Theme Toggle ---- */}
      <div className="absolute top-4 right-4 z-20">
      <ThemeToggle/>
      </div>

      {/* ---- MAIN CONTENT ---- */}
<main className="flex-grow flex flex-col items-center justify-center px-4 py-12 text-gray-800 dark:text-purple-100">        <br />
        <br />
        <OrganizerLoginForm />
        <br />
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          By signing in, you agree to our{" "}
          <a
            href="#"
            className="text-[var(--brand-pink)] hover:text-[var(--brand-purple)] transition-colors text-[15px] text-bold"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="text-[var(--brand-pink)] hover:text-[var(--brand-purple)] transition-colors text-[15px] text-bold"
          >
            Privacy Policy
          </a>
          .
        </p>
      </main>
    </div>
  );
}

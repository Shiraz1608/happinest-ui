"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/app/providers/ThemeProvider";
import OrganizerHeader from "@/components/OrganizerHeader";
import OrganizerSignUpForm from "@/components/OrganizerSignUpForm";
import OrganizerFooter from "@/components/OrganizerFooter";
import TwinkleAnimation from "@/components/TwinkleAnimation";

export default function OrganizerSignUpPage() {
  const { theme } = useTheme();
  return (
    <div
      className={`min-h-screen flex flex-col relative overflow-hidden transition-all duration-700 ${
        theme === "light"
          ? "bg-gradient-to-br from-pink-100 via-white to-teal-100"
          : "bg-[radial-gradient(circle_at_50%_40%,_rgba(217,_77,_216,_0.25),_rgba(20,_10,_40,_0.9)_30%,_rgba(10,_5,_20,_1)_80%)]"
      }`}
    >
      <TwinkleAnimation />
  <br />
   <br />
      <OrganizerHeader />
           <br />

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12 text-gray-800 dark:text-purple-100">
        <OrganizerSignUpForm />
        <br />
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          By creating an account, you agree that Happinest is not meant for collecting
          PII or securing sensitive data.
        </p>
      </main>

      <OrganizerFooter />
    </div>
  );
}
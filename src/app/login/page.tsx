"use client";
import { useTheme } from "@/app/providers/ThemeProvider";
import OrganizerHeader from "@/components/OrganizerHeader";
import OrganizerLoginForm from "@/components/OrganizerLoginForm";
import OrganizerFooter from "@/components/OrganizerFooter";
import TwinkleAnimation from "@/components/TwinkleAnimation";

export default function OrganizerLoginPage() {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col relative overflow-hidden transition-all duration-700 ${
        theme === "light"
          ? "bg-gradient-to-br from-pink-100 via-white to-teal-100"
          : "bg-[radial-gradient(circle_at_50%_40%,_rgba(131,_24,_176,_0.2),_rgba(20,_10,_40,_0.8)_40%,_rgba(10,_5,_20,_1)_90%)] text-purple-100"
      }`}
    >
      <TwinkleAnimation />
      <OrganizerHeader />

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12 text-gray-800 dark:text-purple-100">
                <br />
   <br />
        <OrganizerLoginForm />
           <br />

        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          By signing in, you agree to our{" "}
          <a
            href="#"
            className="text-pink-400 dark:text-pink-400 hover:text-pink-300 transition-colors"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="text-pink-400 dark:text-pink-400 hover:text-pink-300 transition-colors"
          >
            Privacy Policy
          </a>
          .
        </p>
      </main>

      <OrganizerFooter />
    </div>
  );
}
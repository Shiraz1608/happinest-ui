"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/app/providers/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
       className={`p-2 rounded-full transition hover:scale-105 ${
        theme === "light"
          ? "bg-gray-100 hover:bg-gray-200"
          : "bg-neutral-800 hover:bg-neutral-700"
      }`}
    >
      {theme === "light" ? <Moon className="w-5 h-5 text-gray-800" /> : <Sun className="w-5 h-5 text-yellow-400" />}
    </button>
  );
}

"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/app/providers/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-100 dark:bg-neutral-800 hover:scale-105 transition"
    >
      {theme === "light" ? <Moon className="w-5 h-5 text-gray-800" /> : <Sun className="w-5 h-5 text-yellow-400" />}
    </button>
  );
}

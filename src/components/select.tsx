"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "@/app/providers/ThemeProvider";

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options: string[];
}

export function Select({ value, onChange, placeholder, options }: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🎨 Input box (always light theme style)
  const inputBoxStyle = theme=="light"
  ?"bg-gray-100 text-gray-800 border border-gray-300":
"bg-neutral-800 text-white border border-gray-300"
  // 🎨 Dropdown and selection vary by theme
  const dropdownStyle =
    theme === "light"
      ? "bg-white border-gray-200"
      : "bg-black border-white/10"; // black dropdown in dark mode

  const hoverStyle =
    theme === "light"
      ? "hover:bg-gray-100"
      : "hover:bg-neutral-800"; // dark blue-gray hover for dark mode

  const selectedStyle =
    theme === "light"
      ? "bg-gray-50 font-medium"
      : "bg-[#1e3a8a] text-white font-medium"; // darkish blue selected color

  return (
    <div ref={ref} className="relative">
      {/* Trigger Button (always same color) */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-sm transition-all outline-none focus-visible:ring-2 focus-visible:ring-purple-500 h-9 ${inputBoxStyle}`}
      >
        <span className="truncate">{value || placeholder}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`lucide lucide-chevron-down size-4 opacity-60 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <ul
          className={`absolute z-20 mt-1 w-full rounded-md border shadow-md transition-all duration-200 ${dropdownStyle}`}
        >
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`px-3 py-2 text-sm cursor-pointer ${hoverStyle} ${
                value === option ? selectedStyle : ""
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

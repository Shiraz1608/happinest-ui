"use client";

import React, { useState } from "react";
import { Search, Filter, Grid, List, ChevronDown } from "lucide-react";
import { useTheme } from "@/app/providers/ThemeProvider";

interface SearchBarProps {
  view: "grid" | "list";
  setView: React.Dispatch<React.SetStateAction<"grid" | "list">>;
}

export default function SearchBar({ view, setView }: SearchBarProps) {
  const { theme } = useTheme();
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    type: "All Types",
    status: "All Status",
    date: "All Dates",
  });
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const baseStyles = `
    border rounded-xl transition-all focus-within:ring-2 
    focus-within:ring-pink-400 focus-within:shadow-sm
  `;
  const light = "bg-white text-gray-700 border-gray-300";
  const dark = "bg-gray-800 text-gray-200 border-gray-600";

  const filterOptions = {
    type: ["All Types", "Online", "In-Person", "Hybrid"],
    status: ["All Status", "Free", "Paid", "Cancelled"],
    date: ["All Dates", "Today", "This Week", "This Month"],
  };

  const handleSelect = (category: string, option: string) => {
    setSelectedFilters((prev) => ({ ...prev, [category]: option }));
    setOpenDropdown(null);
  };

  const toggleDropdown = (category: string) => {
    setOpenDropdown((prev) => (prev === category ? null : category));
  };

  return (
    <>
      {/* --- Main Container with Search + Filter --- */}
      <div
        className={`w-full max-w-8xl rounded-2xl shadow-md backdrop-blur-md p-4 transition-all duration-300
          ${theme === "light" ? light : dark}`}
      >
        {/* --- Search + Filter Section --- */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Bar */}
          <div
            className={`${baseStyles} flex items-center w-full sm:w-2/3 px-4 py-2 
              ${theme === "light" ? "bg-gray-100 text-gray-700 border-gray-300" : dark}`}
          >
            <Search className="w-5 h-5 mr-2 opacity-70" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full bg-transparent outline-none placeholder:opacity-60 ${
                theme === "dark"
                  ? "placeholder:text-white text-white"
                  : "placeholder:text-gray-500"
              }`}
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`${baseStyles} flex items-center gap-1 px-3 py-2 
              ${theme === "light" ? light : dark}`}
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filter</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* --- Filters Dropdown --- */}
        {showFilters && (
          <div
            className={`mt-4 p-4 border-t rounded-xl transition-all duration-300 
              ${theme === "light" ? light : dark}`}
          >
            <div className="flex flex-wrap items-start gap-3">
              {Object.entries(filterOptions).map(([category, options]) => (
                <div key={category} className="relative">
                  <button
                    onClick={() => toggleDropdown(category)}
                    className={`${baseStyles} flex items-center justify-between w-[160px] px-3 py-2 text-sm 
                      ${
                        theme === "light"
                          ? "bg-gray-100 text-gray-700 border-gray-300"
                          : dark
                      }`}
                  >
                    <span>{selectedFilters[category as keyof typeof selectedFilters]}</span>
                    <ChevronDown
                      className={`w-4 h-4 opacity-50 transition-transform ${
                        openDropdown === category ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === category && (
                    <div
                      className={`absolute mt-1 w-full rounded-xl shadow-lg z-10 overflow-hidden 
                        ${
                          theme === "light"
                            ? "bg-white border border-gray-200"
                            : "bg-black border border-gray-700"
                        }`}
                    >
                      {options.map((option) => (
                        <div
                          key={option}
                          onClick={() => handleSelect(category, option)}
                          className={`px-3 py-2 text-sm cursor-pointer transition-all rounded-md
                            ${
                              theme === "dark"
                                ? "bg-black text-gray-300 hover:bg-gradient-to-r hover:bg-gray-500 hover:text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:bg-gray-500 hover:text-white"
                            }`}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* --- New View Session --- */}
      <div className="flex items-center justify-end gap-2 w-full max-w-8xl mt-4">
        <span className="text-sm text-muted-foreground dark:text-gray-400">View:</span>

        <div className="flex items-center border border-[var(--card-border)] rounded-lg p-1 bg-[var(--card-bg)]/50 backdrop-blur-sm">
          {/* Grid Button */}
         <button
  onClick={() => setView("grid")}
  title="Grid view"
  className={`inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all h-8 rounded-md gap-1.5 px-3 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
    ${
      view === "grid"
        ? "bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-purple)] text-white hover:opacity-90"
        : "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 text-muted-foreground"
    }`}
>
  {/* Grid SVG */}
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
    className="h-4 w-4"
    aria-hidden="true"
  >
    <rect width="7" height="7" x="3" y="3" rx="1"></rect>
    <rect width="7" height="7" x="14" y="3" rx="1"></rect>
    <rect width="7" height="7" x="14" y="14" rx="1"></rect>
    <rect width="7" height="7" x="3" y="14" rx="1"></rect>
  </svg>
</button>


          {/* List Button */}
          <button
            onClick={() => setView("list")}
            title="List view"
            className={`inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all h-8 rounded-md gap-1.5 px-3 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
              ${
                view === "list"
                  ? "bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-purple)] text-white hover:opacity-90"
                  : "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 text-muted-foreground"
              }`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
}

"use client";

import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { useTheme } from '@/app/providers/ThemeProvider';

export default function StickyNav() {
const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`sticky top-0 z-10 border-b backdrop-blur-md  ${
        theme === 'dark' ? 'bg-gray-900/80 border-neutral-700' : 'bg-white/80 border-gray-300'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 gap-2 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Edit Prompt</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)] flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            <div className="hidden sm:block">
              <h2 className="font-semibold">Configure Your Event</h2>
              <p className="text-xs text-gray-500">Review and customize settings</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 border text-foreground hover:bg-gray-200 dark:hover:bg-gray-800 dark:bg-neutral-800/30 h-9 px-4 py-2 gap-2
                ${theme==="light"?
"border-gray-300":"border-neutral-500 bg-input/30  hover:bg-input/50 hover:bg-neutral-700 bg-neutral-800 border-gray-300"
              }`}
              
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Regenerate</span>
            </button>
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 hover:opacity-90 shadow-sm h-9 px-4 py-2 bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)] text-white border-0 gap-2"
            >
              <span className="hidden sm:inline">Continue to Workspace</span>
              <span className="sm:hidden">Continue</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
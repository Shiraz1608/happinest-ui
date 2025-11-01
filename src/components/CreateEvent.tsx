'use client';

import Link from 'next/link';
import { Calendar, Plus } from 'lucide-react';
import { Card, CardContent } from './Card';
import { useTheme } from '@/app/providers/ThemeProvider';

export default function EmptyEventsCard() {
  const { theme } = useTheme();

  // ✅ Light/Dark mode background
  const cardBg =
    theme === 'light'
      ? 'bg-white border border-gray-300'
      : 'bg-gray-900 border-gray-600';

  return (
    <div className="relative">
      <Card
        className={`${cardBg} backdrop-blur-sm transition-colors duration-300 h-[400px] flex items-center justify-center`}
      >
        <CardContent className="text-center py-2">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)] opacity-20 mb-6">
            <Calendar className="h-10 w-10 text-white" />
          </div>

          <h3 className={`text-2xl font-semibold mb-3 ${
        theme === "dark"
          ? "text-white"
          : "text-black"
      }`}>No events yet</h3>

          <p  className={`text-muted-foreground mb-8 text-base ${
        theme === "dark"
          ? "text-white"
          : "text-black"
      }`} >
            Create your first event to get started
          </p>

          <Link href="/addevent">
            <button
              className="bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-purple)]
                         text-white hover:opacity-90 transition-opacity
                         h-12 px-8 rounded-lg inline-flex items-center justify-center
                         text-base font-medium shadow-md hover:scale-105 active:scale-95 transition"
            >
              <Plus className="mr-2 h-5 w-5" />
              Create Your First Event
            </button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { Calendar, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from './Card';
import { useTheme } from '@/app/providers/ThemeProvider';

export default function EmptyEventsCard() {
  const { theme } = useTheme();

  // ✅ Apply light/dark background dynamically
  const cardBg =
    theme === 'light'
      ? 'bg-white border border-gray-300'
      : 'bg-gray-800 border border-white/10';

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-8 py-8">
      <Card className={`${cardBg} backdrop-blur-sm transition-colors duration-300`}>
        <CardContent className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)] opacity-20 mb-4">
            <Calendar className="h-8 w-8 text-white" />
          </div>

          <h3 className="text-xl font-semibold mb-2">No events yet</h3>

          <p className="text-muted-foreground mb-6">
            Create your first event to get started
          </p>

          {/* CTA → /addevent */}
          <Button
            asChild
            className="bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)] text-white hover:opacity-90 transition-opacity h-10 px-6"
          >
            <Link href="">
              <Plus className="mr-2 h-5 w-5" />
              Create Your First Event
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

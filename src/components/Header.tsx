// app/dashboard/components/layout/Header.tsx
import { Sun } from 'lucide-react';
import { Button } from './Button';
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <img src="/logo-happinest.png" alt="Happinest" className="h-8 w-auto object-contain" />
          <span className="text-xs text-muted-foreground border-l pl-3 hidden sm:inline">
            Organizer Portal
          </span>
        </div>
        <div className="flex items-center gap-2">
                   <ThemeToggle />
         
          <Button size="icon" className="rounded-full">
            <div className="h-9 w-9 rounded-full bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)] flex items-center justify-center text-white text-sm font-medium">
              U
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}
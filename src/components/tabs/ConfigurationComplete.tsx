
import { Check } from 'lucide-react';
import { useTheme } from '@/app/providers/ThemeProvider';

export default function ConfigurationComplete() {
  const { theme } = useTheme();

  return (
    <div className={`text-card-foreground flex flex-col gap-6 rounded-xl border border-[var(--brand-pink)] ${theme === "dark" ? "from-pink-950/10 via-purple-950/10 to-cyan-950/10" : "from-pink-50 via-purple-50 to-cyan-50"}`}>
      <div className="[&:last-child]:pb-6 p-4 sm:p-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)] flex items-center justify-center flex-shrink-0">
            <Check className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <p className="font-semibold">Configuration Complete</p>
            <div className="flex flex-wrap items-center gap-2 text-gray-400 sm:gap-4 text-xs sm:text-sm text-muted-foreground mt-1">
              <span>10 modules enabled</span>
              <span className="hidden sm:inline">•</span>
              <span className="capitalize truncate max-w-[150px]">luxe theme</span>
              <span className="hidden sm:inline">•</span>
              <span>Open registration</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
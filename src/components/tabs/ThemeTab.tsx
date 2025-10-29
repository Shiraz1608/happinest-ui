import { Palette } from 'lucide-react';
import { useTheme } from '@/app/providers/ThemeProvider';
export default function ThemeTab() {
   const { theme, toggleTheme } = useTheme();
  return (
    <div className="flex-1 outline-none  space-y-4 mt-4">
      <div data-slot="card" className={` text-card-foreground flex flex-col gap-6 rounded-xl border ${theme==="light"?" bg-white border-gray-300": "bg-black border-neutral-700"}`}>
        <div data-slot="card-header" className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 pb-3">
          <h4 data-slot="card-title" className="text-base flex items-center gap-2">
            <Palette className="h-5 w-5 text-[var(--brand-teal)]" aria-hidden="true" />
            Guest Site Theme
          </h4>
          <p data-slot="card-description" className={`text-muted-foreground  text-xs
            ${theme==="light"?"text-gray-500":"text-gray-400"}`}>
            Your recommended theme is pre-selected
          </p>
        </div>
        <div data-slot="card-content" className="px-6 [&:last-child]:pb-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border border-[var(--brand-pink)]/20 bg-gradient-to-r from-[var(--brand-pink)]/5 to-[var(--brand-teal)]/5">
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <span className="text-2xl flex-shrink-0">Sparkles</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-sm">Modern Luxe Minimalist</span>
                    <span data-slot="badge" className="inline-flex items-center justify-center rounded-lg border py-0.3 px-1 font-medium w-fit whitespace-nowrap shrink-0 text-xs border-[var(--brand-pink)]/30 text-foreground hover:bg-accent hover:text-accent-foreground">
                      Recommended
                    </span>
                  </div>
                </div>
              </div>
              <button className="text-xs text-[var(--brand-pink)] hover:text-[var(--brand-purple)] transition-colors flex-shrink-0 ml-2">
                Change
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
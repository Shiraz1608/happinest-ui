// app/dashboard/components/FloatingAIButton.tsx
import { Sparkles } from 'lucide-react';

export default function FloatingAIButton() {
  return (
    <button className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)] text-white hover:shadow-xl transition-all z-50 hover:opacity-90 inline-flex items-center justify-center">
      <Sparkles className="h-6 w-6" />
    </button>
  );
}
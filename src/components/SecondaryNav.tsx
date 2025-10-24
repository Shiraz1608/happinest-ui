import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

interface SecondaryNavProps {
  onBack: () => void;
  onContinue: () => void;
}

export function SecondaryNav({ onBack, onContinue }: SecondaryNavProps) {
  return (
    <div className="sticky top-0 z-10 border-b border-gray-300 bg-white/80 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center h-9 px-4 py-2 rounded-md hover:bg-accent gap-2 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Edit Prompt
          </button>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-pink-500 to-teal-500 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-xl">Configure Your Event</h2>
              <p className="text-xs text-muted-foreground text-gray-500">
                Review settings and customize
              </p>
            </div>
          </div>

          <button
            onClick={onContinue}
            className="inline-flex items-center justify-center h-9 px-4 py-2 rounded-md shadow-sm bg-gradient-to-r from-pink-500 to-teal-500 text-white hover:opacity-90 transition-all gap-2"
          >
            Continue to Workspace
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

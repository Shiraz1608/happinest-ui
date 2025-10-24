// app/dashboard/components/ui/Progress.tsx
interface ProgressProps {
  value?: number;
  indeterminate?: boolean;
}

export function Progress({ value, indeterminate = true }: ProgressProps) {
  return (
    <div className="bg-primary/20 relative w-full overflow-hidden rounded-full h-1.5">
      <div
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: indeterminate ? 'translateX(-100%)' : `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  );
}
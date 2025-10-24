

import { cn } from "./utils";


interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'gradient' | 'purple' | 'success';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'border text-foreground',
    gradient: 'bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)] text-white border-0',
    purple: 'bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-950 dark:text-purple-400',
    success: 'border text-foreground'
  };

  return (
    <span className={cn(
      "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}
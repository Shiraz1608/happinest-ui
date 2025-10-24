

import { ButtonHTMLAttributes } from 'react';
import { cn } from './utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'outline' | 'destructive' | 'gradient';
  size?: 'default' | 'sm' | 'icon';
}

export function Button({ 
  children, 
  variant = 'default', 
  size = 'default', 
  className, 
  ...props 
}: ButtonProps) {
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    outline: 'border bg-background hover:bg-accent hover:text-accent-foreground',
    destructive: 'text-destructive hover:bg-destructive/10',
    gradient: 'bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)] text-white hover:opacity-90'
  };

  const sizes = {
    default: 'h-9 px-4 py-2',
    sm: 'h-8 px-3 text-xs',
    icon: 'h-9 w-9'
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
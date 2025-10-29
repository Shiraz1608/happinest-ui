
'use client';

import * as React from 'react';
import { cn } from './utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  bordered?: boolean;
}

export function Card({ children, className, bordered = true }: CardProps) {
  return (
    <div
      className={cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl',
        bordered && 'border',
        className
      )}
    >
      {children}
    </div>
  );
}

// === YOUR ORIGINAL COMPONENTS (UNCHANGED) ===
export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('px-6 pt-6', className)}>{children}</div>;
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('px-6 [&:last-child]:pb-6', className)}>{children}</div>;
}

// === NEW: ADDITIONAL CARD SUBCOMPONENTS ===

export function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        'text-lg font-semibold leading-none tracking-tight',
        className
      )}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn('text-sm text-muted-foreground', className)}>
      {children}
    </p>
  );
}

// Optional: CardFooter
export function CardFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('px-6 pb-6 pt-2', className)}>{children}</div>
  );
}

// Optional: CardAction (for buttons in header)
export function CardAction({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('ml-auto', className)}>{children}</div>;
}


// import { cn } from "./utils";


// interface CardProps {
  // children: React.ReactNode;
  // className?: string;
  // bordered?: boolean;
// }

// export function Card({ children, className, bordered = true }: CardProps) {
  // return (
    // <div className={cn(
      // "bg-card text-card-foreground flex flex-col gap-6 rounded-xl",
      // bordered && "border",
      // className
    // )}>
      // {children}
    // </div>
  // );
// }

// export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  // return <div className={cn("px-6 pt-6", className)}>{children}</div>;
// }

// export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  // return <div className={cn("px-6 [&:last-child]:pb-6", className)}>{children}</div>;
// }
import { cn } from "./utils";


interface CardProps {
  children: React.ReactNode;
  className?: string;
  bordered?: boolean;
}

export function Card({ children, className, bordered = true }: CardProps) {
  return (
    <div className={cn(
      "bg-card text-card-foreground flex flex-col gap-6 rounded-xl",
      bordered && "border",
      className
    )}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("px-6 pt-6", className)}>{children}</div>;
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("px-6 [&:last-child]:pb-6", className)}>{children}</div>;
}
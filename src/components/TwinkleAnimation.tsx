"use client";
import { useEffect, useState } from "react";

interface Dot {
  top: string;
  left: string;
  animationDuration: string;
  animationDelay: string;
}

export default function TwinkleAnimation() {
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    const generatedDots: Dot[] = Array.from({ length: 20 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 2 + 2}s`,
      animationDelay: `${Math.random() * 2}s`,
    }));
    setDots(generatedDots);
  }, []);

  return (
    <>
      {/* Blurred Gradient Circles */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-pink-400 to-teal-400 blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-teal-400 to-pink-400 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Twinkling Dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {dots.map((dot, i) => (
          <div
            key={i}
            className="absolute animate-twinkle"
            style={{
              top: dot.top,
              left: dot.left,
              animationDelay: dot.animationDelay,
              animationDuration: dot.animationDuration,
            }}
          >
            <div className="w-1.5 h-1.5 bg-teal-400 rounded-full shadow-lg shadow-teal-400/50" />
          </div>
        ))}
      </div>

    
    </>
  );
}

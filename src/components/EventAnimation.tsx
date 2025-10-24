"use client";
import { useEffect, useState } from "react";

interface Shape {
  top: string;
  left: string;
  animationDuration: string;
  animationDelay: string;
  type: "heart" | "star" | "gift";
}

export default function EventAnimation() {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [leftShapes, setLeftShapes] = useState<Shape[]>([]);

  useEffect(() => {
    // Random general shapes
    const generatedShapes: Shape[] = Array.from({ length: 20 }).map(() => {
      const rand = Math.random();
      const type: Shape["type"] = rand < 0.33 ? "heart" : rand < 0.66 ? "star" : "gift";
      return {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 2 + 2}s`,
        animationDelay: `${Math.random() * 2}s`,
        type,
      };
    });

    // Extra left side shapes
    const extraLeftShapes: Shape[] = Array.from({ length: 15 }).map(() => {
      const rand = Math.random();
      const type: Shape["type"] = rand < 0.33 ? "heart" : rand < 0.66 ? "star" : "gift";
      return {
        top: `${Math.random() * 70 + 5}%`,
        left: `${Math.random() * 5 + 2}%`, // stay near left
        animationDuration: `${Math.random() * 2 + 2}s`,
        animationDelay: `${Math.random() * 2}s`,
        type,
      };
    });

    setShapes(generatedShapes);
    setLeftShapes(extraLeftShapes);
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 0;
            transform: translateY(0) scale(0.8);
          }
          50% {
            opacity: 1;
            transform: translateY(-10px) scale(1);
          }
        }
      `}</style>

      {/* Blurred Gradient Circles */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Twinkling Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {shapes.map((shape, i) => (
          <ShapeSVG key={`s-${i}`} shape={shape} />
        ))}

        {leftShapes.map((shape, i) => (
          <ShapeSVG key={`l-${i}`} shape={shape} />
        ))}
      </div>
    </>
  );
}

// Separate component for SVG shapes
function ShapeSVG({ shape }: { shape: Shape }) {
  return (
    <div
      className="absolute"
      style={{
        top: shape.top,
        left: shape.left,
        animation: `twinkle ${shape.animationDuration} infinite ease-in-out`,
        animationDelay: shape.animationDelay,
      }}
    >
      {shape.type === "heart" ? (
        <svg className="w-5 h-5 text-pink-500 stroke-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}/>
        </svg>
      ) : shape.type === "star" ? (
        <svg className="w-5 h-5 text-pink-500 stroke-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03 L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}/>
        </svg>
      ) : (
        <svg className="w-5 h-5 text-pink-500 stroke-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M20 10h-3V6c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v4H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zm-10-4h4v4h-4V6zm-2 6v6H6v-6h2zm4 0v6h-2v-6h2zm6 6h-2v-6h2v6zM9 4h6v2H9V4zm4 12h6v2h-6v-2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}/>
        </svg>
      )}
    </div>
  );
}

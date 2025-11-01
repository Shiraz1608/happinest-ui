"use client";
import { useEffect, useState } from "react";
import {
  Sparkles,
  Camera,
  Music,
  Heart,
  Star,
  Gift,
} from "lucide-react";
import { ReactElement } from "react"; // ✅ add this import at the top

type ShapeType =
  | "sparkles"
  | "camera"
  | "music"
  | "heart"
  | "star"
  | "gift";

interface Shape {
  top: string;
  left: string;
  animationDuration: string;
  animationDelay: string;
  type: ShapeType;
}

export default function EventAnimation() {
  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    const icons: ShapeType[] = [
      "sparkles",
      "camera",
      "music",
      "heart",
      "star",
      "gift",
    ];

    const generatedShapes: Shape[] = Array.from({ length: 25 }).map(() => {
      const type = icons[Math.floor(Math.random() * icons.length)];
      return {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${2 + Math.random() * 3}s`,
        animationDelay: `${Math.random() * 2}s`,
        type,
      };
    });

    setShapes(generatedShapes);
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes twinkle {
          0% {
            opacity: 0;
            transform: translateY(0) scale(0.8);
          }
          50% {
            opacity: 0.6;
            transform: translateY(-10px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(0) scale(0.8);
          }
        }
      `}</style>

      {/* 🌈 Gradient Background Glow */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none">
        <div className="absolute top-[25%] left-[30%] h-[30rem] w-[30rem] rounded-full bg-gradient-to-r from-pink-400 to-teal-400 blur-3xl animate-pulse" />
        <div
          className="absolute bottom-[15%] right-[35%] h-[30rem] w-[30rem] rounded-full bg-gradient-to-r from-teal-400 to-pink-400 blur-3xl animate-pulse"
          style={{ animationDelay: "1.2s" }}
        />
      </div>

      {/* ✨ Floating Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {shapes.map((shape, i) => (
          <ShapeSVG key={i} shape={shape} />
        ))}
      </div>
    </>
  );
}

// 🎨 Shape Renderer with unified animation & random color
function ShapeSVG({ shape }: { shape: Shape }) {
  const commonProps = {
    size: 20,
    strokeWidth: 1.5,
  };

  const colorPalette = [
    "#f472b6", // pink-400
    "#f472b6", // green-400
    "#f472b6", // amber-400
    "#f472b6", // violet-400
    "#f472b6", // rose-400
    "#f472b6", // teal-400
  ];

  const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
  const opacity = 0.4 + Math.random() * 0.3; // random transparency between 0.4–0.7

  const icons: Record<ShapeType, ReactElement> = {
    sparkles: <Sparkles color={color} {...commonProps} />,
    camera: <Camera color={color} {...commonProps} />,
    music: <Music color={color} {...commonProps} />,
    heart: <Heart color={color} {...commonProps} />,
    star: <Star color={color} {...commonProps} />,
    gift: <Gift color={color} {...commonProps} />,
  };

  return (
    <div
      className="absolute"
      style={{
        top: shape.top,
        left: shape.left,
        opacity, // 👈 apply soft transparency
        animation: `twinkle ${shape.animationDuration} infinite ease-in-out`,
        animationDelay: shape.animationDelay,
      }}
    >
      {icons[shape.type]}
    </div>
  );
}

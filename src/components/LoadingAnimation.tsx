
"use client";
import { Calendar, Users, MapPin, Sparkles, Camera, Music } from "lucide-react";
import { useTheme } from "@/app/providers/ThemeProvider";

export function LoadingAnimation() {
  const { theme } = useTheme();

  // Dynamic gradient based on theme
  const bgStyle =
    theme === "light"
      ? "bg-gradient-to-br from-pink-50 via-purple-50 to-teal-50"
      : "bg-gradient-to-r from-[#141018] via-[#0f1013] to-[#0a0c10]";

  const icons = [
    { Icon: Calendar, delay: "0s" },
    { Icon: Users, delay: "0.3s" },
    { Icon: MapPin, delay: "0.6s" },
    { Icon: Sparkles, delay: "0.9s" },
    { Icon: Camera, delay: "1.2s" },
    { Icon: Music, delay: "1.5s" },
  ];

  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden transition-colors duration-700 ${bgStyle}`}
    >
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div
          className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)] blur-3xl"
          style={{ animation: "breathe 4s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-[var(--brand-teal)] to-[var(--brand-pink)] blur-3xl"
          style={{
            animation: "breathe 4s ease-in-out infinite",
            animationDelay: "2s",
          }}
        />
      </div>

      {/* Floating icons and center animation */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="text-center space-y-8">
          <div className="relative h-48 w-48 mx-auto">
            {icons.map(({ Icon, delay }, index) => (
              <div
                key={index}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  animation: "float 3.5s ease-in-out infinite",
                  animationDelay: delay,
                  transform: `rotate(${index * 60}deg) translateY(-60px)`,
                }}
              >
                <div
                  className={`h-12 w-12 rounded-xl shadow-lg flex items-center justify-center border border-border ${
                    theme === "light"
                      ? "bg-white"
                      : "bg-gray-900 border-gray-700"
                  }`}
                  style={{
                    transform: `rotate(-${index * 60}deg)`,
                    animation: "iconPulse 3s ease-in-out infinite",
                    animationDelay: delay,
                  }}
                >
                  <Icon
                    className={`h-6 w-6 ${
                      theme === "light"
                        ? "text-[var(--brand-pink)]"
                        : "text-[var(--brand-teal)]"
                    }`}
                  />
                </div>
              </div>
            ))}

            {/* Center sparkle core */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="relative h-20 w-20 rounded-2xl flex items-center justify-center overflow-hidden group"
                style={{
                  background:
                    "linear-gradient(135deg, var(--brand-pink), var(--brand-purple), var(--brand-teal))",
                  backgroundSize: "200% 200%",
                  animation:
                    "gradient-shift 5s ease infinite, breatheScale 4s ease-in-out infinite",
                  boxShadow:
                    "0 0 40px rgba(217, 77, 216, 0.4), 0 0 80px rgba(39, 226, 214, 0.3)",
                }}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                  style={{
                    animation: "shimmer 3.5s ease-in-out infinite",
                  }}
                />
                <Sparkles
                  className="h-10 w-10 text-white relative z-10"
                  style={{
                    animation:
                      "iconPulse 3s ease-in-out infinite, spin 12s linear infinite",
                    filter:
                      "drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Text + subtle fade */}
          <div
            className="space-y-3"
            style={{ animation: "fadeInOut 4s ease-in-out infinite" }}
          >
            <h2 className="text-3xl bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)] bg-clip-text text-transparent">
              Building your event plan...
            </h2>
            <p
              className={`${
                theme === "light"
                  ? "text-gray-600"
                  : "text-gray-400"
              }`}
            >
              Our Happinest AI is analyzing your requirements and preparing a
              personalized setup
            </p>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full ${
                  theme === "light"
                    ? "bg-[var(--brand-teal)]"
                    : "bg-[var(--brand-pink)]"
                }`}
                style={{
                  animation: "slowBounce 1.8s ease-in-out infinite",
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes breathe {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        @keyframes breatheScale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes iconPulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes slowBounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-8px); opacity: 1; }
        }
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

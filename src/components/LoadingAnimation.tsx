// import { Calendar, Users, MapPin, Sparkles, Camera, Music } from 'lucide-react';

// export function LoadingAnimation() {
//   const icons = [
//     { Icon: Calendar, delay: '0s' },
//     { Icon: Users, delay: '0.3s' },
//     { Icon: MapPin, delay: '0.6s' },
//     { Icon: Sparkles, delay: '0.9s' },
//     { Icon: Camera, delay: '1.2s' },
//     { Icon: Music, delay: '1.5s' },
//   ];

//   return (
//     <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[var(--gradient-bg-from)] via-[var(--gradient-bg-via)] to-[var(--gradient-bg-to)]">
//       {/* Animated gradient background - slower breathing */}
//       <div className="absolute inset-0 opacity-30 dark:opacity-20">
//         <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)] blur-3xl"
//           style={{
//             animation: 'breathe 4s ease-in-out infinite'
//           }}
//         />
//         <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-[var(--brand-teal)] to-[var(--brand-pink)] blur-3xl"
//           style={{
//             animation: 'breathe 4s ease-in-out infinite',
//             animationDelay: '2s'
//           }}
//         />
//       </div>

//       {/* Content */}
//       <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
//         <div className="text-center space-y-8">
//           {/* Floating icons */}
//           <div className="relative h-48 w-48 mx-auto">
//             {icons.map(({ Icon, delay }, index) => (
//               <div
//                 key={index}
//                 className="absolute inset-0 flex items-center justify-center"
//                 style={{
//                   animation: 'float 3.5s ease-in-out infinite',
//                   animationDelay: delay,
//                   transform: `rotate(${index * 60}deg) translateY(-60px)`,
//                 }}
//               >
//                 <div
//                   className="h-12 w-12 rounded-xl bg-card shadow-lg flex items-center justify-center border border-border"
//                   style={{
//                     transform: `rotate(-${index * 60}deg)`,
//                     animation: 'iconPulse 3s ease-in-out infinite',
//                     animationDelay: delay
//                   }}
//                 >
//                   <Icon className="h-6 w-6 text-[var(--brand-pink)]" />
//                 </div>
//               </div>
//             ))}
            
//             {/* Center sparkle - enhanced multi-layer animation */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               {/* Outer rotating ring - slowest */}
//               <div className="absolute h-32 w-32 rounded-full border-4 border-transparent bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)] bg-clip-border opacity-30"
//                 style={{
//                   animation: 'spin 8s linear infinite',
//                   maskImage: 'linear-gradient(transparent 0%, black 50%, transparent 100%)',
//                   WebkitMaskImage: 'linear-gradient(transparent 0%, black 50%, transparent 100%)'
//                 }}
//               />
              
//               {/* Middle pulsing glow - slow breathe */}
//               <div className="absolute h-28 w-28 rounded-full bg-gradient-to-r from-[var(--brand-pink)]/20 to-[var(--brand-teal)]/20 blur-xl"
//                 style={{
//                   animation: 'breathe 3s ease-in-out infinite'
//                 }}
//               />
              
//               {/* Secondary rotating ring */}
//               <div className="absolute h-26 w-26 rounded-full"
//                 style={{
//                   background: 'conic-gradient(from 0deg, transparent 0%, var(--brand-pink) 25%, transparent 50%, var(--brand-teal) 75%, transparent 100%)',
//                   animation: 'spin 6s linear infinite',
//                   opacity: 0.3,
//                   filter: 'blur(4px)'
//                 }}
//               />
              
//               {/* Inner rotating gradient ring - reverse slower */}
//               <div className="absolute h-24 w-24 rounded-full"
//                 style={{
//                   background: 'conic-gradient(from 0deg, var(--brand-pink), var(--brand-purple), var(--brand-teal), var(--brand-pink))',
//                   animation: 'spin 7s linear infinite reverse',
//                   opacity: 0.4,
//                   filter: 'blur(8px)'
//                 }}
//               />
              
//               {/* Core animated box with breathing effect */}
//               <div className="relative h-20 w-20 rounded-2xl flex items-center justify-center overflow-hidden group"
//                 style={{
//                   background: 'linear-gradient(135deg, var(--brand-pink), var(--brand-purple), var(--brand-teal))',
//                   backgroundSize: '200% 200%',
//                   animation: 'gradient-shift 5s ease infinite, breatheScale 4s ease-in-out infinite',
//                   boxShadow: '0 0 40px rgba(217, 77, 216, 0.4), 0 0 80px rgba(39, 226, 214, 0.3)'
//                 }}
//               >
//                 {/* Shimmer effect overlay - slower sweep */}
//                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
//                   style={{
//                     animation: 'shimmer 3.5s ease-in-out infinite'
//                   }}
//                 />
                
//                 {/* Icon with independent animation - slower spin */}
//                 <Sparkles 
//                   className="h-10 w-10 text-white relative z-10"
//                   style={{
//                     animation: 'iconPulse 3s ease-in-out infinite, spin 12s linear infinite',
//                     filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))'
//                   }}
//                 />
//               </div>
              
//               {/* Orbiting particles - slower, more elegant */}
//               <div className="absolute h-2 w-2 rounded-full bg-[var(--brand-pink)]"
//                 style={{
//                   animation: 'orbit 7s linear infinite',
//                   transformOrigin: '0 0',
//                   top: '50%',
//                   left: '50%',
//                   filter: 'blur(1px)'
//                 }}
//               />
//               <div className="absolute h-2 w-2 rounded-full bg-[var(--brand-teal)]"
//                 style={{
//                   animation: 'orbit 7s linear infinite',
//                   animationDelay: '3.5s',
//                   transformOrigin: '0 0',
//                   top: '50%',
//                   left: '50%',
//                   filter: 'blur(1px)'
//                 }}
//               />
//               <div className="absolute h-1.5 w-1.5 rounded-full bg-[var(--brand-purple)]"
//                 style={{
//                   animation: 'orbit 5.5s linear infinite',
//                   animationDelay: '2s',
//                   transformOrigin: '0 0',
//                   top: '50%',
//                   left: '50%',
//                   filter: 'blur(1px)'
//                 }}
//               />
//               <div className="absolute h-1.5 w-1.5 rounded-full bg-[var(--brand-pink)]"
//                 style={{
//                   animation: 'orbit 5.5s linear infinite',
//                   animationDelay: '4.5s',
//                   transformOrigin: '0 0',
//                   top: '50%',
//                   left: '50%',
//                   filter: 'blur(1px)',
//                   opacity: 0.7
//                 }}
//               />
//             </div>
//           </div>

//           {/* Loading text with subtle animation */}
//           <div className="space-y-3"
//             style={{
//               animation: 'fadeInOut 4s ease-in-out infinite'
//             }}
//           >
//             <h2 className="text-3xl bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)] bg-clip-text text-transparent">
//               Building your event plan...
//             </h2>
//             <p className="text-muted-foreground">
//               Our Happinest AI is analyzing your requirements and creating a personalized setup
//             </p>
//           </div>

//           {/* Progress dots - slower bounce */}
//           <div className="flex justify-center gap-2">
//             {[0, 1, 2].map((i) => (
//               <div
//                 key={i}
//                 className="h-2 w-2 rounded-full bg-[var(--brand-teal)]"
//                 style={{
//                   animation: 'slowBounce 1.8s ease-in-out infinite',
//                   animationDelay: `${i * 0.3}s`
//                 }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @keyframes float {
//           0%, 100% {
//             transform: translateY(0px);
//           }
//           50% {
//             transform: translateY(-12px);
//           }
//         }
        
//         @keyframes breathe {
//           0%, 100% {
//             opacity: 0.3;
//             transform: scale(1);
//           }
//           50% {
//             opacity: 0.5;
//             transform: scale(1.1);
//           }
//         }
        
//         @keyframes breatheScale {
//           0%, 100% {
//             transform: scale(1);
//           }
//           50% {
//             transform: scale(1.05);
//           }
//         }
        
//         @keyframes iconPulse {
//           0%, 100% {
//             opacity: 0.8;
//             transform: scale(1);
//           }
//           50% {
//             opacity: 1;
//             transform: scale(1.1);
//           }
//         }
        
//         @keyframes slowBounce {
//           0%, 100% {
//             transform: translateY(0);
//             opacity: 0.5;
//           }
//           50% {
//             transform: translateY(-8px);
//             opacity: 1;
//           }
//         }
        
//         @keyframes fadeInOut {
//           0%, 100% {
//             opacity: 0.8;
//           }
//           50% {
//             opacity: 1;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }
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

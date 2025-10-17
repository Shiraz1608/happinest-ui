// "use client";
// import { useEffect } from "react";
// import { FaCheck, FaExclamation, FaTimes } from "react-icons/fa";

// export default function Toast({
//   message,
//   type,
//   onClose,
// }: {
//   message: string;
//   type: "success" | "error" | "warning";
//   onClose: () => void;
// }) {
//   useEffect(() => {
//     const timer = setTimeout(() => onClose(), 3000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   // Choose styles based on type
//   const getColors = () => {
//     switch (type) {
//       case "success":
//         return {
//           border: "border-green-500",
//           bg: "bg-green-50",
//           iconBg: "bg-green-500",
//           icon: <FaCheck className="text-white h-3.5 w-3.5" />,
//         };
//       case "error":
//         return {
//           border: "border-red-500",
//           bg: "bg-red-50",
//           iconBg: "bg-red-500",
//           icon: <FaTimes className="text-white h-3.5 w-3.5" />,
//         };
//       case "warning":
//         return {
//           border: "border-yellow-500",
//           bg: "bg-yellow-50",
//           iconBg: "bg-yellow-500",
//           icon: <FaExclamation className="text-white h-3.5 w-3.5" />,
//         };
//       default:
//         return {
//           border: "border-gray-300",
//           bg: "bg-white",
//           iconBg: "bg-black",
//           icon: <FaExclamation className="text-white h-3.5 w-3.5" />,
//         };
//     }
//   };

//   const { border, bg, iconBg, icon } = getColors();

//   return (
//     <div
//       className={`fixed bottom-6 right-6 flex items-center gap-3 px-5 py-3 
//                   rounded-lg shadow-lg border-l-4 ${border} ${bg} 
//                   animate-slide-up z-50`}
//     >
//       <div className={`flex items-center justify-center h-7 w-7 rounded-full ${iconBg}`}>
//         {icon}
//       </div>
//       <p className="text-sm font-medium text-gray-800">{message}</p>
//       <button
//         onClick={onClose}
//         aria-label="Close toast"
//         className="ml-2 p-1 hover:bg-gray-100 rounded-full transition"
//       >
//         <FaTimes className="h-4 w-4 text-gray-600" />
//       </button>
//     </div>
//   );
// }
"use client";
import { useEffect } from "react";
import { FaCheck, FaExclamation, FaTimes } from "react-icons/fa";
import { useTheme } from "@/app/providers/ThemeProvider";

export default function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error" | "warning";
  onClose: () => void;
}) {
  const { theme } = useTheme(); // get current theme

  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  // Dynamic color and icon setup
  const getStyles = () => {
    const isLight = theme === "light";

    switch (type) {
      case "success":
        return {
          border: `border-2 ${isLight ? "border-green-500" : "border-green-400"}`,
          bg: isLight ? "bg-white" : "bg-gray-800",
          text: isLight ? "text-gray-800" : "text-gray-200",
          icon: <FaCheck className={`${isLight ? "text-green-500" : "text-green-400"} h-4 w-4`} />,
        };
      case "error":
        return {
          border: `border-2 ${isLight ? "border-red-500" : "border-red-400"}`,
          bg: isLight ? "bg-white" : "bg-gray-800",
          text: isLight ? "text-gray-800" : "text-gray-200",
          icon: <FaTimes className={`${isLight ? "text-red-500" : "text-red-400"} h-4 w-4`} />,
        };
      case "warning":
        return {
          border: `border-2 ${isLight ? "border-yellow-500" : "border-yellow-400"}`,
          bg: isLight ? "bg-white" : "bg-gray-800",
          text: isLight ? "text-gray-800" : "text-gray-200",
          icon: <FaExclamation className={`${isLight ? "text-yellow-500" : "text-yellow-400"} h-4 w-4`} />,
        };
      default:
        return {
          border: `border-2 ${isLight ? "border-gray-400" : "border-gray-600"}`,
          bg: isLight ? "bg-white" : "bg-gray-800",
          text: isLight ? "text-gray-800" : "text-gray-200",
          icon: <FaExclamation className={`${isLight ? "text-gray-500" : "text-gray-400"} h-4 w-4`} />,
        };
    }
  };

  const { border, bg, text, icon } = getStyles();

  return (
    <div
      className={`fixed bottom-6 right-6 flex items-center gap-3 px-5 py-3 
                  rounded-md shadow-lg animate-slide-up z-50 ${border} ${bg}`}
    >
      {icon}
      <p className={`text-sm font-medium ${text}`}>{message}</p>
      <button
        onClick={onClose}
        aria-label="Close toast"
        className={`ml-2 p-1 rounded-full transition hover:${theme === "light" ? "bg-gray-100" : "bg-gray-700"}`}
      >
        <FaTimes className={`${theme === "light" ? "text-gray-500" : "text-gray-300"} h-4 w-4`} />
      </button>
    </div>
  );
}

"use client";
import { Settings, LogOut } from "lucide-react";

interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

export default function UserDropdown({ isOpen, setIsOpen }: Props) {
  if (!isOpen) return null;

  return (
   <div
             className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg py-1 z-50 animate-in fade-in-0 zoom-in-95"
           >
             {/* Profile Info */}
             <div className="px-4 py-2">
               <p className="text-sm font-medium text-gray-900 dark:text-white">
                 Event Organizer
               </p>
               <p className="text-xs text-gray-500 dark:text-gray-400">
                 organizer@happinest.com
               </p>
             </div>
   
             <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
   
             {/* Update Profile */}
             <button
               onClick={() => console.log("Update Profile")}
               className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-all"
             >
               <Settings className="h-4 w-4 text-gray-500" />
               Update Profile
             </button>
   
             <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
   
             {/* Logout */}
             <button
               onClick={() => console.log("Logout")}
               className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
             >
               <LogOut className="h-4 w-4 text-red-600" />
               Logout
             </button>
           </div>
  );
}

import { Calendar, MapPin, Users } from "lucide-react";
import { useTheme } from "@/app/providers/ThemeProvider";
import { useEventData } from "@/app/hook/useEventData";

export default function GEventCard() {
  const { theme } = useTheme();
  const { eventData, activeModuleCount, settings } = useEventData();

  if (!eventData) return null;

  // Extract event data safely
  const title = eventData?.title || "Untitled Event";
  const tagline = eventData?.tagline || "Your event tagline goes here";
  const eventType = eventData?.eventType
    ? eventData.eventType.charAt(0).toUpperCase() + eventData.eventType.slice(1)
    : "Event";
  const eventTheme = eventData?.eventTheme || "General";

  const venueName = eventData?.venue?.name?.trim();
  const venueCity = eventData?.venue?.city || "";
  const venueCountry = eventData?.venue?.country || "";
  const expectedGuests = eventData?.expectedGuests || "N/A";
  const startDate = eventData?.startDate || "Date TBD";
  const startTime = eventData?.startTime || null;

  // 🎭 Emoji / Icon based on theme/type
  const cardEmoji =
    eventTheme === "Diwali"
      ? "🪔"
      : eventType === "Mela"
      ? "🎪"
      : eventType === "Conference"
      ? "🏛️"
      : "✨";

  // 🎨 Theme handling
  const isLight = theme === "light";
  const borderClass = isLight
    ? "border-gray-200 bg-white"
    : "border-neutral-700 bg-neutral-900";
  const textMuted = isLight ? "text-gray-500" : "text-gray-400";
  const badgeBg = isLight ? "bg-gray-200" : "bg-neutral-800";

  // 🧾 Venue display text
  const venueText =
    venueName && venueCity
      ? `${venueName}, ${venueCity}`
      : venueCity
      ? `${venueCity}${venueCountry ? `, ${venueCountry}` : ""}`
      : "Venue to be announced";

  return (
    <div
      className={`flex flex-col gap-6 rounded-xl border ${borderClass} transition-all shadow-sm hover:shadow-md`}
    >
      <div className="p-4 sm:p-6">
        <div className="flex items-start gap-4">
          {/* Left Icon Box */}
          <div
            className="h-14 w-14 sm:h-16 sm:w-16 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,245,247,1), rgba(209,72,144,0.9))",
            }}
          >
            {cardEmoji}
          </div>

          {/* Right Info Section */}
          <div className="flex-1 min-w-0">
            {/* Event Type Badge */}
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`inline-flex items-center justify-center rounded-md px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 text-xs ${badgeBg}`}
              >
                {eventType}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-lg sm:text-xl font-semibold mb-1 truncate">
              {title}
            </h1>

            {/* Tagline */}
            <p className={`text-sm ${textMuted} line-clamp-2`}>
              {tagline}
            </p>

            {/* Event Details */}
            <div className="flex flex-wrap gap-3 sm:gap-4 text-sm mt-3">
              {/* Date */}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className={`text-xs sm:text-sm ${textMuted}`}>
                  {startDate === "Date TBD"
                    ? "Date to be announced"
                    : `on ${startDate}`}
                </span>
              </div>

              {/* Venue */}
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span
                  className={`text-xs sm:text-sm truncate max-w-[150px] ${textMuted}`}
                  title={venueText}
                >
                  {venueText}
                </span>
              </div>

              {/* Guests */}
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <span className={`text-xs sm:text-sm ${textMuted}`}>
                  <strong>{expectedGuests}</strong> guests
                </span>
              </div>
            </div>

            {/* Active Modules */}
            {activeModuleCount > 0 && (
              <div className={`mt-4 text-xs ${textMuted}`}>
                <span className="font-medium">{activeModuleCount}</span>{" "}
                active modules configured
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

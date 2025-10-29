import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { useTheme } from '@/app/providers/ThemeProvider';
interface OverviewTabData {
  data: any; // You can replace 'any' later with a proper type when you know the structure
  settingdata: any;
  eventModules:any;
}
export default function OverviewTab({ data, settingdata, eventModules }: OverviewTabData) {
  const { theme } = useTheme();

  return (
    <div className="flex-1 outline-none space-y-4 mt-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Event Details Card */}
        <div className={`bg-card text-card-foreground flex flex-col gap-6 rounded-xl border ${theme === "dark" ? "border-neutral-700 bg-black" : " bg-white border-gray-300"}`}>
          <div className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 pb-3">
            <h4 className="text-base">Event Details</h4>
            <p className="text-muted-foreground text-xs text-gray-400">Key information about your event</p>
          </div>
          <div className="px-6 [&:last-child]:pb-6 space-y-3">
  {/* Date & Time */}
  <div className="flex items-start gap-3">
    <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center flex-shrink-0">
      <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
    </div>
    <div>
      <p className="text-xs text-gray-400 mb-0.5">Date & Time</p>
      <p className="font-medium text-sm">on {data?.startDate}</p>
      <p className="text-xs text-gray-400">{data?.startTime} onwards</p>
    </div>
  </div>

  {/* Venue */}
  <div className="flex items-start gap-3">
    <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center flex-shrink-0">
      <MapPin className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
    </div>
    <div>
      <p className="text-xs text-gray-400 mb-0.5">Venue</p>
      <p className="font-medium text-sm">{data?.venue?.name}</p>
      <p className="text-xs text-gray-400">{data?.venue?.city}</p>
    </div>
  </div>

  {/* Expected Guests */}
  <div className="flex items-start gap-3">
    <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-950 flex items-center justify-center flex-shrink-0">
      <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
    </div>
    <div>
      <p className="text-xs text-gray-400 mb-0.5">Expected Guests</p>
      <p className="font-medium text-lg">{data?.expectedGuests}</p>
    </div>
  </div>
</div>

        </div>

        {/* Configuration Card */}
        <div
      className={`bg-card text-card-foreground flex flex-col gap-6 rounded-xl border ${
        theme === "dark"
          ? "bg-black border-neutral-700"
          : "bg-white border-gray-300"
      }`}
    >
      {/* Header */}
      <div className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 pb-3">
        <h4 className="text-base font-semibold">Configuration</h4>
        <p className="text-muted-foreground text-xs text-gray-400">
          Current settings summary
        </p>
      </div>

      {/* Body */}
      <div className="px-6 [&:last-child]:pb-6 space-y-2.5">
        {/* Active Modules */}
        <div
          className={`flex items-center justify-between py-2 border-b ${
            theme === "light" ? "border-gray-300" : "border-neutral-800"
          }`}
        >
          <span className="text-sm text-muted-foreground text-gray-400">
            Active Modules
          </span>
          <span
            className={`inline-flex items-center justify-center rounded-md px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 text-xs ${
              theme === "light" ? "bg-gray-200" : "bg-neutral-800"
            }`}
          >
            {eventModules?.activeModuleCount}
          </span>
        </div>

        {/* Theme */}
        <div
          className={`flex items-center justify-between py-2 border-b ${
            theme === "light" ? "border-gray-300" : "border-neutral-800"
          }`}
        >
          <span className="text-sm text-muted-foreground text-gray-400">
            Theme
          </span>
          <span className="text-sm font-medium capitalize truncate max-w-[150px]">
            {data?.eventTheme}
          </span>
        </div>

        {/* Visibility */}
        <div
          className={`flex items-center justify-between py-2 border-b ${
            theme === "light" ? "border-gray-300" : "border-neutral-800"
          }`}
        >
          <span className="text-sm text-muted-foreground text-gray-400">
            Visibility
          </span>
          <span
            className={`inline-flex items-center justify-center rounded-md border px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 text-xs ${
              theme === "light"
                ? "border-gray-300 text-gray-700"
                : "border-neutral-700 text-gray-300"
            }`}
          >
            {settingdata?.visibility}
          </span>
        </div>

        {/* Join Mode */}
        <div
          className={`flex items-center justify-between py-2 border-b ${
            theme === "light" ? "border-gray-300" : "border-neutral-800"
          }`}
        >
          <span className="text-sm text-muted-foreground text-gray-400">
            Join Mode
          </span>
          <span className="text-sm font-medium">{settingdata?.joinMode}</span>
        </div>

        {/* Moderation */}
      <div className="flex items-center justify-between py-2">
  <span className="text-sm text-muted-foreground text-gray-400">
    Moderation
  </span>
  <span
    className={`inline-flex items-center justify-center rounded-md px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 text-xs ${
      theme === "light" ? "bg-gray-200" : "bg-neutral-800"
    }`}
  >
    {settingdata?.moderation ? "On" : "Off"}
  </span>
</div>

      </div>
    </div>
      </div>

      {/* Get Started Card */}
      <div className={`bg-card text-card-foreground flex flex-col gap-6 rounded-xl border ${theme === "light" ? "border-gray-300 bg-white" : "border-neutral-700 bg-black"}`}>
        <div className="[&:last-child]:pb-6 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-medium mb-1">Ready to configure?</p>
              <p className="text-sm text-muted-foreground text-gray-400">Use the tabs to customize modules, theme, and settings</p>
            </div>
            <button className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 border text-foreground hover:bg-accent hover:text-accent-foreground  h-9 px-4 py-2 gap-2 w-full sm:w-auto ${theme === "light" ? "border-gray-300   bg-background" : "border-neutral-700 bg-neutral-950 border-input hover:bg-input/50 "}`}>
              Get Started
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
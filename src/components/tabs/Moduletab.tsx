"use client";
import { useState, useMemo, useEffect } from "react";
import {
  Sparkles,
  Settings,
  Clock,
  DollarSign,
  Building2,
  CircleCheck,
  X,
  Check,
  Users,
  Lock,
} from "lucide-react";
import { Switch } from "@/components/switch";
import { useTheme } from "@/app/providers/ThemeProvider";

interface Module {
  name: string;
  desc: string;
  ai: boolean;
  required: boolean;
  enabled: boolean;
}

interface ActivityItem {
  startTime: string;
  durationMinutes: number;
  title: string;
}

interface DayActivities {
  date: string;
  day: number;
  items: ActivityItem[];
}

interface FormattedActivity {
  time: string;
  duration: string;
  activity: string;
  originalIndex: number;
}

// Define proper types for API props
interface BudgetCategory {
  name: string;
  amount: number;
  percent: number;
}

interface Budget {
  currency: string;
  total: number;
  categories: BudgetCategory[];
}

interface EventBudget extends Budget {}

interface EventVenue {
  name?: string;
  capacity?: string | number;
  capacityMin?: number;
  capacityMax?: number;
  style?: string;
}

interface EventModules {
  venue?: boolean;
  vendors?: boolean;
  guest?: boolean;
  schedule?: boolean;
  logistics?: boolean;
  budget?: boolean;
  gallery?: boolean;
  happiVids?: boolean;
  analytics?: boolean;
  approval?: boolean;
}

export default function ModulesTab({
  eventActivities,
  eventBudget,
  eventVenues,
  eventModules,
}: {
  eventActivities: DayActivities[];
  eventBudget?: EventBudget;
  eventVenues?: EventVenue[];
  eventModules?: EventModules;
}) {
  const { theme } = useTheme();
  const [modules, setModules] = useState<Module[]>([
    { name: "Venue", desc: "Manage ceremony, cocktail, and reception locations", ai: true, required: false, enabled: false },
    { name: "Vendors", desc: "Track catering, décor, photography, and entertainment", ai: false, required: false, enabled: false },
    { name: "Guests", desc: "RSVP management and accommodation tracking", ai: false, required: true, enabled: true },
    { name: "Schedule", desc: "Coordinate ceremonies, traditions, and festivities", ai: true, required: false, enabled: false },
    { name: "Logistics", desc: "Setup coordination, permits, and transportation", ai: false, required: false, enabled: false },
    { name: "Budget", desc: "Track wedding expenses across multiple vendors and categories", ai: true, required: false, enabled: false },
    { name: "Gallery", desc: "Share professional photos and guest uploads", ai: false, required: true, enabled: true },
    { name: "HappiVid", desc: "Create cinematic wedding highlight videos", ai: false, required: true, enabled: true },
    { name: "Analytics", desc: "Track RSVPs, attendance, and engagement", ai: false, required: false, enabled: false },
    { name: "Approval", desc: "Workflow approvals for event setup and changes", ai: false, required: false, enabled: false },
  ]);

  // Initialize module enabled states from API eventModules
  useEffect(() => {
    if (!eventModules) return;
    setModules((prev) =>
      prev.map((m) => {
        const keyMap: Record<string, string> = {
          Venue: "venue",
          Vendors: "vendors",
          Guests: "guest",
          Schedule: "schedule",
          Logistics: "logistics",
          Budget: "budget",
          Gallery: "gallery",
          HappiVid: "happiVids",
          Analytics: "analytics",
          Approval: "approval",
        };
        const apiKey = keyMap[m.name];
        const enabledFromApi = apiKey ? !!(eventModules as any)[apiKey] : m.enabled;
        return { ...m, enabled: m.required ? true : enabledFromApi };
      })
    );
  }, [eventModules]);

  const [isScheduleActive] = useState(true);
  const [isBudgetActive] = useState(true);
  const [isVenueActive] = useState(true);
  const [selectedDay, setSelectedDay] = useState("Day 1");
  const [selectedActivities, setSelectedActivities] = useState<Set<number>>(new Set([0, 1, 2, 3, 4]));
  const [selectedBudgetItems, setSelectedBudgetItems] = useState<Set<number>>(
    new Set([0, 1, 2, 3, 4, 5, 6, 7])
  );
  const [selectedVenues, setSelectedVenues] = useState<Set<number>>(new Set([0]));

  const scheduleSuggestions = [
    { day: "Day 1", time: "10:00 AM", duration: "30 min", activity: "Mehendi Ceremony Setup" },
    { day: "Day 1", time: "11:00 AM", duration: "3 hours", activity: "Mehendi Application" },
    { day: "Day 1", time: "2:00 PM", duration: "60 min", activity: "Lunch" },
    { day: "Day 1", time: "4:00 PM", duration: "2 hours", activity: "Music & Dance" },
    { day: "Day 1", time: "7:00 PM", duration: "90 min", activity: "Dinner" },
    { day: "Day 2", time: "9:00 AM", duration: "45 min", activity: "Welcome & Breakfast" },
    { day: "Day 2", time: "11:00 AM", duration: "2 hours", activity: "Bride & Groom Photoshoot" },
    { day: "Day 2", time: "3:00 PM", duration: "90 min", activity: "Cultural Performances" },
    { day: "Day 2", time: "7:30 PM", duration: "3 hours", activity: "Reception & Dinner" },
    { day: "Day 3", time: "10:00 AM", duration: "60 min", activity: "Brunch & Goodbyes" },
    { day: "Day 3", time: "12:00 PM", duration: "120 min", activity: "Vendor Checkout" },
    { day: "Day 3", time: "4:00 PM", duration: "30 min", activity: "Closing Ceremonies" },
  ];

  const budgetSuggestions = useMemo(() => {
    const categories = eventBudget?.categories ?? [];
    const currency = eventBudget?.currency === "INR" ? "₹" : "";
    const total = eventBudget?.total ?? 0;

    return categories.map((cat) => ({
      category: cat.name,
      amount: cat.amount,
      percentage: cat.percent,
      currency,
      total,
    }));
  }, [eventBudget]);

  const venueSuggestions = useMemo(() => {
    if (Array.isArray(eventVenues) && eventVenues.length > 0) {
      return eventVenues.map((v: EventVenue) => ({
        name: v.name || "",
        capacity:
          v.capacity?.toString() ||
          (v.capacityMin && v.capacityMax ? `${v.capacityMin}-${v.capacityMax}` : ""),
        style: v.style || "",
      }));
    }
    return [
      { name: "Five Star Hotel Ballroom", capacity: "200-500", style: "Luxury & Elegant" },
      { name: "Garden Banquet Hall", capacity: "150-400", style: "Outdoor & Indoor Options" },
      { name: "Heritage Palace Venue", capacity: "300-600", style: "Royal & Traditional" },
      { name: "Resort Lawns & Poolside", capacity: "100-300", style: "Scenic & Romantic" },
    ];
  }, [eventVenues]);

  const hasActiveModules = isScheduleActive || isBudgetActive || isVenueActive;
  const activeAICount = [isScheduleActive, isBudgetActive, isVenueActive].filter(Boolean).length;

  const activitiesByDay = useMemo(() => {
    const acc: Record<string, FormattedActivity[]> = {};
    let index = 0;
    eventActivities.forEach((dayItem: DayActivities, dayIdx: number) => {
      const dayKey = `Day ${dayIdx + 1}`;
      acc[dayKey] = dayItem.items.map((activity: ActivityItem) => {
        const formattedActivity: FormattedActivity = {
          time: activity.startTime,
          duration: `${activity.durationMinutes} min`,
          activity: activity.title,
          originalIndex: index++,
        };
        return formattedActivity;
      });
    });
    return acc;
  }, [eventActivities]);

  const days = Object.keys(activitiesByDay).sort();
  const currentDayActivities = activitiesByDay[selectedDay] || [];
  const selectedInDay = currentDayActivities.filter((item: FormattedActivity) =>
    selectedActivities.has(item.originalIndex)
  ).length;

  const selectedBudgetTotal = budgetSuggestions
    .filter((_: unknown, i: number) => selectedBudgetItems.has(i))
    .reduce((sum: number, item: { amount: number }) => sum + item.amount, 0);

  const toggleModule = (index: number) => {
    if (modules[index].required) return;
    setModules((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], enabled: !updated[index].enabled };
      return updated;
    });
  };

  const toggleActivity = (idx: number) => {
    const s = new Set(selectedActivities);
    s.has(idx) ? s.delete(idx) : s.add(idx);
    setSelectedActivities(s);
  };

  const selectAllInDay = () => {
    const s = new Set(selectedActivities);
    currentDayActivities.forEach((i: FormattedActivity) => s.add(i.originalIndex));
    setSelectedActivities(s);
  };

  const clearDay = () => {
    const s = new Set(selectedActivities);
    currentDayActivities.forEach((i: FormattedActivity) => s.delete(i.originalIndex));
    setSelectedActivities(s);
  };
const toggleBudgetItem = (index: number) => {
  setSelectedBudgetItems(prev => {
    const newSet = new Set(prev);
    newSet.has(index) ? newSet.delete(index) : newSet.add(index);
    return newSet;
  });
};

  const selectAllBudgetItems = () => setSelectedBudgetItems(new Set(budgetSuggestions.map((_, i) => i)));

const deselectAllBudgetItems = () => setSelectedBudgetItems(new Set());

  const toggleVenue = (idx: number) => {
    const s = new Set(selectedVenues);
    s.has(idx) ? s.delete(idx) : s.add(idx);
    setSelectedVenues(s);
  };

  const selectAllVenues = () =>
    setSelectedVenues(new Set(venueSuggestions.map((_: unknown, i: number) => i)));

  const deselectAllVenues = () => setSelectedVenues(new Set());

  const totalModules = modules.filter((m: Module) => m.name !== "Overview").length;
  const enabledCount = modules.filter((m: Module) => m.enabled || m.required).length;
  const aiEnabledCount = modules.filter((m: Module) => m.ai && (m.enabled || m.required)).length;
  const budget= sessionStorage.getItem("aiEventBudget");
  return (
    <div
      data-state="active"
      data-orientation="horizontal"
      role="tabpanel"
      aria-labelledby="radix-:r3f:-trigger-modules"
      id="radix-:r3f:-content-modules"
      tabIndex={0}
      data-slot="tabs-content"
      className="flex-1 outline-none space-y-4 mt-4"
    >
      {/* Quick Review Guide */}
      <div className="p-3 rounded-lg bg-gradient-to-r from-[var(--brand-pink)]/10 via-[var(--brand-purple)]/10 to-[var(--brand-teal)]/10 border border-[var(--brand-pink)]/20">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-purple)] flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-4 w-4 text-white" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm mb-1">Quick Review Guide</p>
            <p className="text-xs text-tracking-wide opacity-60">
              Review AI suggestions below to Enable/disable modules on the right to Done!
            </p>
          </div>
        </div>
      </div>
      {/* STEP 1: AI SUGGESTIONS */}
      <div
        data-slot="card"
        className={`text-card-foreground flex flex-col gap-6 rounded-xl border-2 ${
          hasActiveModules
            ? "border-[var(--brand-teal)] bg-gradient-to-br "
            : "border-dashed border-muted-foreground/30"
        } ${theme==="light"?" from-cyan-50 to-blue-50":"from-cyan-950/20 to-blue-950/20"}`}
      >
        <div
          data-slot="card-header"
          className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 pb-4"
        >
          <div className="flex items-start gap-4">
            <div className={`h-12 w-12 rounded-full bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-purple)]  flex items-center justify-center flex-shrink-0 shadow-lg `}>
              <Sparkles className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 data-slot="card-title" className="text-lg">
                  Step 1: Review AI Suggestions
                </h4>
                {hasActiveModules && (
                  <span className="inline-flex items-center rounded-md bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)] px-2.5 py-0.5 text-xs font-medium text-white">
                    {activeAICount} Active
                  </span>
                )}
              </div>
              <p data-slot="card-description" className="tracking-wide opacity-60 text-sm">
                {hasActiveModules
                  ? "We've pre-selected smart recommendations. Click any item to keep or reject it."
                  : "Enable Schedule, Budget, or Venue modules below to see AI-powered suggestions here"}
              </p>
            </div>
          </div>
        </div>

        <div data-slot="card-content" className="px-6 [&:last-child]:pb-6">
          {!hasActiveModules ? (
            <div className="text-center py-12">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-muted to-muted/50 mx-auto mb-4 flex items-center justify-center">
                <Sparkles className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">No AI Suggestions Yet</h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                Enable Schedule, Budget, or Venue modules in Step 2 below to see intelligent recommendations
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="inline-flex items-center gap-1 rounded-md border border-input bg-background px-2.5 py-1 text-xs font-medium text-foreground">
                  <Clock className="h-3.5 w-3.5" /> Schedule
                </span>
                <span className="inline-flex items-center gap-1 rounded-md border border-input bg-background px-2.5 py-1 text-xs font-medium text-foreground">
                  <DollarSign className="h-3.5 w-3.5" /> Budget
                </span>
                <span className="inline-flex items-center gap-1 rounded-md border border-input bg-background px-2.5 py-1 text-xs font-medium text-foreground">
                  <Building2 className="h-3.5 w-3.5" /> Venue
                </span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* ACTIVITIES */}
              {isScheduleActive && (
                <div className={`text-card-foreground flex flex-col gap-6 rounded-xl border-2 border-[var(--brand-teal)]/30 bg-gradient-to-br
                ${theme==="light"?"from-cyan-50/50 to-blue-50/50":"from-cyan-950/10 to-blue-950/10"}
                `}>
                  <div className="px-6 pt-6 pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-9 w-9 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                          <Clock className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-base">Activities</h4>
                          <p className="tracking-wide opacity-60 text-xs">14 across 3 days</p>
                        </div>
                      </div>
                    </div>
                    <div className={`flex items-center justify-between gap-3 p-2.5 rounded-lg bg-gradient-to-r  border border-[var(--brand-teal)]/15 backdrop-blur-sm
                      ${theme==="light"?" from-white/60 to-white/40":"from-white/5 to-white/[0.02]"}`}>
                      <div className="flex items-center gap-1.5">
                        {days.map((day) => (
                          <button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            className={`px-3 py-1 rounded-md text-xs transition-all ${
                              selectedDay === day
                                ? "bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)] text-white shadow-sm font-medium"
                                : "bg-transparent tracking-wide opacity-60 hover:text-foreground hover:bg-muted/50"
                            }`}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gradient-to-r from-[var(--brand-pink)]/10 to-[var(--brand-teal)]/10 border border-[var(--brand-teal)]/20">
                        <span className="text-xs font-medium bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)] bg-clip-text text-transparent">
                          {selectedInDay} / {currentDayActivities.length}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={selectAllInDay}
                        className={`inline-flex items-center justify-center whitespace-nowrap font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] border bg-background text-foreground  hover:text-accent-foreground  rounded-md px-3 flex-1 h-8 text-xs gap-2
                          ${theme==="light"?"hover:bg-accent bg-white border-gray-300":"border-neutral-800 bg-input/30 border-input hover:bg-input/50"}`}
                      >
                        <CircleCheck className="h-3.5 w-3.5" />
                        Keep Day
                      </button>
                      <button
                        onClick={clearDay}
                      //   className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 rounded-md px-3 flex-1 h-8 text-xs gap-2"
                      // >
                       className={`inline-flex items-center justify-center whitespace-nowrap font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] border bg-background text-foreground  hover:text-accent-foreground  rounded-md px-3 flex-1 h-8 text-xs gap-2
                          ${theme==="light"?"hover:bg-accent bg-white border-gray-300":"bg-input/30 border-input hover:bg-input/50  border-neutral-800"}`}
                      >
                        <X className="h-3.5 w-3.5" />
                        Clear Day
                      </button>
                    </div>
                  </div>
                  <div className="px-6 [&:last-child]:pb-6">
                    <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground/30 [&::-webkit-scrollbar-thumb]:rounded-full scrollbar-width-thin scrollbar-color-[var(--muted-foreground)/30]_[transparent]">
                      {currentDayActivities.map((item) => {
                        const selected = selectedActivities.has(item.originalIndex);
                        return (
                          <div
  key={item.originalIndex}
  onClick={() => toggleActivity(item.originalIndex)}
  className={`flex items-start gap-2 p-2 rounded-lg border cursor-pointer transition-all group
    ${selected
      ? theme === "light"
        ? "bg-white border-[var(--brand-teal)]/40 shadow-sm"
        : "bg-black/20 border-[var(--brand-teal)]/50 shadow-sm"
      : theme === "light"
        ? "bg-muted/30 border-border/50 opacity-60 hover:opacity-80"
        : "bg-muted/20 border-border/30 opacity-50 hover:opacity-70"
    }`}
>

                            <div
                              className={`h-4 w-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all mt-0.5 ${
                                selected
                                  ? "bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-purple)] border-transparent"
                                  : "border-muted-foreground/30 group-hover:border-muted-foreground/50"
                              }`}
                            >
                              {selected && <Check className="h-3 w-3 text-white" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-baseline gap-2 mb-0.5">
                                <span className={`font-medium text-xs ${selected ? "text-[var(--brand-pink)]" : "text-muted-foreground"}`}>
                                  {item.time}
                                </span>
                                <span className="text-xs tracking-wide opacity-60">•</span>
                                <span className="text-xs tracking-wide opacity-60">{item.duration}</span>
                              </div>
                              <p className={`text-sm leading-snug ${selected ? "" : "text-muted-foreground"}`}>
                                {item.activity}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

             {/* BUDGET */}
{isBudgetActive && (
  <div
    className={`text-card-foreground flex flex-col gap-6 rounded-xl border-2 border-[var(--brand-pink)]/30 bg-gradient-to-br ${
      theme === "light"
        ? "from-pink-50/50 to-purple-50/50"
        : "dark:from-pink-950/10 dark:to-purple-950/10"
    }`}
  >
    <div className="px-6 pt-6 pb-3">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-purple)] flex items-center justify-center">
            <DollarSign className="h-5 w-5 text-white" />
          </div>
          <div>
            <h4 className="text-base">Budget</h4>
            <p className="tracking-wide opacity-60 text-xs">
              {budgetSuggestions.length} categories
            </p>
          </div>
        </div>
      </div>

      <div className="p-2.5 rounded-lg bg-gradient-to-br from-[var(--brand-pink)]/10 to-[var(--brand-purple)]/10 border border-[var(--brand-pink)]/30">
        <div className="flex items-center justify-between">
          <span className="text-xs tracking-wide opacity-60">Selected Total</span>
          <span className="font-mono font-semibold text-[var(--brand-pink)]">
            ₹{selectedBudgetTotal.toLocaleString()}
          </span>
        </div>
      </div>

      <div
        className={`flex items-center justify-between p-2 rounded-lg border border-[var(--brand-pink)]/20 mt-2 ${
          theme === "light" ? "bg-white/50" : "bg-black/10"
        }`}
      >
        <span className="text-xs tracking-wide opacity-60">Selected</span>
        <span className="inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)] text-white border-0">
          <span>{selectedBudgetItems.size}</span> of <span>{budgetSuggestions.length}</span>
        </span>
      </div>

      <div className="flex items-center gap-2 mt-3">
        <button
          onClick={selectAllBudgetItems}
          className={`inline-flex items-center justify-center whitespace-nowrap font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] border bg-background text-foreground hover:text-accent-foreground rounded-md px-3 flex-1 h-8 text-xs gap-2 ${
            theme === "light"
              ? "hover:bg-accent bg-white border-gray-300"
              : "border-neutral-800 bg-input/30 border-input hover:bg-input/50"
          }`}
        >
          <CircleCheck className="h-3.5 w-3.5" />
          Keep All
        </button>
        <button
          onClick={deselectAllBudgetItems}
          className={`inline-flex items-center justify-center whitespace-nowrap font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] border bg-background text-foreground hover:text-accent-foreground rounded-md px-3 flex-1 h-8 text-xs gap-2 ${
            theme === "light"
              ? "hover:bg-accent bg-white border-gray-300"
              : "border-neutral-800 bg-input/30 border-input hover:bg-input/50"
          }`}
        >
          <X className="h-3.5 w-3.5" />
          Clear
        </button>
      </div>
    </div>

    <div className="px-6 [&:last-child]:pb-6">
      <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground/30 [&::-webkit-scrollbar-thumb]:rounded-full scrollbar-width-thin scrollbar-color-[var(--muted-foreground)/30]_[transparent]">
        {budgetSuggestions.map((item, i) => {
          const selected = selectedBudgetItems.has(i);
          return (
            <div
              key={i}
              onClick={() => toggleBudgetItem(i)}
              className={`flex items-start gap-2 p-2 rounded-lg border cursor-pointer transition-all group
                ${
                  selected
                    ? theme === "light"
                      ? "bg-white border-[var(--brand-pink)]/40 shadow-sm"
                      : "bg-black/20 border-[var(--brand-pink)]/50 shadow-sm"
                    : theme === "light"
                    ? "bg-muted/30 border-border/50 opacity-60 hover:opacity-80"
                    : "bg-muted/20 border-border/30 opacity-50 hover:opacity-70"
                }`}
            >
              <div
                className={`h-4 w-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all mt-0.5 ${
                  selected
                    ? "bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-purple)] border-transparent"
                    : "border-muted-foreground/30 group-hover:border-muted-foreground/50"
                }`}
              >
                {selected && <Check className="h-3 w-3 text-white" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm ${selected ? "" : "text-muted-foreground"}`}>
                    {item.category}
                  </span>
                  <span
                    className={`font-mono text-sm ${
                      selected ? "text-[var(--brand-pink)]" : "text-muted-foreground"
                    }`}
                  >
                    ₹{item.amount.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full  transition-all ${
                        selected
                          ? "bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)]"
                          : "bg-muted-foreground/30"
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs tracking-wide opacity-60 w-8 text-right">{item.percentage}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
)}


              {/* VENUES */}
              {isVenueActive && (
                <div className={`text-card-foreground flex flex-col gap-6 rounded-xl border-2  bg-gradient-to-br  
                ${theme==="light"?"border-purple-300 from-purple-50/50 to-violet-50/50":"border-purple-700 from-purple-950/10 to-violet-950/10"}`}>
                  <div className="px-6 pt-6 pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-9 w-9 rounded-lg bg-gradient-to-r from-purple-500 to-violet-500 flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-base">Venues</h4>
                          <p className="tracking-wide opacity-60 text-xs">4 suggested</p>
                        </div>
                      </div>
                    </div>
                    <div className={`flex items-center justify-between p-2 rounded-lg border 
                      ${theme=="light"?"bg-white/50 border-purple-300/30":"bg-black/10 border-purple-700/30"}`}>
                      <span className="text-xs tracking-wide opacity-60">Selected</span>
                      <span className="inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)] text-white border-0">
                        <span>{selectedVenues.size}</span> of <span>{venueSuggestions.length}</span>
                      </span>
                    </div>
                   <div className="flex items-center gap-2 mt-3">
  <button
    onClick={selectAllVenues}
    className={`inline-flex items-center justify-center whitespace-nowrap font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] border bg-background text-foreground hover:text-accent-foreground rounded-md px-3 flex-1 h-8 text-xs gap-2
      ${theme==="light"?"hover:bg-accent bg-white border-gray-300":"border-neutral-800 bg-input/30 border-input hover:bg-input/50"}`}
  >
    <CircleCheck className="h-3.5 w-3.5" />
    Keep All
  </button>
  <button
    onClick={deselectAllVenues}
    className={`inline-flex items-center justify-center whitespace-nowrap font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] border bg-background text-foreground hover:text-accent-foreground rounded-md px-3 flex-1 h-8 text-xs gap-2
      ${theme==="light"?"hover:bg-accent bg-white border-gray-300":"border-neutral-800 bg-input/30 border-input hover:bg-input/50"}`}
  >
    <X className="h-3.5 w-3.5" />
    Clear
  </button>
</div>

                  </div>
                  <div className="px-6 [&:last-child]:pb-6">
                    <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground/30 [&::-webkit-scrollbar-thumb]:rounded-full scrollbar-width-thin scrollbar-color-[var(--muted-foreground)/30]_[transparent]">
                      {venueSuggestions.map((venue, i) => {
                        const selected = selectedVenues.has(i);
                        return (
                          <div
  key={i}
  onClick={() => toggleVenue(i)}
  className={`flex items-start gap-2 p-2 rounded-lg border cursor-pointer transition-all group
    ${selected
      ? theme === "light"
        ? "bg-white border-purple-400/40 shadow-sm"
        : "bg-black/20 border-purple-600/40 shadow-sm"
      : "bg-muted/30 border-border/50 opacity-50 hover:opacity-70"
    }`}
>

                            <div
                              className={`h-4 w-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all mt-0.5 ${
                                selected
                                  ? "bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-purple)] border-transparent"
                                  : "border-muted-foreground/30 group-hover:border-muted-foreground/50"
                              }`}
                            >
                              {selected && <Check className="h-3 w-3 text-white" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm mb-1 leading-snug ${selected ? "" : "text-muted-foreground"}`}>
                                {venue.name}
                              </p>
                              <div className="flex items-center gap-2 flex-wrap">
                                {/* <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs ${selected ? "border-purple-400/40 dark:border-purple-600/40" : "opacity-50"}`}>
                                  <Users className="h-3 w-3" />
                                  {venue.capacity}
                                </span> */}
                                <span
  className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs transition-all
    ${selected
      ? theme === "light"
        ? "border-purple-400/40 bg-white text-foreground"
        : "border-purple-600/40 bg-black/20 text-white"
      : theme === "light"
        ? "border-border/40 opacity-60"
        : "border-border/30 opacity-50"
    }`}
>
  <Users className="h-3 w-3" />
  {venue.capacity}
</span>

                                {/* <span className={`text-xs ${selected ? "text-purple-600 dark:text-purple-400" : "text-muted-foreground"}`}>
                                  {venue.style}
                                </span> */}
                                <span
  className={`text-xs transition-all
    ${selected
      ? theme === "light"
        ? "text-purple-600"
        : "text-purple-400"
      : theme === "light"
        ? "text-muted-foreground"
        : "text-muted-foreground/80"
    }`}
>
  {venue.style}
</span>

                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

 {/* STEP 2: CONFIGURE EVENT MODULES */}
      <div className={` rounded-2xl border border-gray-200 shadow-sm ${theme==="light"?
        "bg-white":"bg-black"
      }`}>
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center shadow-md">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <h4 className={`text-lg font-semibold 
                    ${theme==="light"?"text-gray-900":"text-white"}`}>
                    Step 2: Configure Event Modules
                  </h4>
                  <span className={`inline-flex items-center rounded-full  px-3 py-1 text-xs font-medium 
                    ${theme==="light"?"bg-gray-100 text-gray-700":" bg-neutral-800 text-white"}`}>
                    {enabledCount} of {totalModules} enabled
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-400 to-amber-500 px-3 py-1 text-xs font-medium text-white shadow-sm">
                  <Sparkles className="h-3.5 w-3.5" />
                  {aiEnabledCount} with AI
                </span>
              </div>
              <p className={`text-sm   ${theme==="light"?"text-gray-600 ":"text-neutral-400 "}`}>
                Enable or disable modules for your event. Modules with AI suggestions are highlighted below.
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(() => {
              const sortedModules = [...modules]
                .filter(m => m.name !== 'Overview')
                .sort((a, b) => {
                  const order = ['Venue', 'Vendors', 'Guests', 'Schedule', 'Logistics', 'Budget', 'Gallery', 'HappiVid', 'Analytics'];
                  const indexA = order.indexOf(a.name);
                  const indexB = order.indexOf(b.name);
                  return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
                });

              const hasAISuggestions = (name: string) =>
                (name === 'Schedule' && scheduleSuggestions.length > 0) ||
                (name === 'Budget' && budgetSuggestions.length > 0) ||
                (name === 'Venue' && venueSuggestions.length > 0);

              const requiredModules = ['Guests', 'Gallery', 'HappiVid'];

              return sortedModules.map((module, idx) => {
                const hasAI = hasAISuggestions(module.name);
                const isRequired = requiredModules.includes(module.name);
                const isEnabled = module.enabled || isRequired;

                const switchClasses = `
                  ${isEnabled && hasAI
                    ? 'data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-pink-500 data-[state=checked]:to-purple-600'
                    : 'data-[state=checked]:bg-gray-400'
                  }
                  ${isRequired ? 'opacity-70 cursor-not-allowed' : ''}
                `;

                const allowCardToggle = hasAI && !isRequired;

                return (
                  <div
                    key={idx}
                    className={`
                      relative p-4 rounded-xl border transition-all duration-200
                      ${isEnabled
                     ? theme==="light"?
                         'bg-gradient-to-br from-pink-50/80 to-purple-50/80 border-[var(--brand-pink)]/30 shadow-sm hover:shadow-md':
                        "bg-gradient-to-br from-pink-950/10 via-purple-950/10 to-cyan-950/10 border-[var(--brand-pink)]/30  shadow-sm hover:shadow-md"
                        
                        : theme==="light"?'bg-gray-50  border  hover:opacity-80':
                        'bg-background'
                      }
                       
                    `}
                    onClick={(e) => {
                      const target = e.target as HTMLElement;
                      if (target.closest('[data-switch-root]') || target.closest('button')) return;
                      if (allowCardToggle) {
                        toggleModule(idx);
                      }
                    }}
                  >
                    {/* AI Badge */}
                    {hasAI && isEnabled && (
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1 rounded-full  border  border-[var(--brand-pink)]/30  px-2.5 py-1 text-xs font-medium  shadow-sm">
                          <Sparkles className="h-3 w-3" />
                          AI
                        </span>
                      </div>
                    )}

                    {/* Required Badge */}
                    {isRequired && (
                      <div className="absolute top-3 right-3">
                        <span className={`inline-flex items-center gap-1 rounded-full  px-2.5 py-1 text-xs font-medium courser-not-allowed ${theme==="light"?"bg-gray-100 text-gray-700":" bg-neutral-800 text-white"}
                          ${allowCardToggle ? 'cursor-not-allowed' : 'cursor-not-allowed'}`}>
                          <Lock className="h-3 w-3" />
                          Required
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-3 mb-2">
                      <div data-switch-root>
                        <Switch
                          checked={isEnabled}
                          onCheckedChange={(checked) => {
                            if (!isRequired) {
                              setModules(prev => {
                                const updated = [...prev];
                                updated[idx] = { ...updated[idx], enabled: checked };
                                return updated;
                              });
                            }
                          }}
                          // disabled={isRequired}
                          //  className={switchClasses}
                        />
                      </div>

                      <span className={`font-semibold text-sm ${isEnabled ? theme==="light"? 'text-gray-900': "text-white":
                        theme==="light"? 'text-gray-900':"text-white"}`}>
                        {module.name}
                      </span>
                    </div>

                    <p className={`text-xs leading-relaxed pl-11 ${isEnabled ? theme==="light"?'text-gray-600':"text-gray-400" :theme==="light"? 'text-gray-600':
                      'text-gray-400'}`}>
                      {module.desc}
                    </p>
                  </div>
                );
              });
            })()}
          </div>
        </div>



      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import {
  LayoutGrid,
  Settings,
  Palette,
  SlidersVertical,
} from 'lucide-react';
import { useTheme } from '@/app/providers/ThemeProvider';
import OverviewTab from '../tabs/Overviewtab';
import ModulesTab from '../tabs/Moduletab';
import ThemeTab from '../tabs/ThemeTab';
import SettingsTab from '../tabs/SettingsTab';
import ConfigurationComplete from '../tabs/ConfigurationComplete';

export default function TabsSection({ data, settingdata, eventModulesdata, eventActivities, eventBudget, eventVenues }: { data: any; settingdata: any; eventModulesdata: any; eventActivities: any; eventBudget?: any; eventVenues?: any[] }) {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const TabsData = data; // or however you're fetching it
  const SettingsData = settingdata;
  const Modulesdata = eventModulesdata;
  const EventActivities = eventActivities;
  const tabs = [
    { id: 'overview', label: 'Overview', icon: <LayoutGrid className="h-4 w-4" aria-hidden="true" /> },
    { 
      id: 'modules', 
      label: 'Modules', 
      icon: <Settings className="h-4 w-4" aria-hidden="true" />,
      badge: (
        <span className={`items-center justify-center rounded-md border py-0.5 font-medium w-fit whitespace-nowrap shrink-0 text-xs hidden sm:flex data-[state=active]:bg-white/20 data-[state=active]:text-white h-5 px-1.5 bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-[color,box-shadow] ${
        theme==="light"?"bg-gray-200 border-gray-200":"bg-neutral-900 border-neutral-800 text-white"}`}>
          {Modulesdata?.activeModuleCount ?? 0}
        </span>
      ),
    },
    { id: 'theme', label: 'Theme', icon: <Palette className="h-4 w-4" aria-hidden="true" /> },
    { id: 'settings', label: 'Settings', icon: <SlidersVertical className="h-4 w-4" aria-hidden="true" /> },
  ];

  return (
    <div className="flex flex-col gap-2 space-y-4">
      {/* Tab List */}
      <div
        role="tablist"
        aria-orientation="horizontal"
        className={` items-center justify-center rounded-xl grid w-full grid-cols-4 h-auto gap-2 p-1 ${theme === "light" ? "bg-gray-100 text-muted-foreground" : "bg-neutral-900 text-neutral-400"}`}
        tabIndex={0}
        style={{ outline: 'none' }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`radix-:r5q:-content-${tab.id}`}
            data-state={activeTab === tab.id ? 'active' : 'inactive'}
            className={`dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center rounded-xl border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[var(--brand-pink)] data-[state=active]:to-[var(--brand-teal)] data-[state=active]:text-white`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
            {tab.badge}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
{activeTab === 'overview' && TabsData && Modulesdata && SettingsData && (
  <OverviewTab data={TabsData} settingdata={SettingsData} eventModules={Modulesdata} />
)}
{activeTab === 'modules' && (
  <ModulesTab {...({
    eventActivities: EventActivities,
    eventBudget,
    eventVenues,
    eventModules: Modulesdata,
  } as any)} />
)}
      {activeTab === 'theme' && <ThemeTab />}
      {activeTab === 'settings' && <SettingsTab />}

      {/* Always show completion card */}
      <ConfigurationComplete />
    </div>
  );
}
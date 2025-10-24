
'use client';

import { useState } from 'react';
import {
  LayoutDashboard, MapPin, Calendar, Users, Store, Image, Truck,
  DollarSign, Shield, ChartColumn, Globe, Settings, LogOut,
  ChevronLeft, Sun, Hourglass, Circle
} from 'lucide-react';
import { Button } from './Button';


export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: MapPin, label: 'Venue Setup', badge: <Hourglass className="h-3.5 w-3.5 text-amber-500" /> },
    { icon: Calendar, label: 'Event Schedule', badge: <Circle className="h-3.5 w-3.5 text-muted-foreground" /> },
    { icon: Users, label: 'Guest Management', badge: <Circle className="h-3.5 w-3.5 text-muted-foreground" /> },
    { icon: Store, label: 'Vendor Coordination', badge: <Circle className="h-3.5 w-3.5 text-muted-foreground" /> },
    { icon: Image, label: 'Content Curation', badge: <Circle className="h-3.5 w-3.5 text-muted-foreground" /> },
    { icon: Truck, label: 'Logistics', badge: <Circle className="h-3.5 w-3.5 text-muted-foreground" /> },
    { icon: DollarSign, label: 'Budget', badge: <Circle className="h-3.5 w-3.5 text-muted-foreground" /> },
    { icon: Shield, label: 'Approval Workflow', badge: <Circle className="h-3.5 w-3.5 text-muted-foreground" /> },
    { icon: ChartColumn, label: 'Analytics', badge: <Circle className="h-3.5 w-3.5 text-muted-foreground" /> },
  ];

  return (
    <aside className={`border-r bg-card transition-all duration-300 flex flex-col ${collapsed ? 'w-16' : 'w-64'}`}>
      {/* Logo */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)] flex items-center justify-center">
            <LayoutDashboard className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <h2 className="truncate text-sm">TechVista Summit 2025</h2>
              <p className="text-xs text-muted-foreground truncate">Conference</p>
            </div>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {menuItems.map((item, i) => (
          <Button
            key={i}
            variant={item.active ? 'gradient' : 'ghost'}
            className={`w-full justify-start ${collapsed ? 'px-3' : ''}`}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge}
              </>
            )}
          </Button>
        ))}

        <div className="my-2 px-3">
          <div className="border-t border-border" />
        </div>

        <Button variant="ghost" className="w-full justify-start">
          <Globe className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span className="flex-1 text-left">Guest Site</span>}
        </Button>

        <Button variant="ghost" className="w-full justify-start">
          <Settings className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span className="flex-1 text-left">Event Settings</span>}
        </Button>
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t space-y-2">
        <Button className="w-full bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-purple)] text-white hover:opacity-90">
          <Globe className="h-4 w-4" />
          {!collapsed && <span className="ml-2">View Guest Site</span>}
        </Button>
        <Button variant="outline" className="w-full">
          <ChevronLeft className="h-4 w-4" />
          {!collapsed && <span className="ml-2">Back to Home</span>}
        </Button>
        <Button variant="destructive" className="w-full">
          <LogOut className="h-4 w-4" />
          {!collapsed && <span className="ml-2">Logout</span>}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-xs"
          onClick={() => setCollapsed(!collapsed)}
        >
          ← {collapsed ? 'Expand' : 'Collapse'}
        </Button>
      </div>
    </aside>
  );
}

'use client';

import AIInsights from "@/components/AIInsights";
import DashboardLayout from "@/components/DashboardLayout";
import EventDetails from "@/components/EventDetails";
import FloatingAIButton from "@/components/FloatingAIButton";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ModuleProgress from "@/components/ModuleProgress";
import PriorityActions from "@/components/PriorityActions";
import Sidebar from "@/components/Sidebar";



export default function DashboardPage() {
  return (
    <DashboardLayout sidebar={<Sidebar />}>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-[var(--gradient-bg-from)] via-[var(--gradient-bg-via)] to-[var(--gradient-bg-to)]">
        <HeroSection />
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
          <EventDetails />
          <PriorityActions />
          <ModuleProgress />
          <AIInsights />
        </div>
      </div>
      <FloatingAIButton />
    </DashboardLayout>
  );
}
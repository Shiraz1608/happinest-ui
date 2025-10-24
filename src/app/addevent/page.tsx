'use client';
import React, { useState } from 'react';
import Navbar from '@/components/AddEventNav';
import BackgroundEffects from '@/components/BackgroundEffects';
import EventDescription from '@/components/EventDescription';
import TemplateSelector from '@/components/TemplateSelector';
import Footer from '@/components/Footer';
import { useTheme } from '../providers/ThemeProvider';

const AddEventPage = () => {
  const [activeTab, setActiveTab] = useState('popular');
  const { theme } = useTheme();

  console.log('AddEventPage activeTab:', activeTab);

  return (
   <div
      className={`flex flex-col min-h-screen ${
        theme === "dark" ? "bg-[#060510] text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      {/* ✅ Top Navigation Bar */}
      <Navbar />

      {/* ✅ Main Content with dynamic gradient background */}
      <main
        className={`
          flex-1 pt-20 relative overflow-y-auto min-h-screen w-full transition-colors duration-500
          bg-gradient-to-br
          ${
            theme === "dark"
              ? "from-[#060510] via-[#0b0820] to-[#110c24]"
              : "from-[var(--gradient-bg-from)] via-[var(--gradient-bg-via)] to-[var(--gradient-bg-to)]"
          }
        `}
      >
        {/* Subtle floating effects */}
        <BackgroundEffects />

        {/* Main content area */}
        <section className="relative z-10 px-4 py-12 max-w-6xl mx-auto">
          <EventDescription />

          {/* Divider Section */}
          <div className="relative my-12">
            <div className="absolute inset-0 flex items-center">
              <div
                className={`w-full border-t ${
                  theme === "dark" ? "border-white/20" : "border-white/30"
                }`}
              />
            </div>
            <div className="relative flex justify-center">
              <span
                className={`
                  px-6 py-2 rounded-full text-sm backdrop-blur-sm border transition-all duration-500
                  ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-[#0f0a1c] via-[#171427] to-[#1a1a24] border-white/10 text-gray-300"
                      : "bg-gradient-to-br from-[var(--gradient-bg-from)] via-[var(--gradient-bg-via)] to-[var(--gradient-bg-to)] border-white/20 text-gray-700"
                  }
                `}
              >
                Or choose a template to get started quickly
              </span>
            </div>
          </div>

          {/* ✅ Template Tabs Section */}
          <TemplateSelector activeTab={activeTab} setActiveTab={setActiveTab} />
        </section>

        {/* ✅ Footer */}
        <Footer />
      </main>
    </div>
  );
};

export default AddEventPage;


import { useTheme } from '@/app/providers/ThemeProvider';
import { SlidersVertical } from 'lucide-react';
import { useState } from 'react';

export default function SettingsTab() {
  const { theme } = useTheme();

  // State for each button group
  const [visibility, setVisibility] = useState<'Public' | 'Private'>('Public');
  const [joinMode, setJoinMode] = useState<'RSVP' | 'Registration'>('RSVP');
  const [contentContribution, setContentContribution] = useState<'Public' | 'Guests' | 'Organizers'>('Public');
  const [contentModeration, setContentModeration] = useState<'Yes' | 'No'>('Yes');

  // Helper for button background and text color
  const getButtonClass = (isSelected: boolean) =>
    isSelected
      ? 'bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)] text-white'
      : theme === 'light'
      ? 'bg-gray-100 text-black'
      : 'bg-neutral-900 text-white';

  // Helper for radio circle border color
  const getCircleClass = (isSelected: boolean) =>
    `w-2.5 h-2.5 rounded-full border-2 flex items-center justify-center transition-colors ${
      isSelected
        ? 'border-white' // Selected = white border
        : theme === 'light'
        ? 'border-black' // Light mode = black border
        : 'border-white' // Dark mode = white border
    }`;

  return (
    <div
      data-state="active"
      data-orientation="horizontal"
      role="tabpanel"
      aria-labelledby="radix-:r3f:-trigger-settings"
      id="radix-:r3f:-content-settings"
      tabIndex={0}
      data-slot="tabs-content"
      className="flex-1 outline-none space-y-4 mt-4"
    >
      <div
        data-slot="card"
        className={`flex flex-col gap-6 rounded-xl border ${
          theme === 'light' ? 'bg-white border-gray-300' : 'bg-black border-neutral-800'
        }`}
      >
        <div
          data-slot="card-header"
          className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 pb-3"
        >
          <h4 data-slot="card-title" className="text-base flex items-center gap-2">
            <SlidersVertical className="h-5 w-5 text-purple-600 dark:text-purple-400" aria-hidden="true" />
            Event Settings
          </h4>
          <p
            data-slot="card-description"
            className={`text-muted-foreground text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}
          >
            Recommended settings pre-selected based on your event type
          </p>
        </div>

        <div data-slot="card-content" className="px-6 [&:last-child]:pb-6 space-y-5">
          {/* Visibility */}
          <div className="space-y-2">
            <p className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Visibility</p>
            <p className={`text-xs ${theme === 'light' ? 'text-neutral-300' : 'text-neutral-500'}`}>
              Control who can discover and view your event
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setVisibility('Public')}
                className={`px-3 py-1.5 rounded-full text-xs flex items-center gap-2 transition-all ${getButtonClass(
                  visibility === 'Public'
                )}`}
              >
                <div className={getCircleClass(visibility === 'Public')}>
                  {visibility === 'Public' && <div className="w-1 h-1 rounded-full bg-white" />}
                </div>
                Public
              </button>
              <button
                onClick={() => setVisibility('Private')}
                className={`px-3 py-1.5 rounded-full text-xs flex items-center gap-2 transition-all ${getButtonClass(
                  visibility === 'Private'
                )}`}
              >
                <div className={getCircleClass(visibility === 'Private')}>
                  {visibility === 'Private' && <div className="w-1 h-1 rounded-full bg-white" />}
                </div>
                Private
              </button>
            </div>
          </div>

          {/* Join Mode */}
          <div className="space-y-2">
            <p className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Join Mode</p>
            <p className={`text-xs ${theme === 'light' ? 'text-neutral-300' : 'text-neutral-500'}`}>
              How guests confirm their attendance
            </p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setJoinMode('RSVP')}
                className={`px-3 py-1.5 rounded-full text-xs flex items-center gap-2 transition-all ${getButtonClass(
                  joinMode === 'RSVP'
                )}`}
              >
                <div className={getCircleClass(joinMode === 'RSVP')}>
                  {joinMode === 'RSVP' && <div className="w-1 h-1 rounded-full bg-white" />}
                </div>
                RSVP
              </button>
              <button
                onClick={() => setJoinMode('Registration')}
                className={`px-3 py-1.5 rounded-full text-xs flex items-center gap-2 transition-all ${getButtonClass(
                  joinMode === 'Registration'
                )}`}
              >
                <div className={getCircleClass(joinMode === 'Registration')}>
                  {joinMode === 'Registration' && <div className="w-1 h-1 rounded-full bg-white" />}
                </div>
                Registration
              </button>
            </div>
          </div>

          {/* Content Contribution */}
          <div className="space-y-2">
            <p className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Content Contribution</p>
            <p className={`text-xs ${theme === 'light' ? 'text-neutral-300' : 'text-neutral-500'}`}>
              Who can upload photos and videos to the gallery
            </p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setContentContribution('Public')}
                className={`px-3 py-1.5 rounded-full text-xs flex items-center gap-2 transition-all ${getButtonClass(
                  contentContribution === 'Public'
                )}`}
              >
                <div className={getCircleClass(contentContribution === 'Public')}>
                  {contentContribution === 'Public' && <div className="w-1 h-1 rounded-full bg-white" />}
                </div>
                Public
              </button>
              <button
                onClick={() => setContentContribution('Guests')}
                className={`px-3 py-1.5 rounded-full text-xs flex items-center gap-2 transition-all ${getButtonClass(
                  contentContribution === 'Guests'
                )}`}
              >
                <div className={getCircleClass(contentContribution === 'Guests')}>
                  {contentContribution === 'Guests' && <div className="w-1 h-1 rounded-full bg-white" />}
                </div>
                Guests only
              </button>
              <button
                onClick={() => setContentContribution('Organizers')}
                className={`px-3 py-1.5 rounded-full text-xs flex items-center gap-2 transition-all ${getButtonClass(
                  contentContribution === 'Organizers'
                )}`}
              >
                <div className={getCircleClass(contentContribution === 'Organizers')}>
                  {contentContribution === 'Organizers' && <div className="w-1 h-1 rounded-full bg-white" />}
                </div>
                Organizers only
              </button>
            </div>
          </div>

          {/* Content Moderation */}
          <div className="space-y-2">
            <p className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Content Moderation</p>
            <p className={`text-xs ${theme === 'light' ? 'text-neutral-300' : 'text-neutral-500'}`}>
              Approve uploads before they appear publicly
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setContentModeration('Yes')}
                className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 transition-all ${getButtonClass(
                  contentModeration === 'Yes'
                )}`}
              >
                <div className={getCircleClass(contentModeration === 'Yes')}>
                  {contentModeration === 'Yes' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                Yes
              </button>
              <button
                onClick={() => setContentModeration('No')}
                className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 transition-all ${getButtonClass(
                  contentModeration === 'No'
                )}`}
              >
                <div className={getCircleClass(contentModeration === 'No')}>
                  {contentModeration === 'No' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

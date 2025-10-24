import React from 'react';

const BackgroundEffects = () => {
  return (
    <>
      <div className="absolute inset-0 opacity-20 dark:opacity-15">
        <div className="absolute top-1/3 left-1/3 h-96 w-96 rounded-full bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)] blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/3 right-1/3 h-96 w-96 rounded-full bg-gradient-to-r from-[var(--brand-teal)] to-[var(--brand-pink)] blur-3xl animate-pulse"
          style={{ animationDelay: '1.5s' }}
        />
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[var(--brand-pink)]/20 to-transparent animate-light-ray"
          style={{ animationDelay: '0s' }}
        />
        <div
          className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-[var(--brand-teal)]/20 to-transparent animate-light-ray"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-[var(--brand-pink)]/15 to-transparent animate-light-ray"
          style={{ animationDelay: '4s' }}
        />
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute animate-float-slow opacity-30 dark:opacity-20"
          style={{ top: '15%', left: '10%', animationDelay: '0s', animationDuration: '8s' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-heart w-6 h-6 text-[var(--brand-pink)]"
            aria-hidden="true"
          >
            <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
          </svg>
        </div>
        <div
          className="absolute animate-float-slow opacity-30 dark:opacity-20"
          style={{ top: '25%', left: '85%', animationDelay: '1s', animationDuration: '10s' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-star w-6 h-6 text-[var(--brand-pink)]"
            aria-hidden="true"
          >
            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
          </svg>
        </div>
        {/* Add other floating icons (star, music, camera, gift, cake, sparkles) as needed */}
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute animate-sparkle"
          style={{ top: '21.9863%', left: '62.5468%', animationDelay: '1.55017s', animationDuration: '4.5878s' }}
        >
          <div className="w-1 h-1 bg-[var(--brand-teal)] rounded-full" />
        </div>
        {/* Add remaining sparkles as needed */}
      </div>
    </>
  );
};

export default BackgroundEffects;
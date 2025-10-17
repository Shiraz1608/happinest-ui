"use client";
import Image from "next/image";

export default function AppDownload() {
  return (
    <div className="w-full pt-6 border-t border-gray-200 text-center">
      <p className="text-xs text-gray-500 mb-3">Download our mobile app</p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="inline-block hover:opacity-80 transition-opacity">
          <Image src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on the App Store" width={160} height={40} />
        </a>
        <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="inline-block hover:opacity-80 transition-opacity">
          <Image src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" width={160} height={40} />
        </a>
      </div>
    </div>
  );
}

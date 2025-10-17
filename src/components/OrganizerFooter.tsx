"use client";
import Image from "next/image";
export default function OrganizerFooter() {
  return (
    <footer className="border-t bg-card/50 backdrop-blur-sm mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Image src="/happinest-logo.png" alt="Happinest" width={120} height={40} />
            <p className="text-sm text-gray-500">AI-driven event planning platform that makes organizing unforgettable experiences effortless.</p>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
                      <Image
                        src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                        alt="Download on the App Store"
                        width={160}
                        height={40}
                      />
                    </a>
                    <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
                      <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                        alt="Get it on Google Play"
                        width={160}
                        height={40}
                      />
                    </a>
                  </div>
          </div>
        
          {/* Product */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-gray-900">Features</a></li>
              <li><a href="#" className="hover:text-gray-900">Templates</a></li>
              <li><a href="#" className="hover:text-gray-900">Pricing</a></li>
              <li><a href="#" className="hover:text-gray-900">Updates</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-gray-900">Documentation</a></li>
              <li><a href="#" className="hover:text-gray-900">Help Center</a></li>
              <li><a href="#" className="hover:text-gray-900">Blog</a></li>
              <li><a href="#" className="hover:text-gray-900">Community</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-gray-900">About</a></li>
              <li><a href="#" className="hover:text-gray-900">Careers</a></li>
              <li><a href="#" className="hover:text-gray-900">Privacy</a></li>
              <li><a href="#" className="hover:text-gray-900">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2025 Happinest. All rights reserved.</p>
          <p>Made with <span className="text-pink-500">❤</span> for event organizers</p>
        </div>
      </div>
    </footer>
  );
}

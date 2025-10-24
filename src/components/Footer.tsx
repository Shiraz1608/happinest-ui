import React from 'react';

const Footer = () => {
  return (
   
   <footer className="border-t border-gray-300 bg-white bg-amber-50 bg-card/50 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="h-8 w-auto">
              <img
                src="/happinest-logo.png"
                alt="Happinest"
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-muted-foreground text-gray-500">
              AI-driven event planning platform that makes organizing unforgettable experiences effortless.
            </p>
            <div className="space-y-3 pt-2">
              <p className="text-xs text-muted-foreground text-gray-500">Download our app</p>
              <div className="flex flex-col gap-2">
                <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="inline-block hover:opacity-80 transition-opacity">
                  <img
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                    alt="Download on the App Store"
                    className="h-10 w-auto"
                  />
                </a>
                <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="inline-block hover:opacity-80 transition-opacity">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Get it on Google Play"
                    className="h-10 w-auto"
                  />
                </a>
              </div>
            </div>
          </div>
          <div>
            <h4 className="mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-500 text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-500 text-sm text-muted-foreground hover:text-foreground transition-colors">Templates</a></li>
              <li><a href="#" className="text-gray-500 text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-500 text-sm text-muted-foreground hover:text-foreground transition-colors">Updates</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className=" text-gray-500 text-sm text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-500 text-sm text-muted-foreground hover:text-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-500 text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-500 text-sm text-muted-foreground hover:text-foreground transition-colors">Community</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-500 text-sm text-muted-foreground hover:text-foreground transition-colors">About</a></li>
              <li><a href="#" className="text-gray-500 text-sm text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-500 text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a></li>
              <li><a href="#" className="text-gray-500 text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-300 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-gray-500">© 2025 Happinest. All rights reserved.</p>
          <p className="text-sm text-muted-foreground text-gray-500">
            Made with <span className="text-[var(--brand-pink)]">❤</span> for event organizers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
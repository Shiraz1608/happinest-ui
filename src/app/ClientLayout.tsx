"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X, User, Settings, LogOut, Moon, Sun } from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/app/providers/ThemeProvider";
import { useSession, signOut } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayout = [
    "/login",
    "/admindashboard",
    "/admin/add-user",
    "/signup",
    "/validateotp",
    "/forgotpassword",
    "/changepassword",
  ].includes(pathname);

  const { theme, toggleTheme } = useTheme();
  const { data: session } = useSession();

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (menu: string) => setOpenMenu(openMenu === menu ? null : menu);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navMenus = [
    {
      title: "Documents",
      links: [
        { href: "/upload", label: "Upload Docs", icon: <Image src="/upload-icon.png" alt="Upload" width={16} height={16} /> },
        { href: "/manage", label: "Manage Docs", icon: <Image src="/manage-icon.png" alt="Manage" width={16} height={16} /> },
        { href: "/deleted", label: "Deleted Docs", icon: <Image src="/deleted-icon.png" alt="Deleted" width={16} height={16} /> },
      ],
    },
    {
      title: "Approvals",
      links: [
        { href: "/approvals/pending", label: "Pending Approvals", icon: <User className="w-4 h-4 text-yellow-500" /> },
        { href: "/approvals/review", label: "In-Review Docs", icon: <User className="w-4 h-4 text-blue-500" /> },
        { href: "/approvals/approved", label: "Approved Docs", icon: <User className="w-4 h-4 text-green-500" /> },
      ],
    },
    {
      title: "Settings",
      links: [
        { href: "/profile/settings", label: "Profile Settings", icon: <Settings className="w-4 h-4 text-purple-500" /> },
        { href: "/profile/preferences", label: "Preferences", icon: <Settings className="w-4 h-4 text-purple-400" /> },
      ],
    },
  ];

  return (
    <>
      {!hideLayout && (
        <header className="bg-background shadow-md sticky top-0 z-50 border-b border-border text-foreground transition-colors duration-300">
          <div className="container mx-auto flex items-center justify-between py-4 px-6">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-foreground">
                <span className="text-purple-500">Happinest</span>
              </span>
            </Link>

            {/* Right: Theme Toggle + Profile */}
            <div className="flex items-center space-x-4 relative" ref={profileRef}>
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md border border-border hover:bg-muted/20 transition"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-foreground" />}
              </button>

              {/* Welcome text */}
              <div className="hidden sm:block text-sm text-muted-foreground">
                {session?.user?.name ? `Hello, ${session.user.name}` : "Welcome!"}
              </div>

              {/* Profile Button */}
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="relative w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:ring-2 hover:ring-purple-400 transition"
              >
                <Image
                  src={session?.user?.image || `https://avatars.dicebear.com/api/initials/A.svg`}
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 top-12 w-48 bg-card border border-border rounded-lg shadow-lg py-2 z-50 text-foreground">
                  <button
                    onClick={() => signOut()}
                    className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-muted/30 hover:text-purple-400 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 rounded-md hover:bg-muted/20 text-foreground"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Nav Dropdown */}
          {mobileOpen && (
            <div className="md:hidden bg-card border-t border-border shadow-lg text-foreground">
              {navMenus.map((menu) => (
                <div key={menu.title} className="border-b border-border">
                  <button
                    onClick={() => toggleMenu(menu.title)}
                    className="w-full flex justify-between items-center px-4 py-3 font-medium hover:bg-muted/20"
                  >
                    {menu.title}
                    <ChevronDown className={`w-4 h-4 transition-transform ${openMenu === menu.title ? "rotate-180" : ""}`} />
                  </button>
                  {openMenu === menu.title && (
                    <div className="pl-6 pb-2 space-y-1">
                      {menu.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="flex items-center gap-2 text-sm py-1 hover:text-purple-400 transition"
                        >
                          {link.icon}
                          <span>{link.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </header>
      )}

      {/* Main Content */}
      <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <SessionProvider>{children}</SessionProvider>
      </main>

      {/* Footer */}
      {!hideLayout && (
        <footer className="text-center text-sm text-muted-foreground mt-12 py-4 border-t border-border">
          © {new Date().getFullYear()} <span className="text-purple-500 font-semibold">Happinest</span>. All rights reserved.
        </footer>
      )}
    </>
  );
}

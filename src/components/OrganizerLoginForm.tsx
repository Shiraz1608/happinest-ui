"use client";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast";
import { signIn, useSession } from "next-auth/react";
import { useTheme } from "@/app/providers/ThemeProvider";

export default function OrganizerLoginForm() {
  const router = useRouter();
  const { theme } = useTheme();
  const { data: session } = useSession();

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "warning" } | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    console.log("API Base URL:", process.env.NEXT_PUBLIC_API_BASE_ENDPOINT);
    localStorage.setItem("verificationFlow", "no");
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setToast(null);

    let valid = true;
    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    }
    if (!password.trim()) {
      setPasswordError("Password is required");
      valid = false;
    }
    if (!valid) return;

    setLoading(true);

    try {
      const deviceId = "123e4567-e89b-12d3-a456-426614174000";
      const payload = { email, password, deviceId, guestId: 0 };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/api/Auth/Login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data;
      try {
        const text = await res.text();
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {};
      }

      if (!res.ok) {
        setToast({
          message: data.validationMessage || `❌ Login failed: ${res.statusText}`,
          type: "warning",
        });
        setLoading(false);
        return;
      }

      if (data.responseStatus && data.token) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("happinest_user_data", JSON.stringify(data));

        const manualSession = {
          user: { name: data.fullName, email: data.email },
          token: data.token,
          type: "manual",
        };
        sessionStorage.setItem("manual_session", JSON.stringify(manualSession));

        setToast({ message: "✅ Login successful!", type: "success" });
        router.push("/eventdashboard");
      } else {
        setToast({
          message: data.validationMessage || "❌ Invalid credentials",
          type: "warning",
        });
      }
    } catch (err) {
      console.error("Login error:", err);
      setToast({
        message: "❌ Something went wrong. Please try again.",
        type: "warning",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div
       className={`relative shadow-xl rounded-2xl p-8 w-full max-w-md border overflow-hidden transition-all duration-500
  ${
    theme === "light"
      ? "border-gray-200 bg-white text-gray-800"
      : "border-gray-800 bg-gray-900/80 text-gray-100 backdrop-blur-lg"
  }`}

      >
        {/* Background Layers for Blur and Tint */}
        <div
          className={`absolute inset-0 ${
            theme === "light" ? "bg-white/90" : "bg-white/80 backdrop-blur-md"
          } -z-10`}
          aria-hidden="true"
        />
       
        {/* Logo + Heading */}
        <div className="text-center mb-8 relative z-10">
          <Image
            src="/happinest-logo.png"
            alt="Happinest"
            width={180}
            height={60}
            className="mx-auto mb-3"
          />
          <div className="flex justify-center items-center gap-2 text-gray-500 text-sm">
            <div className="h-px w-8 bg-gradient-to-r from-transparent via-gray-400/40 to-transparent" />
            <span className="text-gray-400 text-sm uppercase">Organizer Portal</span>
            <div className="h-px w-8 bg-gradient-to-r from-transparent via-gray-400/40 to-transparent" />
          </div>

          <h2
            className={`text-2xl font-semibold mt-4 ${
              theme === "light" ? "text-gray-800" : "text-white"
            }`}
          >
            Welcome Back
          </h2>
          <p className="text-gray-500 text-sm">
            Sign in to start creating amazing events
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 relative z-10">
          {/* Email */}
          <div className="space-y-2 text-left">
            <label
              htmlFor="email"
              className={`flex items-center gap-2 text-sm font-medium ${
                theme === "light" ? "text-gray-800" : "text-gray-200"
              }`}
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (e.target.value.trim()) setEmailError("");
                }}
                placeholder="you@example.com"
                className={`flex w-full rounded-md px-3 py-2 pl-10 h-12 text-base md:text-sm 
                  outline-none transition-all placeholder-gray-400 
                  ${
                    emailError
                      ? "border-red-500 focus:ring-red-500"
                      : theme === "light"
                      ? "border-gray-300 focus:ring-gray-400 focus:shadow-[0_0_8px_1px_rgba(156,163,175,0.4)]"
                      : "border-gray-700 bg-gray-800 focus:ring-gray-500 focus:shadow-[0_0_8px_1px_rgba(75,85,99,0.5)]"
                  }`}
              />
            </div>
            {emailError && <p className="text-sm text-red-500 mt-1">{emailError}</p>}
          </div>

          {/* Password */}
          <div className="space-y-2 text-left">
            <label
              htmlFor="password"
              className={`flex items-center gap-2 text-sm font-medium ${
                theme === "light" ? "text-gray-800" : "text-gray-200"
              }`}
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (e.target.value.trim()) setPasswordError("");
                }}
                placeholder="••••••••"
                className={`flex w-full rounded-md px-3 py-2 pl-10 h-12 text-base md:text-sm 
                  outline-none transition-all placeholder-gray-400 
                  ${
                    passwordError
                      ? "border-red-500 focus:ring-red-500"
                      : theme === "light"
                      ? "border-gray-300 focus:ring-gray-400 focus:shadow-[0_0_8px_1px_rgba(156,163,175,0.4)]"
                      : "border-gray-700 bg-gray-800 focus:ring-gray-500 focus:shadow-[0_0_8px_1px_rgba(75,85,99,0.5)]"
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {passwordError && <p className="text-sm text-red-500 mt-1">{passwordError}</p>}
          </div>

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded border-gray-300 dark:border-gray-600 text-pink-500 focus:ring-pink-400"
              />
              <span  className={` ${
                theme === "light" ? "text-gray-800" : "text-gray-200"
              }`}>Remember me</span>
            </label>
            <Link
              href="/forgotpassword"
              className="text-[var(--brand-pink)] hover:text-[var(--brand-purple)] transition-colors font-medium"
            >
              Forgot password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium 
              disabled:pointer-events-none disabled:opacity-50 
              outline-none focus-visible:ring-[3px] focus-visible:ring-gray-300 
              hover:opacity-90 shadow-sm px-4 py-2 w-full h-12 
              bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-purple)] 
              hover:shadow-xl hover:scale-105 transition-all duration-200 text-white"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Separator */}
        <div className="flex items-center my-6 relative z-10">
  <hr className={`flex-grow ${theme === "light" ? "border-gray-300" : "border-gray-800"}`} />
          <span className="px-2 text-gray-400 text-sm">OR</span>
  <hr className={`flex-grow ${theme === "light" ? "border-gray-300" : "border-gray-800"}`} />
        </div>

        {/* Google Login */}
         {/* Social Buttons */}
<div className="w-full space-y-3">
  {/* Google Button */}
  <button
    onClick={() => signIn("google", { callbackUrl: "/home" })}
    className={`inline-flex items-center justify-center w-full h-12 gap-3 rounded-md border text-sm font-medium transition-all duration-300
      ${theme === "light"
        ? "border-gray-300 bg-white text-gray-700  hover:bg-gray-100"
        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"

        // : "border-gray-600 bg-gray-800 text-purple-200 hover:border-pink-500 hover:text-pink-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
      }`}
  >
    {/* Google Icon */}
  <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 48 48"
  className="h-5 w-5"
>
  <path
    fill="#EA4335"
    d="M24 9.5c3.54 0 6.39 1.46 8.34 2.68l6.17-6.03C34.55 3.02 29.73 1 24 1 14.88 1 7.1 6.48 3.69 14.13l7.19 5.59C12.22 13.39 17.61 9.5 24 9.5z"
  />
  <path
    fill="#4285F4"
    d="M46.5 24.5c0-1.55-.14-3.04-.39-4.5H24v9h12.65c-.57 2.9-2.29 5.36-4.88 7.03l7.45 5.78C43.79 38.54 46.5 32 46.5 24.5z"
  />
  <path
    fill="#FBBC05"
    d="M10.88 28.72A14.3 14.3 0 0 1 9.5 24c0-1.64.29-3.22.82-4.72l-7.19-5.59A23.96 23.96 0 0 0 1.5 24c0 3.88.92 7.55 2.54 10.81l7.19-5.59a14.3 14.3 0 0 1-.35-.5z"
  />
  <path
    fill="#34A853"
    d="M24 46.5c6.48 0 11.91-2.15 15.88-5.89l-7.45-5.78c-2.09 1.43-4.78 2.27-8.43 2.27-6.39 0-11.78-3.89-13.94-9.34l-7.19 5.59C7.1 41.52 14.88 46.5 24 46.5z"
  />
</svg>

    Continue with Google
  </button>

 
</div>

        {/* Footer */}
        <div className={`text-center gap-2 text-sm font-normal mt-6 ${
                theme === "light" ? "text-gray-800" : "text-gray-200"
              }`} >
          <p>
            Don’t have an account?{" "}
            <Link
              href="./signup"
              className="text-[var(--brand-pink)] hover:text-[var(--brand-purple)] transition-colors font-medium"
            >
              Sign up
            </Link>
          </p>

<div className="w-full pt-6 border-t border-gray-200 dark:border-gray-800 relative z-20 mt-6">
            <p className={`text-xs mb-3 text-gray-500 ${
                theme === "light" ? "text-gray-800" : "text-gray-200"
              }`}>
              Download our mobile app
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:opacity-80 transition-opacity"
              >
                <Image
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  width={160}
                  height={40}
                  className="h-10 w-auto"
                />
              </a>

              <a
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:opacity-80 transition-opacity"
              >
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  width={160}
                  height={40}
                  className="h-10 w-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

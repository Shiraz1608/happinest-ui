"use client";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState,useEffect  } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast"; // adjust path if needed
import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "@/app/providers/ThemeProvider";

export default function OrganizerLoginForm() {
  const router = useRouter();
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "warning" } | null>(null);
useEffect(() => {
    console.log("API Base URL:", process.env.NEXT_PUBLIC_API_BASE_ENDPOINT);
  }, []);
  const [email, setEmail] = useState("");
    const { theme } = useTheme(); // get theme
  
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState<any>(null);
const { data: session } = useSession();

  // Validation error states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

 const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setEmailError("");
  setPasswordError("");
  setMessage("");
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

  //  Safely handle non-JSON or empty response
  let data;
  try {
    const text = await res.text();
    data = text ? JSON.parse(text) : {};
  } catch (e) {
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
    //  Store everything for session reuse
    localStorage.setItem("token", data.token);
    sessionStorage.setItem("happinest_user_data", JSON.stringify(data));

    //  Optionally store a “fake session” object
    const manualSession = {
      user: { name: data.fullName, email: data.email },
      token: data.token,
      type: "manual",
    };
    sessionStorage.setItem("manual_session", JSON.stringify(manualSession));

    setToast({ message: "✅ Login successful!", type: "success" });
    router.push("/home");
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
      {/*  Toast Notification */}
     {toast && (
  <Toast
    message={toast.message}
    type={toast.type}
    onClose={() => setToast(null)}
  />
)}

    <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-100">
      {/* Logo + Heading */}
      <div className="text-center mb-8">
        <Image
          src="/happinest-logo.png"
          alt="Happinest"
          width={180}
          height={60}
          className="mx-auto mb-3"
        />
        <div className="flex justify-center">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <div className="h-px w-8 bg-gradient-to-r from-transparent via-gray-400/50 to-transparent" />
            <span className="text-gray-500 text-sm tracking-wide font-medium uppercase">
              Organizer Portal
            </span>
            <div className="h-px w-8 bg-gradient-to-r from-transparent via-gray-400/50 to-transparent" />
          </div>
        </div>

        <h2
          className={`text-2xl font-semibold mt-4 ${
            theme === "light" ? "text-gray-800" : "text-gray-100"
          }`}
        >
          Welcome Back
        </h2>
        <p className="text-gray-500 text-sm">
          Sign in to start creating amazing events
        </p>
      </div>

  {/* Form */}
 <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div className="space-y-2 text-left">
            <label
              htmlFor="email"
              className="flex items-center gap-2 text-sm font-medium select-none"
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
                className={`flex w-full rounded-md border px-3 py-2 pl-10 h-12 text-base md:text-sm outline-none transition-all
                  ${
                    emailError
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-400 focus:shadow-[0_0_8px_1px_rgba(156,163,175,0.5)]"
                  }`}
              />
            </div>
            {emailError && (
              <p className="text-sm text-red-500 mt-1">{emailError}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2 text-left">
            <label
              htmlFor="password"
              className="flex items-center gap-2 text-sm font-medium select-none"
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
                className={`flex w-full rounded-md border px-3 py-2 pl-10 h-12 text-base md:text-sm outline-none transition-all 
                  ${
                    passwordError
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-400 focus:shadow-[0_0_8px_1px_rgba(156,163,175,0.5)]"
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {passwordError && (
              <p className="text-sm text-red-500 mt-1">{passwordError}</p>
            )}
          </div>

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-pink-500 focus:ring-pink-400"
              />
              <span className="text-gray-600">Remember me</span>
            </label>
            <Link
              href="/forgotpassword"
              className="text-pink-500 hover:text-pink-600"
            >
              Forgot password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-400 to-purple-500 hover:scale-105 active:scale-95 transition-transform duration-200 text-white py-2 rounded-md font-medium hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>


      {/* Separator */}
      <div className="flex items-center my-6">
        <hr className="flex-grow border-gray-200" />
        <span className="px-2 text-gray-400 text-sm">OR</span>
        <hr className="flex-grow border-gray-200" />
      </div>

     {/* Social Buttons */}
<div className="w-full space-y-3">
  {/* Google Button */}
  <button
    onClick={() => signIn("google", { callbackUrl: "/home" })}
    className={`inline-flex items-center justify-center w-full h-12 gap-3 rounded-md border text-sm font-medium transition-all duration-300
      ${theme === "light"
        ? "border-gray-300 bg-white text-gray-700 hover:border-pink-500 hover:text-pink-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-200"
        : "border-gray-600 bg-gray-800 text-purple-200 hover:border-pink-500 hover:text-pink-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
      }`}
  >
    {/* Google Icon */}
    <svg
      className={`h-5 w-5 ${theme === "light" ? "text-black" : "text-purple-200"}`}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="currentColor"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="currentColor"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="currentColor"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
    Continue with Google
  </button>

  {/* Facebook Button */}
  <button
    className={`inline-flex items-center justify-center w-full h-12 gap-3 rounded-md border text-sm font-medium transition-all duration-300
      ${theme === "light"
        ? "border-gray-300 bg-white text-gray-700 hover:border-pink-500 hover:text-pink-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-200"
        : "border-gray-600 bg-gray-800 text-purple-200 hover:border-pink-500 hover:text-pink-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
      }`}
  >
    {/* Facebook Icon */}
    <svg
      className={`h-5 w-5 ${theme === "light" ? "text-black" : "text-purple-200"}`}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M22 12a10 10 0 1 0-11.5 9.87v-6.99H8.07v-2.88h2.43V9.41c0-2.4 1.43-3.73 3.62-3.73 1.05 0 2.15.19 2.15.19v2.37h-1.21c-1.19 0-1.56.74-1.56 1.5v1.8h2.66l-.43 2.88h-2.23v6.99A10 10 0 0 0 22 12Z"
      />
    </svg>
    Continue with Facebook
  </button>
</div>


      {/* Signup + Mobile App */}
      <div className="text-center text-sm text-gray-500 mt-6 space-y-4">
        <p>
          Don’t have an account?{" "}
          <Link href="./signup" className="text-pink-500 hover:text-purple-500 font-medium">
            Sign up
          </Link>
        </p>

        <div className="w-full pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-3 text-center">Download our mobile app</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* App Store */}
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

            {/* Google Play */}
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

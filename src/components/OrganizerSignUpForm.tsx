"use client";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Toast from "@/components/Toast"; // adjust path if needed
import { useRouter } from "next/navigation";
import { useTheme } from "@/app/providers/ThemeProvider";

export default function OrganizerSignUpForm() {
  const [fullName, setFullName] = useState("");
      const { theme } = useTheme(); // get theme

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Validation errors
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [termsError, setTermsError] = useState("");
const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "warning" } | null>(null);
useEffect(() => {
    console.log("API Base URL:", process.env.NEXT_PUBLIC_API_BASE_ENDPOINT);
                localStorage.setItem("verificationFlow", "no");

  }, []);
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setToast(null);
    setFullNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmError("");
    setTermsError("");

    let valid = true;

    //  Full Name
    if (!fullName.trim()) {
      setFullNameError("Full name is required");
      valid = false;
    }

    //  Email
    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Enter a valid email address");
      valid = false;
    }

    //  Password
    if (!password.trim()) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      valid = false;
    }

    //  Confirm Password
    if (!confirmPassword.trim()) {
      setConfirmError("Confirm your password");
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmError("Passwords do not match");
      valid = false;
    }

    //  Terms
    if (!agreeTerms) {
      setTermsError("You must agree to the Terms of Service and Privacy Policy");
      valid = false;
    }

    if (!valid) return;

    setLoading(true);
    try {
      sessionStorage.setItem(
        "signupData",
        JSON.stringify({ fullName, email, password })
      );

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/api/Auth/GenerateOtp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/plain",
        },
        body: JSON.stringify({ email }),
      });

      const textResponse = await res.text();

      if (res.ok) {
        setToast({ message: "Account created successfully!", type: "success" });
        setTimeout(() => router.push("/validateotp"), 1500);
      } else {
        setToast({
          message: textResponse || "Something went wrong",
          type: "error",
        });
      }
    } catch (err) {
      console.error(err);
      setToast({ message: "Something went wrong. Try again later.", type: "warning" });
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
      <div className="text-center mb-6">
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
            <span className="text-gray-400 text-sm tracking-wide font-normal uppercase">
              Organizer Portal
            </span>
            <div className="h-px w-8 bg-gradient-to-r from-transparent via-gray-400/50 to-transparent" />
          </div>
        </div>
        <h2 className={`text-2xl font-semibold mt-4 ${
            theme === "light" ? "text-gray-800" : "text-gray-100"
          }`}
          >
          Create Your Account
        </h2>
        <p className="text-gray-500 text-sm">
          Join Happinest and start creating amazing events
        </p>
      </div>

      {/* Form */}
  <form onSubmit={handleSignUp} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-2 text-left">
            <label htmlFor="fullName" className={`flex items-center gap-2 text-sm font-medium ${
                theme === "light" ? "text-gray-800" : "text-gray-200"
              }`}>
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className={`flex w-full rounded-md px-3 py-2 pl-10 h-12 text-base md:text-sm 
                  outline-none transition-all placeholder-gray-400 ${
                  fullNameError
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-400 focus:shadow-[0_0_8px_1px_rgba(156,163,175,0.5)]"
                }`}
              />
            </div>
            {fullNameError && (
              <p className="text-sm text-red-500">{fullNameError}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2 text-left">
            <label htmlFor="email" className={`flex items-center gap-2 text-sm font-medium ${
                theme === "light" ? "text-gray-800" : "text-gray-200"
              }`}>
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={`flex w-full rounded-md px-3 py-2 pl-10 h-12 text-base md:text-sm 
                  outline-none transition-all placeholder-gray-400 ${
                  emailError
                     ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-400 focus:shadow-[0_0_8px_1px_rgba(156,163,175,0.5)]"
                }`}
              />
            </div>
            {emailError && (
              <p className="text-sm text-red-500">{emailError}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2 text-left">
            <label htmlFor="password" className={`flex items-center gap-2 text-sm font-medium ${
                theme === "light" ? "text-gray-800" : "text-gray-200"
              }`}>
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`flex w-full rounded-md px-3 py-2 pl-10 h-12 text-base md:text-sm 
                  outline-none transition-all placeholder-gray-400 ${
                  passwordError
                     ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-400 focus:shadow-[0_0_8px_1px_rgba(156,163,175,0.5)]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {passwordError && (
              <p className="text-sm text-red-500">{passwordError}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2 text-left">
            <label htmlFor="confirmPassword" className={`flex items-center gap-2 text-sm font-medium ${
                theme === "light" ? "text-gray-800" : "text-gray-200"
              }`}>
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className={`flex w-full rounded-md px-3 py-2 pl-10 h-12 text-base md:text-sm 
                  outline-none transition-all placeholder-gray-400 ${
                  confirmError
                     ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-400 focus:shadow-[0_0_8px_1px_rgba(156,163,175,0.5)]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirm ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {confirmError && (
              <p className="text-sm text-red-500">{confirmError}</p>
            )}
          </div>

          {/* Terms */}
           <div className="text-left">
      <label className="flex items-center text-sm gap-2">
        <input
          type="checkbox"
          checked={agreeTerms}
          onChange={(e) => {
            setAgreeTerms(e.target.checked);
            setTermsError("");
          }}
          className="rounded border-gray-300 text-pink-500 focus:ring-pink-400"
        />

        <span
          className={`font-bold ${
            theme === "light" ? "text-gray-500" : "text-gray-400"
          }`}
        >
          I agree to the{" "}
          <a
            href="#"
            className="text-pink-500 hover:text-purple-500 transition-colors"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="text-pink-500 hover:text-purple-500 transition-colors"
          >
            Privacy Policy
          </a>
        </span>
      </label>

      {termsError && (
        <p className="text-sm text-red-500 mt-1">{termsError}</p>
      )}
    </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white py-2 rounded-md font-medium hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      {/* Separator */}
      <div className="flex items-center my-6">
       <hr
  className={`flex-grow ${
    theme === "light" ? "border-gray-300" : "border-gray-800"
  }`}
/>

        <span className="px-2 text-gray-400 text-sm">OR</span>
        <hr
  className={`flex-grow ${
    theme === "light" ? "border-gray-300" : "border-gray-800"
  }`}
/>

      </div>

     {/* Social Buttons */}
   <div className="w-full space-y-3">
     {/* Google Button */}
     <button
       
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
<br/>
      {/* App Download */}
      <div className={`text-center gap-2 text-sm font-normal ${
                theme === "light" ? "text-gray-800" : "text-gray-200"
              }`}>
         <p>
                Already have an account?{" "}
                <Link
  href="/login"
  className="text-pink-500 hover:text-purple-500 font-medium"
>
  Sign In
</Link>

              </p>
         {/* Signup + Mobile App */}
      <div className="text-center text-sm text-gray-500 mt-6 space-y-4">
       

        <div className={`w-full pt-6 border-t ${
    theme === "light" ? "border-gray-300" : "border-gray-800"
  }`}>
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
    </div>        </>

  );
}

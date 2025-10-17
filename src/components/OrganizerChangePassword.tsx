"use client";

import { Lock, EyeOff, Eye, Check } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast"; 
import { useTheme } from "@/app/providers/ThemeProvider";

export default function ChangePassword() {
  const { theme } = useTheme(); // get theme
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [userEmail, setUserEmail] = useState("your_email@example.com");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "warning" } | null>(null);

  const [hasEightChars, setHasEightChars] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [strengthPercent, setStrengthPercent] = useState(0);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const emailFromStorage = localStorage.getItem("email");
      if (emailFromStorage) setUserEmail(emailFromStorage);
    }
  }, []);

  useEffect(() => {
    const hasLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNum = /\d/.test(password);

    setHasEightChars(hasLength);
    setHasUppercase(hasUpper);
    setHasLowercase(hasLower);
    setHasNumber(hasNum);

    const score = [hasLength, hasUpper, hasLower, hasNum].filter(Boolean).length;
    let targetPercent = 0;
    let label = "";

    if (password.length === 0) {
      targetPercent = 0;
      label = "";
    } else if (score <= 2) {
      targetPercent = 33;
      label = "weak";
    } else if (score === 3) {
      targetPercent = 66;
      label = "medium";
    } else {
      targetPercent = 100;
      label = "strong";
    }

    const animation = setInterval(() => {
      setStrengthPercent((prev) => {
        if (prev < targetPercent) return Math.min(prev + 5, targetPercent);
        if (prev > targetPercent) return Math.max(prev - 5, targetPercent);
        clearInterval(animation);
        return prev;
      });
    }, 20);

    setPasswordStrength(label);
    return () => clearInterval(animation);
  }, [password]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!password || !confirmPassword) {
      setToast({ message: "Please fill in all fields.", type: "warning" });
      return;
    }
    if (!hasEightChars || !hasUppercase || !hasLowercase || !hasNumber) {
      setToast({ message: "Password does not meet all requirements.", type: "warning" });
      return;
    }
    if (password !== confirmPassword) {
      setToast({ message: "Passwords do not match.", type: "warning" });
      return;
    }

    try {
      setLoading(true);
      const payload = {
        email: userEmail,
        otp: localStorage.getItem("otp"),
        newPassword: password,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/api/Auth/ResetPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setToast({ message: "Password changed successfully!", type: "success" });
        localStorage.removeItem("email");
        localStorage.removeItem("otp");
        setTimeout(() => router.push("/login"), 1500);
      } else {
        setToast({ message: data.message || "Unable to change password. Please try again.", type: "warning" });
      }
    } catch (err) {
      console.error("Password reset error:", err);
      setToast({ message: "Something went wrong. Please try again.", type: "warning" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
      <div
        className={`flex min-h-screen items-center justify-center p-4 transition-all duration-700 ${
          theme === "light"
            ? "bg-gradient-to-br from-pink-100 via-white to-teal-100 text-gray-800"
            : "bg-[radial-gradient(circle_at_50%_40%,_rgba(131,_24,_176,_0.2),_rgba(20,_10,_40,_0.8)_40%,_rgba(10,_5,_20,_1)_90%)] text-purple-100"
        }`}
      >
        <div
          className={`shadow-xl rounded-2xl p-8 w-full max-w-md border transition-colors duration-500 ${
            theme === "light" ? "bg-white border-gray-100" : "bg-gray-900 border-gray-700"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-pink-500 to-teal-400 rounded-full p-4 inline-block mb-4">
              <Lock className="h-10 w-10 text-white" />
            </div>
            <h2 className={theme === "light" ? "text-3xl font-semibold text-gray-800 mb-2" : "text-3xl font-semibold text-purple-100 mb-2"}>
              Create New Password
            </h2>
            <p className={theme === "light" ? "text-gray-500 text-sm" : "text-purple-200 text-sm"}>
              Enter a new password for
            </p>
            <p className={theme === "light" ? "text-gray-600 font-semibold" : "text-purple-200 font-semibold"}>{userEmail}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleChangePassword} className="space-y-6">
            {/* New Password */}
            <div>
              <label htmlFor="new-password" className={theme === "light" ? "block text-sm font-medium mb-1 text-gray-700" : "block text-sm font-medium mb-1 text-purple-200"}>
                New Password
              </label>
              <div className="relative">
                <Lock className={theme === "light" ? "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" : "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-300"} />
                <input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your new password"
                  required
                  className={`flex w-full rounded-md border px-3 py-2 pl-10 h-12 text-base md:text-sm outline-none transition-all ${
                    theme === "light"
                      ? "border-gray-300 bg-white placeholder-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-400"
                      : "border-gray-600 bg-gray-800 placeholder-purple-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400 text-purple-100"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={theme === "light" ? "absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700" : "absolute right-3 top-1/2 -translate-y-1/2 text-purple-200 hover:text-purple-400"}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Password Strength */}
              {password && (
                <div className="mt-3">
                  <div className="flex gap-2 mb-2">
                    <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      passwordStrength === "weak" ? "bg-red-500" : passwordStrength === "medium" ? "bg-yellow-400" : passwordStrength === "strong" ? "bg-green-500" : "bg-gray-200"
                    }`}></div>
                    <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      passwordStrength === "medium" ? "bg-yellow-400" : passwordStrength === "strong" ? "bg-green-500" : "bg-gray-200"
                    }`}></div>
                    <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      passwordStrength === "strong" ? "bg-green-500" : "bg-gray-200"
                    }`}></div>
                  </div>
                  <p className={`text-sm font-small ${
                    passwordStrength === "weak" ? "text-red-500" : passwordStrength === "medium" ? "text-yellow-500" : passwordStrength === "strong" ? "text-green-600" : theme === "light" ? "text-gray-400" : "text-purple-200"
                  }`}>
                    Password strength: {passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirm-password" className={theme === "light" ? "block text-sm font-medium mb-1 text-gray-700" : "block text-sm font-medium mb-1 text-purple-200"}>
                Confirm Password
              </label>
              <div className="relative">
                <Lock className={theme === "light" ? "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" : "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-300"} />
                <input
                  id="confirm-password"
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your new password"
                  required
                  className={`flex w-full rounded-md border px-3 py-2 pl-10 h-12 text-base md:text-sm outline-none transition-all ${
                    confirmPassword && password !== confirmPassword
                      ? "border-red-500 focus:border-red-500 focus:ring-red-400"
                      : theme === "light"
                      ? "border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-400"
                      : "border-gray-600 bg-gray-800 focus:border-purple-400 focus:ring-2 focus:ring-purple-400 text-purple-100"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className={theme === "light" ? "absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700" : "absolute right-3 top-1/2 -translate-y-1/2 text-purple-200 hover:text-purple-400"}
                  aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  Passwords do not match
                </p>
              )}
            </div>

            {/* Password Requirements */}
            <div className={`text-sm p-4 rounded-md border ${
              theme === "light" ? "bg-gray-50 border-gray-200 text-gray-600" : "bg-gray-800 border-gray-700 text-purple-200"
            }`}>
              <p className="font-semibold mb-2">Password must contain:</p>
              <ul className="list-disc list-inside space-y-1">
                <li className={hasEightChars ? "text-green-600" : "text-gray-500"}>At least 8 characters</li>
                <li className={hasUppercase ? "text-green-600" : "text-gray-500"}>One uppercase letter</li>
                <li className={hasLowercase ? "text-green-600" : "text-gray-500"}>One lowercase letter</li>
                <li className={hasNumber ? "text-green-600" : "text-gray-500"}>One number</li>
              </ul>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={
                loading ||
                !hasEightChars ||
                !hasUppercase ||
                !hasLowercase ||
                !hasNumber ||
                password !== confirmPassword ||
                !password ||
                !confirmPassword
              }
              className="w-full bg-gradient-to-r from-pink-500 to-teal-400 text-white py-2 rounded-md font-semibold text-lg
                       hover:opacity-90 hover:scale-105 active:scale-95 transition-transform duration-200
                       disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 
                    3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <>
                  <Check className="mr-2 h-5 w-5 text-white" />
                  Reset Password
                </>
              )}
            </button>

            {/* Back to login */}
            <div className="mt-10 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
              <p>
                Remember your password?{" "}
                <Link href="/login" className="text-pink-500 hover:text-purple-500 font-medium">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

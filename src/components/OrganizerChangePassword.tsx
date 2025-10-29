"use client";

import { Lock, EyeOff, Eye, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast";
import { useTheme } from "@/app/providers/ThemeProvider";

export default function ChangePassword() {
  const { theme } = useTheme();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
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

  // Get email from sessionStorage (used after VerifyEmail)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const emailFromStorage = sessionStorage.getItem("email");
      if (emailFromStorage) setUserEmail(emailFromStorage);
    }
  }, []);

  // Password strength checker
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

    setPasswordStrength(label);

    // smooth animation
    let anim: any;
    let current = strengthPercent;
    const step = () => {
      if (current < targetPercent) {
        current = Math.min(current + 8, targetPercent);
        setStrengthPercent(current);
        anim = requestAnimationFrame(step);
      } else if (current > targetPercent) {
        current = Math.max(current - 8, targetPercent);
        setStrengthPercent(current);
        anim = requestAnimationFrame(step);
      } else {
        cancelAnimationFrame(anim);
      }
    };
    anim = requestAnimationFrame(step);
    return () => cancelAnimationFrame(anim);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

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
      const rawOtp = sessionStorage.getItem("otp");
      const otpNumber = rawOtp ? Number(rawOtp) : null;

      const payload = {
        email: userEmail,
        otp: otpNumber,
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

      let data: any = {};
      try {
        const text = await res.text();
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {};
      }

      if (res.ok && data.success) {
        setToast({ message: "Password changed successfully!", type: "success" });
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("otp");
        setTimeout(() => router.push("/login"), 1400);
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

  // 🎨 Background updated to match Figma (soft pink → white → aqua)
  const containerBg =
    theme === "light"
      ? "bg-gradient-to-br from-pink-100 via-white to-cyan-100 text-gray-800"
      : "bg-gradient-to-b from-black via-black to-gray-900 text-purple-100";

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className={`flex min-h-screen items-center justify-center p-4 transition-all duration-700 ${containerBg}`}>
        <div
          className={`backdrop-blur-lg rounded-2xl shadow-lg w-full max-w-md border p-8 ${
            theme === "light"
              ? "bg-white/90 border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.05)]"
              : "bg-black border-gray-700 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)]  rounded-full p-4 inline-block mb-4">
              <Lock className="h-10 w-10 text-white" />
            </div>
            <h2 className={`text-3xl font-semibold  mb-2 ${theme==="light"
            ?"text-gray-800":"text-white"}`}>Create New Password</h2>
            <p className={`text-sm ${theme==="light"
            ?"text-gray-500":"text-gray-300"}`}>Enter a new password for</p>
            <p className={`text-gray-700 font-semibold ${theme==="light"
            ?"text-gray-800":"text-white"}`}>{userEmail}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleChangePassword} className="space-y-6">
            {/* New Password */}
            <div>
              <label htmlFor="new-password" className={`block text-sm font-medium mb-1  ${
    theme === "light" ? "text-black" : "text-white"
  }`}>
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your new password"
                  className={`w-full h-10 pl-10 pr-10 rounded-md    focus:ring-2 focus:ring-neutral-400 focus:outline-none transition
                  ${theme==="light"
            ?"bg-gray-100 text-gray-500":"bg-neutral-900 border text-gray-400 border-neutral-700"}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* 🔑 Segmented Strength Meter (Updated) */}
{password && (
  <div className="mt-3">
    {/* Container for the three segments */}
    <div className="flex gap-2 mb-2 h-1">
      {/* Segment 1 */}
      <div
        className={`flex-1 rounded transition-all ${
          passwordStrength === "strong"
            ? "bg-green-500" // Green for strong
            : passwordStrength === "medium"
            ? "bg-yellow-400" // Yellow for medium
            : passwordStrength === "weak"
            ? "bg-red-500" // Red for weak
            : "bg-gray-300" // Default grey
        }`}
      ></div>

      {/* Segment 2 */}
      <div
        className={`flex-1 rounded transition-all ${
          passwordStrength === "strong"
            ? "bg-green-500" // Green for strong
            : passwordStrength === "medium"
            ? "bg-yellow-400" // Yellow for medium
            : "bg-gray-300" // Default grey
        }`}
      ></div>

      {/* Segment 3 */}
      <div
        className={`flex-1 rounded transition-all ${
          passwordStrength === "strong"
            ? "bg-green-500" // Green for strong
            : "bg-gray-300" // Default grey
        }`}
      ></div>
    </div>
    
    {/* Strength Text */}
    <p
      className={`text-sm font-medium ${
        passwordStrength === "weak"
          ? "text-red-500"
          : passwordStrength === "medium"
          ? "text-yellow-600"
          : "text-green-600"
      }`}
    >
      Password strength:{" "}
      {passwordStrength ? passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1) : "—"}
    </p>
  </div>
)}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirm-password" className={`block text-sm font-medium mb-1  ${
    theme === "light" ? "text-black" : "text-white"
  }`}>
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  id="confirm-password"
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your new password"
                  className={`w-full h-10 pl-10 pr-10 rounded-md  ${
                    confirmPassword && password !== confirmPassword
                      ? "border-red-400"
                      : "border-gray-300 focus:ring-2 focus:ring-neutral-400"
                  }  ${theme==="light"
            ?"bg-gray-100 text-gray-500":"bg-neutral-900 border text-gray-400 border-neutral-700"} outline-none transition`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-red-500 text-sm mt-2">Passwords do not match</p>
              )}
            </div>

            {/* Requirements */}
            <div className={`text-sm p-4 rounded-md    text-black ${theme==="light"
            ?"bg-gray-100":"bg-neutral-900 "}`}>
              <p className={`font-semibold mb-2 ${theme==="light"?
                "text-black":"text-white"
              }`}>Password must contain:</p>
              <ul className="list-disc list-inside space-y-1">
                <li className={hasEightChars ? "text-green-600" : "text-gray-400"}>At least 8 characters</li>
                <li className={hasUppercase ? "text-green-600" : "text-gray-400"}>One uppercase letter</li>
                <li className={hasLowercase ? "text-green-600" : "text-gray-400"}>One lowercase letter</li>
                <li className={hasNumber ? "text-green-600" : "text-gray-400"}>One number</li>
              </ul>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={
                loading ||
                !hasEightChars ||
                !hasUppercase ||
                !hasLowercase ||
                !hasNumber ||
                password !== confirmPassword
              }
              className="w-full bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)]  text-white py-2 rounded-md font-semibold text-lg flex items-center justify-center gap-2 shadow-md hover:opacity-90 transition"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white mr-3"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                </svg>
              ) : (
                <>
                  <Check className="mr-2 h-5 w-5 text-white" /> Reset Password
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

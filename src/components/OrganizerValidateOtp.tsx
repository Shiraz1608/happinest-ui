"use client";

import { Mail, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast"; // adjust path if needed
import { useTheme } from "@/app/providers/ThemeProvider";

interface SignupData {
  fullName: string;
  email: string;
  password: string;
}

export default function VerifyEmailForm() {
  const router = useRouter();
  const { theme } = useTheme(); // 'light' | 'dark'

  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [signupData, setSignupData] = useState<SignupData | null>(null);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "warning" } | null>(null);

  const isCodeComplete = code.every((c) => c !== "");

  // Load signup data from sessionStorage
  useEffect(() => {
    const stored = sessionStorage.getItem("signupData");
    if (stored) setSignupData(JSON.parse(stored));
  }, []);

  // Countdown timer for resend
  useEffect(() => {
    if (timer <= 0) return setCanResend(true);
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Auto-submit when all 6 digits are filled
  useEffect(() => {
    if (isCodeComplete) submitVerify();
  }, [code]);

  // Handle OTP input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    if (/^\d*$/.test(val) && val.length <= 1) {
      const newCode = [...code];
      newCode[index] = val;
      setCode(newCode);

      if (val && index < 5) inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle OTP paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();
    if (/^\d{1,6}$/.test(pasteData)) {
      const newCode = [...code];
      for (let i = 0; i < pasteData.length && i < 6; i++) newCode[i] = pasteData[i];
      setCode(newCode);
      inputRefs.current[Math.min(pasteData.length, 5)]?.focus();
    }
  };

  // Core submit logic
  const submitVerify = async () => {
    if (loading || !isCodeComplete) return;
    setLoading(true);
    setMessage("");
    const fullCode = code.join("");

    try {
      const flowType = localStorage.getItem("verificationFlow"); // 'signup' or 'forgotpassword'
      const payload = {
        email: signupData?.email || localStorage.getItem("email"),
        fullName: signupData?.fullName || "",
        password: signupData?.password || "",
        signUpSource: "inapp",
        deviceId: "web",
        appleUserId: "",
        generatedOtp: fullCode,
        guestId: 0,
      };
      const OTPpayload = {
        email: signupData?.email || localStorage.getItem("email"),
        otp: fullCode,
      };

      if (flowType === "forgotpassword") {
        localStorage.setItem("otp", fullCode);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/api/Auth/ValidateOTP`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(OTPpayload),
        });
        const data = await res.json().catch(() => ({}));

        if (res.ok && data.success) {
          setToast({ message: `${data.data || "OTP verified successfully!"}`, type: "success" });
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setToast({ message: "OTP verified! Redirecting...", type: "success" });
          localStorage.setItem("verificationFlow", "no");
          router.push("/changepassword");
        } else {
          setToast({ message: data?.error?.message || data?.data || "OTP verification failed.", type: "warning" });
        }
      } else {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/api/Auth/SignUp`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "text/plain" },
          body: JSON.stringify(payload),
        });
        const text = await res.text();
        if (res.ok) {
          setToast({ message: "Email verified successfully!", type: "success" });
          router.push("/login");
        } else {
          setToast({ message: text || "Something went wrong", type: "warning" });
        }
      }
    } catch (err) {
      console.error(err);
      setToast({ message: "Something went wrong. Try again later.", type: "warning" });
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    if (!signupData) return;
    setCanResend(false);
    setTimer(60);
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/api/Auth/GenerateOtp`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "text/plain" },
        body: JSON.stringify({ email: signupData.email }),
      });
      const text = await res.text();
      if (res.ok) setToast({ message: "OTP has been resent successfully!", type: "success" });
      else setToast({ message: text || "Something went wrong", type: "warning" });
    } catch (err) {
      console.error(err);
      setToast({ message: "Something went wrong. Try again later.", type: "warning" });
    } finally {
      setLoading(false);
    }
  };

  // Theme-based class helpers
  const containerBg = theme === "light"
    ? "bg-gradient-to-br from-pink-100 via-white to-teal-100 text-gray-800"
    : "bg-[radial-gradient(circle_at_50%_40%,_rgba(131,_24,_176,_0.2),_rgba(20,_10,_40,_0.8)_40%,_rgba(10,_5,_20,_1)_90%)] text-purple-100";

  const cardBg = theme === "light" ? "bg-white border-gray-100" : "bg-gray-900 border-gray-700";

  const textPrimary = theme === "light" ? "text-gray-800" : "text-purple-100";
  const textSecondary = theme === "light" ? "text-gray-500" : "text-purple-200";
  const inputBase = theme === "light"
    ? "border-gray-300 bg-white text-gray-800"
    : "border-gray-600 bg-gray-800 text-purple-200";

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className={`flex min-h-screen items-center justify-center p-4 transition-all duration-700 ${containerBg}`}>
        <div className={`shadow-xl rounded-2xl p-8 w-full max-w-md border transition-colors duration-500 ${cardBg}`}>
          {/* Back link */}
          <div className="mb-6">
            <Link href="/signup" className={`flex items-center ${theme === "light" ? "text-gray-600 hover:text-gray-800" : "text-purple-200 hover:text-purple-400"} transition-colors`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Signup
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-pink-500 to-teal-400 p-4 inline-block rounded-full mb-4">
              <Mail className="h-10 w-10 text-white" />
            </div>
            <h2 className={`text-3xl mb-2 font-semibold ${textPrimary}`}>Verify Your Email</h2>
            <p className={`text-sm ${textSecondary}`}>We've sent a 6-digit code to</p>
            <p className={`text-md font-semibold ${textSecondary}`}>{signupData?.email}</p>
          </div>

          {/* OTP Form */}
          <form onSubmit={submitVerify} className="space-y-6">
            <div className="flex justify-center gap-3">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
ref={(el) => {
  inputRefs.current[index] = el; // assignment only
}}
                className={`w-10 h-10 text-center text-2xl font-bold rounded focus:ring-2 focus:ring-offset-0 focus:ring-pink-500 transition-colors ${inputBase} ${
                  index === 0 ? "rounded-l-lg" : ""
                } ${index === 5 ? "rounded-r-lg" : ""} focus:border-transparent focus:ring-2 focus:ring-offset-0 focus:ring-gray-300`}
              />
            ))}
            </div> 
            

            {/* Info text */}
            <p className={`text-center text-sm mt-2 ${textSecondary}`}>Enter the 6-digit code from your email</p>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={!isCodeComplete || loading}
              className={`w-full py-2 rounded-md font-semibold text-lg flex items-center justify-center gap-2 transition ${
                isCodeComplete && !loading
                  ? "bg-gradient-to-r from-pink-500 to-teal-400 text-white hover:opacity-90 active:scale-95"
                  : "bg-gradient-to-r from-pink-500 to-teal-400 text-white opacity-50 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <>
                  <Check className="h-5 w-5" /> Verify Email
                </>
              )}
            </button>

            {/* Resend OTP */}
            <div className={`text-center text-sm mt-4 ${textSecondary}`}>
              <p>Didn’t receive the code?</p>
              {!canResend ? <p className="mt-1">Resend available in {timer}s</p> :
                <button onClick={handleResend} className="text-pink-500 hover:text-purple-400 underline text-sm font-bold mt-1">Resend Code</button>}
            </div>

            {/* Info note */}
            <div className={`flex items-center justify-center mt-6 p-3 rounded-lg text-sm ${theme === "light" ? "bg-gray-50 text-gray-500" : "bg-gray-800 text-purple-200"}`}>
              💡 For demo purposes, any 6-digit code will work
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

'use client';

import { Mail, Check, ArrowLeft } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast";
import { useTheme } from "@/app/providers/ThemeProvider";

interface SignupData {
  fullName: string;
  email: string;
  password: string;
}

export default function VerifyEmailForm() {
  const router = useRouter();
  const { theme } = useTheme();

  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [signupData, setSignupData] = useState<SignupData | null>(null);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "warning" } | null>(null);

  const isCodeComplete = code.every((c) => c !== "");

  // Load signup data from sessionStorage (signup step should store signupData there)
  useEffect(() => {
    const stored = sessionStorage.getItem("signupData");
    if (stored) {
      try {
        setSignupData(JSON.parse(stored));
      } catch {
        /* ignore parse error */
      }
    }
  }, []);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Auto-submit when all 6 digits are filled
  useEffect(() => {
    if (isCodeComplete) {
      // small delay so last keystroke finishes
      const t = setTimeout(() => submitVerify(), 120);
      return () => clearTimeout(t);
    }
  }, [code]); // eslint-disable-line react-hooks/exhaustive-deps

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

  // Handle backspace navigation
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
      const newCode = pasteData.split("").slice(0, 6);
      // fill rest with "" if less than 6
      while (newCode.length < 6) newCode.push("");
      setCode(newCode);
      inputRefs.current[Math.min(pasteData.length, 5)]?.focus();
    }
  };

  // Auto-login helper (used after successful signup verification)
  const handleAutoLogin = async (email: string, password: string) => {
    try {
      const deviceId = "123e4567-e89b-12d3-a456-426614174000";
      const loginPayload = { email, password, deviceId, guestId: 0 };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/api/Auth/Login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginPayload),
      });

      let data: any = {};
      try {
        const text = await res.text();
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {};
      }

      if (res.ok && data.responseStatus && data.token) {
        localStorage.setItem("token", data.token);
        sessionStorage.setItem("happinest_user_data", JSON.stringify(data));
        const manualSession = { user: { name: data.fullName, email: data.email }, token: data.token, type: "manual" };
        sessionStorage.setItem("manual_session", JSON.stringify(manualSession));
        setToast({ message: "✅ Login successful!", type: "success" });
        router.push("/eventdashboard");
      } else {
        setToast({ message: data.validationMessage || "❌ Invalid credentials", type: "warning" });
      }
    } catch (error) {
      console.error("Auto-login error:", error);
      setToast({ message: "❌ Something went wrong during auto-login.", type: "warning" });
    }
  };

  // Verify OTP - accepts optional event when called from <form onSubmit>
  const submitVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (loading || !isCodeComplete) return;
    setLoading(true);
    const fullCode = code.join("");

    try {
      const flowType = localStorage.getItem("verificationFlow"); // 'signup' or 'forgotpassword'
      const email = signupData?.email || sessionStorage.getItem("email") || localStorage.getItem("email") || "";
      const password = signupData?.password || sessionStorage.getItem("password") || localStorage.getItem("password") || "";

      const payload = {
        email,
        fullName: signupData?.fullName || "",
        password,
        signUpSource: "web",
        deviceId: "web",
        appleUserId: "",
        generatedOtp: fullCode,
        guestId: 0,
      };

      const OTPpayload = { email, otp: fullCode };

      // === Forgot Password Flow ===
      if (flowType === "forgotpassword") {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/api/Auth/ValidateOTP`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(OTPpayload),
        });

        let data: any = {};
        try {
          const text = await res.text();
          data = text ? JSON.parse(text) : {};
        } catch {
          data = {};
        }

        if (res.ok && data.success) {
          setToast({ message: "✅ OTP verified successfully!", type: "success" });
          // store in sessionStorage for ChangePassword page
          sessionStorage.setItem("email", email);
          sessionStorage.setItem("otp", fullCode);
          // small pause for UX then redirect
          await new Promise((r) => setTimeout(r, 800));
          router.push("/changepassword");
        } else {
          setToast({ message: data?.error?.message || data?.message || "OTP verification failed.", type: "warning" });
        }
      } else {
        // === Signup Flow ===
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/api/Auth/SignUp`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "text/plain" },
          body: JSON.stringify(payload),
        });

        let text = "";
        try {
          text = await res.text();
        } catch {}

        if (res.ok) {
          setToast({ message: "🎉 Email verified successfully! Logging you in...", type: "success" });
          // try auto-login with available credentials (fallbacks)
          await handleAutoLogin(email, password);
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

  // Resend OTP (button must be type="button" to avoid form submit)
  const handleResend = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const Email = signupData?.email || sessionStorage.getItem("email") || localStorage.getItem("email") || "";

    if (!signupData?.email || Email) {
      setToast({ message: "No signup email found.", type: "warning" });
      return;
    }
    setCanResend(false);
    setTimer(60);
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/api/Auth/GenerateOtp`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "text/plain" },
        body: JSON.stringify({ email: signupData?.email ?? Email ?? "" }),
      });
      const text = await res.text().catch(() => "");
      if (res.ok) setToast({ message: "OTP has been resent successfully!", type: "success" });
      else setToast({ message: text || "Something went wrong", type: "warning" });
    } catch (err) {
      console.error(err);
      setToast({ message: "Something went wrong. Try again later.", type: "warning" });
    } finally {
      setLoading(false);
    }
  };

  const containerBg =
    theme === "light"
      ? "bg-gradient-to-br from-pink-100 via-white to-teal-100 text-gray-800"
      : "bg-gradient-to-b from-black via-black to-gray-900 text-purple-100";
  const textPrimary = theme === "light" ? "text-gray-800" : "text-white";
  const textSecondary = theme === "light" ? "text-gray-500" : "text-gray-300";
  const inputBase =
    theme === "light"
      ? "bg-gray-200 text-gray-800 border border-gray-300"
      : "bg-neutral-900 text-white border border-neutral-700";

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className={`flex min-h-screen items-center justify-center p-4 transition-all duration-700 ${containerBg}`}>
        <div className={` backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md border ${theme === "light" ?  "bg-white/80 border-gray-100" : "border-gray-700 bg-black"}`}>
          {/* Back to signup */}
          <div className="mb-6">
            <Link href="/signup" className={`inline-flex items-center text-sm font-medium ${theme === "light" ? "text-gray-700 hover:text-gray-900" : "text-white hover:bg-gray-800"}`}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Signup
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-pink-500 to-teal-400 p-4 inline-block rounded-full mb-4">
              <Mail className="h-10 w-10 text-white" />
            </div>
            <h2 className={`text-xl mb-2 ${textPrimary}`}>Verify Your Email</h2>
            <p className={`text-sm ${textSecondary}`}>We've sent a 6-digit code to</p>
            <p className={`text-sm font-semibold ${textPrimary}`}>
              {signupData?.email || (typeof window !== "undefined" ? sessionStorage.getItem("email") : "")}
            </p>

          </div>

          {/* OTP Form */}
          <form onSubmit={submitVerify} className="space-y-6">
             <div className="flex justify-center gap-[3px]">
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
        inputRefs.current[index] = el;
      }}
      className={`w-10 h-10 text-center text-1xl font-bold outline-none transition-all duration-150
        ${inputBase}
        ${index === 0 ? "rounded-l-lg" : ""}
        ${index === code.length - 1 ? "rounded-r-lg" : ""}
        focus:ring-1 focus:ring-gray-400 focus:border-gray-400`}
    />
  ))}
</div>
            <p className={`text-center text-sm mt-2 ${textSecondary}`}>Enter the 6-digit code from your email</p>

            <button
              type="submit"
              disabled={!isCodeComplete || loading}
              className={`w-full py-2 rounded-md font-semibold text-lg flex items-center justify-center gap-2 transition ${isCodeComplete && !loading ? "bg-gradient-to-r from-pink-500 to-teal-400 text-white" : "bg-gradient-to-r from-pink-500 to-teal-400 text-white opacity-50 cursor-not-allowed"}`}
            >
              {loading ? <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle></svg> : <><Check className="h-5 w-5" /> Verify Email</>}
            </button>

            <div className={`text-center text-sm mt-4 ${textSecondary}`}>
              <p>Didn’t receive the code?</p>
              {!canResend ? <p className="mt-1">Resend available in {timer}s</p> :
                <button type="button" onClick={handleResend} className="text-pink-500 underline text-sm font-bold mt-1">Resend Code</button>}
            </div>

            <div className={`flex items-center justify-center pt-4 mt-6 p-3 text-sm border-t ${theme === "light" ? "text-gray-500 border-gray-300" : "text-gray-300 border-gray-800"}`}>
              💡 For demo purposes, any 6-digit code will work
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

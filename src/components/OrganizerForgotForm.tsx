"use client";
import { Mail } from "lucide-react";
import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast"; // adjust path if needed
import { useTheme } from "@/app/providers/ThemeProvider"; // import your theme hook
import { ArrowLeft } from "lucide-react";

interface SignupData {
  fullName: string;
  email: string;
  password: string;
}

export default function VerifyEmailForm() {
  const { theme } = useTheme(); // get theme
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [signupData, setSignupData] = useState<SignupData | null>(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const router = useRouter();
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "warning";
  } | null>(null);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setToast(null);

    let isValid = true;
    if (!email.trim()) {
      setEmailError("Email address is required");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }

    if (!isValid) return;

    setLoading(true);

    try {
      const OTPpayload = { emailAddress: email };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/api/Auth/ForgotPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/plain",
        },
        body: JSON.stringify(OTPpayload),
      });

      const textResponse = await res.text();

      if (res.ok) {
        setToast({
          message: "OTP has been resent successfully!",
          type: "success",
        });
        localStorage.setItem("verificationFlow", "forgotpassword");
        sessionStorage.setItem("email", email);
        router.push("/validateotp");
      } else {
        setToast({
          message: textResponse || "Something went wrong",
          type: "warning",
        });
      }
    } catch (err) {
      console.error(err);
      setToast({
        message: "Something went wrong. Try again later.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div
        className={`flex min-h-screen items-center justify-center p-4 transition-all duration-700 ${
          theme === "light"
            ? "bg-gradient-to-br from-pink-100 via-white to-teal-100 text-gray-800"
            : "bg-gradient-to-b from-black via-black to-gray-900 text-purple-100"
        }`}
      >
       <div
  className={`backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md border transition-all duration-500 ${
    theme === "light"
      ? "bg-white/80 border-gray-100"
      : "bg-black border-neutral-700"
  }`}
>

          {/* Back to signup */}
           <div className="mb-6">
      <Link
        href="/login"
        className={`inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all
          disabled:pointer-events-none disabled:opacity-50
          outline-none focus-visible:ring-2 focus-visible:ring-pink-400
          h-8 rounded-md gap-1.5 px-3
         
          ${theme === "light" ? "text-gray-700 hover:text-gray-900" : "  hover:bg-neutral-900 text-white"}
        `}
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Login
      </Link>
      </div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-teal)] rounded-full p-4 inline-block mb-4">
              <Mail className="h-10 w-10 text-white" />
            </div>
            <h2
              className={`text-3xl mb-2 ${
                theme === "light" ? "text-gray-800" : "text-purple-100"
              }`}
            >
              Forgot Password?
            </h2>
            <p
              className={`text-center text-sm mt-2 ${
                theme === "light" ? "text-gray-500" : "text-neutral-400"
              }`}
            >
              No worries! Enter your email address and we'll send you a code to
              reset your password.
            </p>
            <p className={theme === "light" ? "text-gray-600 text-md" : "text-purple-200 text-md"}>
              <span className="font-semibold">{signupData?.email}</span>
            </p>
          </div>

          {/* Verification Form */}
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="space-y-2 text-left">
              <label
                htmlFor="email"
                className="flex items-center gap-2 text-sm font-medium select-none"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
                    theme === "light" ? "text-gray-400" : "text-purple-300"
                  }`}
                />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (e.target.value.trim()) setEmailError("");
                  }}
                  placeholder="your.email@example.com"
                  className={`flex w-full rounded-md px-3 py-2 pl-10 h-12 text-base md:text-sm outline-none transition-all ${
                    emailError
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : theme === "light"
                      ? "border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-400 focus:shadow-[0_0_8px_1px_rgba(156,163,175,0.5)]"
                      : "border-gray-600 bg-neutral-900 text-neutral-400 focus:border-gray-400 focus:ring-2 focus:ring-neutral-700 focus:shadow-[0_0_8px_1px_rgba(156,163,175,0.5)]"
                  }`}
                />
              </div>
              {emailError && (
                <p className="text-sm text-red-500 mt-1">{emailError}</p>
              )}
            </div>

            {/* Submit Button */}
           <button
  type="submit"
  disabled={loading}
  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium 
             disabled:pointer-events-none disabled:opacity-50 
             [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 
             outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] 
             aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive 
             hover:opacity-90 shadow-sm px-4 py-2 has-[>svg]:px-3 w-full h-12 
             bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-purple)] 
             hover:shadow-xl hover:scale-105 transition-all duration-200 text-white border-0"
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
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-send mr-2 h-4 w-4"
      aria-hidden="true"
    >
      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
      <path d="m21.854 2.147-10.94 10.939"></path>
    </svg>
  )}
  Send Reset Code
</button>


            {/* Back to Sign In */}
            <div className={`border-t transition-colors duration-500 pt-4 text-center text-sm space-y-4 ${
    theme === "light" ? "border-gray-300" : "border-gray-800"
  }`}
            >
              <p className={theme === "light" ? "text-gray-500" : "text-neutral-400"}>
                Remember your password?{" "}
                <Link
                  href="./login"
                  className="text-[var(--brand-pink)] hover:text-[var(--brand-purple)] transition-colors text-[15px] font-medium"
                >
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

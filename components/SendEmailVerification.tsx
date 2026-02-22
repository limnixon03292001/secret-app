"use client";

import InputField from "./InputField";
import type { FormEvent } from "react";
import { ArrowRight, Loader2, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { sendVerificationEmail } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ReturnBtn from "./ReturnBtn";

export default function SendEmailVerification() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  async function handleVerificationLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const email = String(formData.get("email"));

    await sendVerificationEmail({
      email,
      callbackURL: "/auth/verify",
      fetchOptions: {
        onRequest: () => {
          setIsLoading(true);
        },
        onResponse: () => {
          setIsLoading(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success(
            "The verification link has been sent successfully. Please check your email and follow the instructions to verify your account.",
          );
        },
      },
    });
  }

  return (
    <div className="w-full p-5 max-w-125">
      <ReturnBtn href="/auth/login" label="Login" />
      <h1 className="text-2xl font-display font-bold text-white leading-tight mb-4">
        Verify your Email
      </h1>
      <p className="text-gray-400 text-sm leading-relaxed max-w-full mb-4">
        Your account email has not been verified yet. Please enter your email
        address, and we will send you a verification link. After verifying your
        email, you may proceed to log in.
      </p>
      <motion.form
        onSubmit={handleVerificationLink}
        initial={{
          opacity: 0,
          x: 16,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        exit={{
          opacity: 0,
          x: -16,
        }}
        transition={{
          duration: 0.22,
        }}
        className="space-y-4"
      >
        <InputField
          icon={<Mail size={15} />}
          type="email"
          placeholder="Email address"
          required
          nameId="email"
        />

        <motion.button
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 rounded-xl font-display font-bold text-sm uppercase tracking-widest text-bg-primary flex items-center justify-center gap-2 relative overflow-hidden disabled:opacity-70 transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, #00d4ff 0%, #8b5cf6 100%)",
            boxShadow: isLoading
              ? "none"
              : "0 0 20px rgba(0,212,255,0.3), 0 0 40px rgba(139,92,246,0.2)",
          }}
        >
          <div className="absolute inset-0 bg-white/10 -translate-x-full hover:translate-x-full transition-transform duration-700 skew-x-12 pointer-events-none" />
          {isLoading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Sending verification link...</span>
            </>
          ) : (
            <>
              <span>Send verification link</span>
              <ArrowRight size={16} />
            </>
          )}
        </motion.button>
      </motion.form>
    </div>
  );
}

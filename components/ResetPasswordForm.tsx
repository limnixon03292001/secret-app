"use client";

import { motion } from "framer-motion";
import ReturnBtn from "./ReturnBtn";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InputField from "./InputField";
import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import { resetPassword } from "@/lib/auth-client";

export default function ResetPasswordForm({ token }: { token: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function handleResetPassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const password = String(formData.get("password"));
    const confirmPassword = String(formData.get("confirmPassword"));

    if (!password) toast.error("Please enter your password.");

    if (password !== confirmPassword) {
      return toast.error("Password do not match.");
    }

    await resetPassword({
      newPassword: password,
      token: token,
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
          toast.success("Password reset successfully!");
          router.push("/auth/login");
        },
      },
    });
  }

  return (
    <div className="w-full p-5 max-w-125">
      <ReturnBtn href="/auth/login" label="Login" />
      <h1 className="text-2xl font-display font-bold text-white leading-tight mb-4">
        Reset Your Password
      </h1>
      <p className="text-gray-400 text-sm leading-relaxed max-w-full mb-4">
        Enter your new Password
      </p>
      <motion.form
        onSubmit={handleResetPassword}
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
          icon={<Lock size={15} />}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          required
          suffix={
            <button
              type="button"
              onClick={() => setShowPassword((p: boolean) => !p)}
              className="text-gray-500 hover:text-gray-300 transition-colors"
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          }
          nameId="password"
        />

        <InputField
          icon={<Lock size={15} />}
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm password"
          required
          suffix={
            <button
              type="button"
              onClick={() => setShowConfirmPassword((p: boolean) => !p)}
              className="text-gray-500 hover:text-gray-300 transition-colors"
            >
              {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          }
          nameId="confirmPassword"
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
            </>
          ) : (
            <>
              <span>Request password</span>
              <ArrowRight size={16} />
            </>
          )}
        </motion.button>
      </motion.form>
    </div>
  );
}

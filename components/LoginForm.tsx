import { InputFieldProps, LoginFormProps } from "@/types/LoginForm_Types";
import { boolean } from "better-auth";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { useState } from "react";

export default function LoginForm({
  activeTab,
  isLoading,
  showPassword,
  showConfirmPassword,
  setActiveTab,
  setShowPassword,
  setShowConfirmPassword,
  handleRegisterSubmit,
  //   handleInput,
}: LoginFormProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.form
        onSubmit={handleRegisterSubmit}
        key={activeTab}
        initial={{
          opacity: 0,
          x: activeTab === "signin" ? -16 : 16,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        exit={{
          opacity: 0,
          x: activeTab === "signin" ? 16 : -16,
        }}
        transition={{
          duration: 0.22,
        }}
        className="space-y-4"
      >
        <div className="mb-6">
          <h2 className="text-xl font-display font-bold text-white">
            {activeTab === "signin" ? "Welcome back" : "Join the expedition"}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            {activeTab === "signin"
              ? "Sign in to continue your journey"
              : "Create your explorer account"}
          </p>
        </div>

        {/* Username (sign up only) */}
        {activeTab === "signup" && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
          >
            <InputField
              icon={<User size={15} />}
              type="text"
              placeholder="Explorer username"
              required
              nameId="username"
            />
          </motion.div>
        )}

        {/* Email */}
        <InputField
          icon={<Mail size={15} />}
          type="email"
          placeholder="Email address"
          required
          nameId="email"
        />

        {/* Password */}
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

        {/* Confirm Password (sign up only) */}
        {activeTab === "signup" && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
          >
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
                  {showConfirmPassword ? (
                    <EyeOff size={15} />
                  ) : (
                    <Eye size={15} />
                  )}
                </button>
              }
              nameId="confirmPassword"
            />
          </motion.div>
        )}

        {/* Forgot password (sign in only) */}
        {activeTab === "signin" && (
          <div className="flex justify-end">
            <button
              type="button"
              className="text-xs text-neon-blue hover:text-neon-cyan transition-colors"
            >
              Forgot password?
            </button>
          </div>
        )}

        {/* Submit */}
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
          <div className="absolute inset-0 bg-white/10 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700 skew-x-12 pointer-events-none" />
          {isLoading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>
                {activeTab === "signin" ? "Signing in…" : "Creating account…"}
              </span>
            </>
          ) : (
            <>
              <span>
                {activeTab === "signin" ? "Sign In" : "Create Account"}
              </span>
              <ArrowRight size={16} />
            </>
          )}
        </motion.button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-white/5" />
          <span className="text-[11px] text-gray-600 uppercase tracking-widest">
            or
          </span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        {/* Social buttons */}
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              label: "Google",
              color: "rgba(234,67,53,0.15)",
              border: "rgba(234,67,53,0.2)",
            },
            {
              label: "Facebook",
              color: "rgba(24,119,242,0.15)",
              border: "rgba(24,119,242,0.2)",
            },
          ].map((s) => (
            <button
              key={s.label}
              type="button"
              className="py-2.5 rounded-xl text-xs font-bold text-gray-400 hover:text-white transition-colors border"
              style={{
                background: s.color,
                borderColor: s.border,
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Switch tab link */}
        <p className="text-center text-xs text-gray-600 pt-2">
          {activeTab === "signin"
            ? "Don't have an account? "
            : "Already an explorer? "}
          <button
            type="button"
            onClick={() =>
              setActiveTab(activeTab === "signin" ? "signup" : "signin")
            }
            className="text-neon-cyan hover:text-white transition-colors font-bold"
          >
            {activeTab === "signin" ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </motion.form>
    </AnimatePresence>
  );
}

// ── Reusable Input Field ──

function InputField({
  icon,
  type,
  placeholder,
  required,
  suffix,
  nameId,
}: InputFieldProps) {
  const [focused, setFocused] = useState(false);
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200"
      style={{
        background: "rgba(255,255,255,0.03)",
        borderColor: focused ? "rgba(0,212,255,0.4)" : "rgba(255,255,255,0.06)",
        boxShadow: focused
          ? "0 0 0 1px rgba(0,212,255,0.1), 0 0 12px rgba(0,212,255,0.05)"
          : "none",
      }}
    >
      <span
        className={`shrink-0 transition-colors duration-200 ${focused ? "text-neon-cyan" : "text-gray-600"}`}
      >
        {icon}
      </span>
      <input
        id={nameId}
        name={nameId}
        type={type}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className="flex-1 bg-transparent text-sm text-white placeholder-gray-600 outline-none font-sans"
      />
      {suffix && <span className="shrink-0">{suffix}</span>}
    </div>
  );
}

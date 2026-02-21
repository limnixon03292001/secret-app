"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Navigation,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  MapPin,
  Compass,
  Shield,
} from "lucide-react";
import { mapRegions } from "@/data/philippinesData";
interface AuthPageProps {
  onAuthSuccess: () => void;
}
type Tab = "signin" | "signup";

export default function AuthPage({ onAuthSuccess }: AuthPageProps) {
  const [activeTab, setActiveTab] = useState<Tab>("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onAuthSuccess();
    }, 1800);
  };
  const handleInput = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  return (
    <div className="min-h-screen w-full bg-bg-primary flex overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.07] pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(0,212,255,0.04) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 50%, rgba(139,92,246,0.05) 0%, transparent 60%)",
        }}
      />

      {/* Scan line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent absolute animate-[scan_6s_linear_infinite]"
          style={{
            boxShadow: "0 0 12px rgba(6,255,212,0.3)",
          }}
        />
      </div>
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(3deg); }
        }
      `}</style>

      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex flex-col w-[52%] relative overflow-hidden border-r border-white/5">
        {/* Deep background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-purple/5 pointer-events-none" />

        {/* Corner accents */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-neon-blue/30 rounded-tl-2xl" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-neon-purple/30 rounded-br-2xl" />

        {/* Logo */}
        <div className="relative z-10 p-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center shadow-[0_0_20px_rgba(0,212,255,0.3)]">
              <Navigation size={20} className="text-white" />
            </div>
            <span className="font-display font-bold text-2xl tracking-wider text-white">
              PH<span className="text-neon-cyan">TRACKER</span>
            </span>
          </div>
        </div>

        {/* Center content */}
        <div className="flex-1 flex flex-col items-center justify-center px-12 relative z-10">
          {/* Decorative map silhouette */}
          <motion.div
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative mb-10"
          >
            <div
              className="absolute inset-0 blur-3xl rounded-full opacity-30"
              style={{
                background: "radial-gradient(circle, #00d4ff 0%, #8b5cf6 100%)",
              }}
            />
            <svg
              className="w-48 h-72 drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 702.39 1209.438"
            >
              <defs>
                <linearGradient
                  id="visitedGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#00d4ff" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>

              {mapRegions.map((region) => (
                <motion.path
                  key={region.id}
                  d={region.path}
                  fill={"url(#visitedGradient)"}
                  stroke={"#a5f3fc"}
                  strokeWidth="1"
                  className={`cursor-pointer map-path  `}
                  whileHover={{ scale: 1.02 }}
                />
              ))}
            </svg>
          </motion.div>

          <h1 className="text-3xl font-display font-bold text-white text-center leading-tight mb-4">
            Explore Every Corner of the{" "}
            <span
              className="text-neon-cyan"
              style={{
                textShadow: "0 0 20px rgba(6,255,212,0.5)",
              }}
            >
              Philippines
            </span>
          </h1>
          <p className="text-gray-400 text-center text-sm leading-relaxed max-w-xs">
            Track your travels, compete with explorers nationwide, and unlock
            achievements as you discover all 82 provinces.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 mt-8 justify-center">
            {[
              {
                icon: <MapPin size={12} />,
                label: "GPS Tracking",
              },
              {
                icon: <Compass size={12} />,
                label: "Interactive Map",
              },
              {
                icon: <Shield size={12} />,
                label: "Achievements",
              },
            ].map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400"
              >
                <span className="text-neon-cyan">{f.icon}</span>
                {f.label}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stat strip */}
        <div className="relative z-10 p-10 flex gap-8">
          {[
            {
              value: "12,400+",
              label: "Explorers",
            },
            {
              value: "82",
              label: "Provinces",
            },
            {
              value: "1.2M",
              label: "Check-ins",
            },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-xl font-mono font-bold text-neon-blue">
                {s.value}
              </div>
              <div className="text-[11px] text-gray-500 uppercase tracking-wider mt-0.5">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="w-full max-w-[420px]"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
              <Navigation size={16} className="text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-wider text-white">
              PH<span className="text-neon-cyan">TRACKER</span>
            </span>
          </div>

          {/* Card */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(13, 13, 26, 0.75)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow:
                "0 0 0 1px rgba(0,212,255,0.05), 0 32px 64px rgba(0,0,0,0.6)",
            }}
          >
            {/* Tab switcher */}
            <div className="flex border-b border-white/5">
              {(["signin", "signup"] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest font-display relative transition-colors duration-200 ${activeTab === tab ? "text-neon-cyan" : "text-gray-600 hover:text-gray-400"}`}
                >
                  {tab === "signin" ? "Sign In" : "Sign Up"}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-blue to-neon-cyan"
                      style={{
                        boxShadow: "0 0 8px rgba(0,212,255,0.6)",
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Form area */}
            <div className="p-8">
              <AnimatePresence mode="wait">
                <motion.form
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
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="mb-6">
                    <h2 className="text-xl font-display font-bold text-white">
                      {activeTab === "signin"
                        ? "Welcome back"
                        : "Join the expedition"}
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
                        value={formData.username}
                        onChange={(v) => handleInput("username", v)}
                        required
                      />
                    </motion.div>
                  )}

                  {/* Email */}
                  <InputField
                    icon={<Mail size={15} />}
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={(v) => handleInput("email", v)}
                    required
                  />

                  {/* Password */}
                  <InputField
                    icon={<Lock size={15} />}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(v) => handleInput("password", v)}
                    required
                    suffix={
                      <button
                        type="button"
                        onClick={() => setShowPassword((p) => !p)}
                        className="text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff size={15} />
                        ) : (
                          <Eye size={15} />
                        )}
                      </button>
                    }
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
                        value={formData.confirmPassword}
                        onChange={(v) => handleInput("confirmPassword", v)}
                        required
                        suffix={
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword((p) => !p)}
                            className="text-gray-500 hover:text-gray-300 transition-colors"
                          >
                            {showConfirmPassword ? (
                              <EyeOff size={15} />
                            ) : (
                              <Eye size={15} />
                            )}
                          </button>
                        }
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
                      background:
                        "linear-gradient(135deg, #00d4ff 0%, #8b5cf6 100%)",
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
                          {activeTab === "signin"
                            ? "Signing in…"
                            : "Creating account…"}
                        </span>
                      </>
                    ) : (
                      <>
                        <span>
                          {activeTab === "signin"
                            ? "Sign In"
                            : "Create Account"}
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
                        setActiveTab(
                          activeTab === "signin" ? "signup" : "signin",
                        )
                      }
                      className="text-neon-cyan hover:text-white transition-colors font-bold"
                    >
                      {activeTab === "signin" ? "Sign Up" : "Sign In"}
                    </button>
                  </p>
                </motion.form>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
// ── Reusable Input Field ──
interface InputFieldProps {
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  suffix?: React.ReactNode;
}
function InputField({
  icon,
  type,
  placeholder,
  value,
  onChange,
  required,
  suffix,
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
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className="flex-1 bg-transparent text-sm text-white placeholder-gray-600 outline-none font-sans"
      />
      {suffix && <span className="shrink-0">{suffix}</span>}
    </div>
  );
}

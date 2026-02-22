"use client";

import { InputFieldProps } from "@/types/LoginForm_Types";
// ── Reusable Input Field ──
import { useState } from "react";

export default function InputField({
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

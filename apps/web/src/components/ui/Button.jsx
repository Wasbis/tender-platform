"use client";

import { cn } from "@/libs/utils";
import React from "react";

// 1. DEFINISI STYLE (THEME INDUSTRIAL)
const VARIANTS = {
  // Main Actions
  primary: "bg-slate-900 text-white hover:bg-slate-800 shadow-sm border border-transparent",
  secondary: "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 hover:text-slate-900",

  // High Visibility (Accent)
  accent: "bg-amber-500 text-slate-900 font-bold hover:bg-amber-400 border border-amber-600",

  // Status Actions
  danger: "bg-red-600 text-white hover:bg-red-700 border border-transparent",
  success: "bg-emerald-600 text-white hover:bg-emerald-700 border border-transparent",

  // Minimalist
  ghost: "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 border-none",
  link: "text-slate-900 underline-offset-4 hover:underline bg-transparent border-none p-0 h-auto",

  // Disabled state
  disabled: "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200 shadow-none",
};

// 2. DEFINISI UKURAN
const SIZES = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm", // Default size
  lg: "h-12 px-8 text-base",
  icon: "h-10 w-10 p-0 flex items-center justify-center", // Khusus tombol kotak (misal: Lonceng)
};

export default function Button({
  variant = "primary", // Default ke Primary
  size = "md", // Default ke Medium
  className = "",
  children,
  onClick,
  icon,
  type = "button", // Default button type
  disabled = false,
  loading = false, // Tambahan fitur loading spinner
  ...props
}) {
  // Logic: Kalau disabled atau loading, paksa style jadi disabled
  const currentVariant = disabled || loading ? "disabled" : variant;

  return (
    <button
      type={type}
      onClick={!disabled && !loading ? onClick : undefined}
      disabled={disabled || loading}
      className={cn(
        // Base Styles (Wajib ada di semua tombol)
        "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2",
        // Inject Variant & Size
        VARIANTS[currentVariant],
        SIZES[size],
        // Override Class (Kalo lu mau nambahin class manual pas make)
        className,
      )}
      {...props}>
      {/* Loading Spinner Logic */}
      {loading && (
        <svg className="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}

      {/* Icon Logic (Kalo bukan loading) */}
      {!loading && icon && <span className={cn("inline-flex", children ? "mr-2" : "")}>{icon}</span>}

      {/* Text Content */}
      {children}
    </button>
  );
}

"use client";

// 1. PERUBAHAN IMPORT: useActionState dari 'react'
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction } from "@/actions/auth-actions";
import { Zap, Lock, Mail, ArrowRight } from "lucide-react";

// Komponen Tombol Submit dengan Loading State
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group relative flex w-full justify-center rounded-xl bg-amber-500 px-4 py-3 text-sm font-bold text-slate-900 transition-all hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70">
      {pending ? (
        <span className="animate-pulse">Authenticating...</span>
      ) : (
        <span className="flex items-center gap-2">
          Sign In to Dashboard <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      )}
    </button>
  );
}

export default function LoginPage() {
  // 2. PERUBAHAN HOOK: Ganti useFormState jadi useActionState
  const [state, formAction] = useActionState(loginAction, null);

  return (
    <div className="flex min-h-screen flex-col justify-center bg-slate-950 px-6 py-12 lg:px-8">
      {/* Background decoration - Responsive positioning */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full bg-amber-500/5 blur-[80px] md:blur-[120px]"></div>
        <div className="absolute top-[20%] right-[10%] h-[200px] w-[200px] md:h-[300px] md:w-[300px] rounded-full bg-blue-600/10 blur-[60px] md:blur-[100px]"></div>
      </div>

      {/* Main Container - Centered & Responsive Width */}
      <div className="relative sm:mx-auto sm:w-full sm:max-w-md">
        {/* Header Logo */}
        <div className="flex flex-col items-center mb-8 sm:mb-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/20">
            <Zap className="h-7 w-7 text-slate-900 fill-current" />
          </div>
          <h2 className="mt-6 text-center text-2xl md:text-3xl font-bold tracking-tight text-white">
            Tender<span className="text-slate-500">/AI</span>
          </h2>
          <p className="mt-2 text-center text-sm text-slate-400 max-w-xs sm:max-w-none mx-auto">
            Enterprise Intelligence System
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-slate-900/50 py-8 px-4 shadow-2xl ring-1 ring-white/10 sm:rounded-3xl sm:px-10 backdrop-blur-xl border border-slate-800">
          <form action={formAction} className="space-y-6">
            {/* Input Fields */}
            <div className="space-y-4">
              {/* Input Email */}
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-xl border-0 bg-slate-800/50 py-3 pl-10 text-white shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6 transition-all"
                  placeholder="admin@tender.ai"
                />
              </div>

              {/* Input Password */}
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-xl border-0 bg-slate-800/50 py-3 pl-10 text-white shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Error Message */}
            {state?.status === "error" && (
              <div className="rounded-lg bg-red-500/10 p-3 text-center text-sm font-medium text-red-400 border border-red-500/20 animate-in fade-in slide-in-from-top-2">
                {state.message}
              </div>
            )}

            {/* Submit Button */}
            <div>
              <SubmitButton />
            </div>
          </form>

          {/* Footer Text inside Card for better grouping on mobile */}
          <div className="mt-6 border-t border-white/5 pt-6">
            <p className="text-center text-xs text-slate-500 leading-relaxed">
              Protected by Enterprise Grade Security.
              <span className="block sm:inline"> Unauthorized access is prohibited.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

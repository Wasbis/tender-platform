"use client";

import { useState } from "react";
import { Menu, Search, Bell, User } from "lucide-react";
import { Sidebar } from "@/components/layouts/Sidebar";
import Button from "@/components/ui/Button";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="relative min-h-screen bg-slate-50">
      {/* 1. Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm transition-opacity md:hidden"
        />
      )}

      {/* 2. Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* 3. Main Content Wrapper */}
      <div className={`min-h-screen transition-all duration-300 ease-in-out ${sidebarOpen ? "md:ml-72" : "md:ml-0"}`}>
        {/* Header Glassmorphism */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md md:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 focus:outline-none">
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-sm font-semibold text-slate-800 md:hidden">Tender/AI</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Bar Cantik */}
            <div className="hidden w-64 items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-500 transition-all hover:border-slate-300 hover:bg-white md:flex">
              <Search className="h-4 w-4 text-slate-400" />
              <input type="text" placeholder="Search..." className="bg-transparent outline-none w-full" />
              <kbd className="hidden rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-400 lg:inline-block">
                ⌘K
              </kbd>
            </div>

            {/* Profile & Notif */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative text-slate-500">
                <Bell className="h-5 w-5" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
              </Button>
              <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold ring-4 ring-slate-100">
                DA
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}

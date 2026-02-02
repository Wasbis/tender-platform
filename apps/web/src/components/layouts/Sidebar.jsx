"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LogOut, Zap } from "lucide-react";
import { useState } from "react";
import SidebarItem from "./SidebarItem";
import { MENU_ITEMS, SETTINGS_ITEMS } from "@/libs/data";
import { logoutAction } from "@/actions/auth-actions";

const sidebarVariants = {
  open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
  closed: { x: "-100%", transition: { type: "spring", stiffness: 300, damping: 30 } },
};

export function Sidebar({ isOpen }) {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (label) => {
    setExpandedSections((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isActive = (href) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <motion.aside
      variants={sidebarVariants}
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white shadow-2xl md:shadow-none">
      {/* 1. Header Logo */}
      <div className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-100 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-amber-500">
          <Zap className="h-5 w-5 fill-current" />
        </div>
        <span className="text-lg font-bold tracking-tight text-slate-900">
          Tender<span className="text-slate-400">/AI</span>
        </span>
      </div>

      {/* 2. Scrollable Menu */}
      <nav className="flex-1 overflow-y-auto px-4 py-4 scrollbar-hide">
        {MENU_ITEMS.map((item, index) => (
          <SidebarItem
            key={index}
            item={item}
            isActive={isActive}
            isExpanded={expandedSections[item.label]}
            onToggle={toggleSection}
          />
        ))}

        {/* Settings Group */}
        {SETTINGS_ITEMS.map((item, index) => (
          <SidebarItem
            key={`set-${index}`}
            item={item}
            isActive={isActive}
            isExpanded={expandedSections[item.label]}
            onToggle={toggleSection}
          />
        ))}
      </nav>

      {/* 3. Footer Profile */}
      <div className="border-t border-slate-100 p-4">
        <div className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3 transition-all hover:bg-slate-100">
          <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
            DA
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-semibold text-slate-900">Diya Async</p>
            <p className="truncate text-xs text-slate-500">Lead Engineer</p>
          </div>
          {/* <LogOut className="h-4 w-4 text-slate-400 hover:text-red-500" /> */}
          <button
            onClick={() => logoutAction()} // Panggil Server Action
            className="p-1 rounded hover:bg-slate-200 transition-colors"
            title="Sign Out">
            <LogOut className="h-4 w-4 text-slate-500 hover:text-red-400 transition-colors" />
          </button>
        </div>
      </div>
    </motion.aside>
  );
}

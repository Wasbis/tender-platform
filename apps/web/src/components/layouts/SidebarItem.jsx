"use client";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/libs/utils";

export default function SidebarItem({ item, isActive, isExpanded, onToggle }) {
  // 1. Header Label (Slate-500 di dark mode)
  if (item.type === "header") {
    return (
      <div className="px-4 py-2 mt-4 text-[10px] font-bold uppercase tracking-wider text-slate-600">{item.label}</div>
    );
  }

  // 2. Accordion Section
  if (item.type === "section") {
    const activeChild = item.items?.some((sub) => isActive(sub.href));

    return (
      <div className="mb-1">
        <button
          onClick={() => onToggle(item.label)}
          className={cn(
            "group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
            activeChild || isExpanded
              ? "bg-slate-900 text-white" // Active: Darker bg, White text
              : "text-slate-400 hover:bg-slate-900 hover:text-slate-200", // Inactive: Gray text, Dark hover
          )}>
          <div className="flex items-center gap-3">
            <item.icon
              className={cn("h-5 w-5", activeChild ? "text-amber-500" : "text-slate-500 group-hover:text-slate-300")}
            />
            <span>{item.label}</span>
          </div>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-slate-600 transition-transform duration-200",
              isExpanded ? "rotate-180 text-slate-400" : "",
            )}
          />
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden">
              <div className="mt-1 space-y-1 pl-11 pr-2">
                {item.items.map((sub, idx) => (
                  <Link
                    key={idx}
                    href={sub.href}
                    className={cn(
                      "block rounded-lg px-3 py-2 text-sm transition-colors",
                      isActive(sub.href)
                        ? "bg-amber-500/10 text-amber-500 font-medium border border-amber-500/20"
                        : "text-slate-500 hover:text-slate-300 hover:bg-slate-900",
                    )}>
                    {sub.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // 3. Link Biasa
  const active = isActive(item.href);
  return (
    <Link
      href={item.href}
      className={cn(
        "group mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
        active
          ? "bg-amber-500 text-slate-900 shadow-md shadow-amber-500/20 font-bold" // Active: Amber Button (Industrial Pop)
          : "text-slate-400 hover:bg-slate-900 hover:text-slate-200",
      )}>
      <item.icon className={cn("h-5 w-5", active ? "text-slate-900" : "text-slate-500 group-hover:text-slate-300")} />
      <span>{item.label}</span>
    </Link>
  );
}

"use client";

import Link from "next/link";
import { PipelineChart } from "@/components/charts/PipelineChart";
import Button from "@/components/ui/Button";
import { Briefcase, TrendingUp, CheckCircle2, AlertCircle, ArrowRight, Zap } from "lucide-react";
import { tenders, myKBLI } from "@/libs/dumy-data";
import { formatCurrency, formatDate } from "@/libs/utils";

// 1. IMPORT TOAST
import toast, { Toaster } from "react-hot-toast";

export default function DashboardPage() {
  // --- METRIK UTAMA ---
  const pipelineValue = tenders
    .filter((t) => !["Lost", "Rejected"].includes(t.status))
    .reduce((acc, curr) => acc + curr.value, 0);

  const activeTenders = tenders.filter((t) => ["New", "Qualified", "Drafting", "Submitted"].includes(t.status));

  const wonCount = tenders.filter((t) => t.status === "Won").length;
  const closedCount = tenders.filter((t) => ["Won", "Lost"].includes(t.status)).length;
  const winRate = closedCount > 0 ? Math.round((wonCount / closedCount) * 100) : 0;

  const actionNeededCount = tenders.filter((t) => {
    const daysLeft = Math.ceil((new Date(t.deadline) - new Date()) / (1000 * 60 * 60 * 24));
    return (
      t.status === "Drafting" || (daysLeft <= 7 && daysLeft >= 0 && !["Won", "Lost", "Rejected"].includes(t.status))
    );
  }).length;

  const newTendersCount = tenders.filter((t) => t.status === "New").length;
  const highMatchCount = tenders.filter((t) => myKBLI.includes(t.kbliCode)).length;

  // --- DATA CHART ---
  const grouped = {};
  const monthsOrder = [];
  const today = new Date();
  for (let i = 0; i < 6; i++) {
    const d = new Date(today.getFullYear(), today.getMonth() + i, 1);
    const monthName = d.toLocaleString("default", { month: "short" });
    grouped[monthName] = 0;
    monthsOrder.push(monthName);
  }

  tenders.forEach((t) => {
    if (!["Lost", "Rejected"].includes(t.status)) {
      const d = new Date(t.deadline);
      const monthName = d.toLocaleString("default", { month: "short" });
      if (grouped[monthName] !== undefined) {
        grouped[monthName] += t.value;
      }
    }
  });

  const chartData = monthsOrder.map((month) => ({
    name: month,
    total: parseFloat((grouped[month] / 1_000_000_000).toFixed(1)),
  }));

  const recentActivity = tenders.slice(0, 5);

  // --- HANDLER TOAST ---
  const handleViewLogs = () => {
    toast("Connecting to Scraper Engine...", {
      icon: "🤖",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  return (
    <div className="space-y-8 pb-10 relative">
      {/* 2. PASANG TOASTER */}
      <Toaster position="top-center" />

      {/* HERO BANNER */}
      <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-8 text-white shadow-2xl shadow-slate-200">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Scraper Engine: Online
            </div>

            <h2 className="text-3xl font-bold leading-tight md:text-4xl">Good Morning, Engineer! 🚀</h2>
            <p className="text-slate-400">
              Hari ini ada <span className="text-white font-bold">{newTendersCount} tender baru</span> masuk database.
              Sistem mendeteksi <span className="text-amber-400 font-bold">{highMatchCount} Peluang High-Match</span>{" "}
              berdasarkan KBLI kita.
            </p>
          </div>

          <div className="flex flex-col gap-3 min-w-[200px]">
            <Link href="/tenders">
              <Button variant="accent" size="lg" className="w-full shadow-lg shadow-amber-900/20">
                Process New Tenders
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="text-slate-300 hover:text-white hover:bg-white/10"
              onClick={handleViewLogs} // Panggil Toast
            >
              View Scraper Logs
            </Button>
          </div>
        </div>
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-amber-500/10 to-transparent"></div>
      </div>

      {/* KPI & CHARTS */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-7">
        <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              label: "Total Pipeline",
              val: formatCurrency(pipelineValue).split(",")[0],
              icon: Briefcase,
              color: "text-blue-600 bg-blue-50",
              trend: "Potential Value (Active)",
            },
            {
              label: "Active Tenders",
              val: `${activeTenders.length} Projects`,
              icon: TrendingUp,
              color: "text-emerald-600 bg-emerald-50",
              trend: `${newTendersCount} New Incoming`,
            },
            {
              label: "Win Rate",
              val: `${winRate}%`,
              icon: CheckCircle2,
              color: "text-amber-600 bg-amber-50",
              trend: `Based on ${closedCount} closed`,
            },
            {
              label: "Action Needed",
              val: `${actionNeededCount} Items`,
              icon: AlertCircle,
              color: "text-red-600 bg-red-50",
              trend: "Urgent / Drafting",
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="group flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1 truncate max-w-[150px]" title={stat.val}>
                    {stat.val}
                  </h3>
                </div>
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-4 font-medium">{stat.trend}</p>
            </div>
          ))}
        </div>

        <div className="lg:col-span-3 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm flex flex-col">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-800">Pipeline Projection</h3>
            <p className="text-xs text-slate-500">Estimasi nilai proyek aktif berdasarkan bulan deadline.</p>
          </div>
          <div className="flex-1 flex items-end">
            <PipelineChart data={chartData} />
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-800">Latest Intelligence</h3>
          <Link
            href="/tenders"
            className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1 group">
            View Full List <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="space-y-3">
          {recentActivity.map((tender) => {
            const isMatch = myKBLI.includes(tender.kbliCode);
            return (
              <Link href={`/tenders/${tender.id}`} key={tender.id}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 cursor-pointer group">
                  <div
                    className={`h-12 w-12 shrink-0 rounded-xl flex items-center justify-center transition-colors ${
                      isMatch
                        ? "bg-amber-100 text-amber-600 group-hover:bg-amber-500 group-hover:text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}>
                    {isMatch ? <Zap className="h-5 w-5" /> : <Briefcase className="h-5 w-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-slate-900 text-sm truncate">{tender.title}</h4>
                      {isMatch && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                          MATCH
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 truncate">
                      {tender.agency} • Deadline: {formatDate(tender.deadline)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-4 min-w-[140px]">
                    <span className="text-sm font-mono font-bold text-slate-700">
                      {formatCurrency(tender.value).split(",")[0]}
                    </span>
                    <div className="h-8 w-8 rounded-full flex items-center justify-center bg-slate-50 group-hover:bg-amber-100 text-slate-300 group-hover:text-amber-600 transition-colors">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

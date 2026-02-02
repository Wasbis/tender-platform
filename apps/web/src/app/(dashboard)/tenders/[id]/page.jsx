/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Building2,
  MapPin,
  CheckCircle2,
  FileText,
  BrainCircuit,
  Layers,
  Users,
  Download,
  Upload,
  ShieldAlert,
  TrendingUp,
  MoreHorizontal,
  Check,
  Plus,
  X,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { tenders } from "@/libs/dumy-data";
import { formatCurrency, formatDate } from "@/libs/utils";

// 1. IMPORT TOAST
import toast, { Toaster } from "react-hot-toast";

export default function TenderDetailPage() {
  const params = useParams();
  const router = useRouter();

  // --- 1. DATA FETCHING ---
  const tenderData = tenders.find((t) => t.id === params.id) || tenders[0];

  // --- 2. WORKFLOW STATE ---
  const stepMap = { New: 0, Qualified: 0, Drafting: 1, Review: 2, Submitted: 3 };
  const [currentStep, setCurrentStep] = useState(stepMap[tenderData.status] || 0);
  const workflowSteps = ["New", "Drafting", "Review", "Submitted"];

  useEffect(() => {
    setCurrentStep(stepMap[tenderData.status] || 0);
  }, [tenderData.id]);

  // --- 3. UI STATE ---
  const [activeTab, setActiveTab] = useState("overview");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [newTaskInput, setNewTaskInput] = useState("");

  // --- 4. DATA STATE ---
  const [tasks, setTasks] = useState([
    { id: 1, task: "Review Dokumen RKS", assignee: "Budi (Eng)", status: "done" },
    { id: 2, task: "Hitung Estimasi BOM (Bill of Material)", assignee: "Siti (Proc)", status: "pending" },
    { id: 3, task: "Drafting Dokumen Teknis", assignee: "Diya (Lead)", status: "in-progress" },
    { id: 4, task: "Final Review Harga", assignee: "Pak Bos", status: "pending" },
  ]);

  // --- HANDLERS (REFACTORED WITH TOAST) ---

  const handleNextStep = () => {
    if (currentStep < 3) {
      const next = currentStep + 1;
      setCurrentStep(next);
      // GANTI ALERT DENGAN TOAST
      toast.success(`Status updated to: ${workflowSteps[next]}`, {
        icon: "🚀",
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status: t.status === "done" ? "pending" : "done" } : t)));
  };

  const handleAddTask = () => {
    if (!newTaskInput.trim()) {
      toast.error("Task description cannot be empty!"); // Validasi pake Toast
      return;
    }
    const newTask = {
      id: Date.now(),
      task: newTaskInput,
      assignee: "You",
      status: "pending",
    };
    setTasks([...tasks, newTask]);
    setNewTaskInput("");
    setIsTaskModalOpen(false);
    toast.success("Task added to checklist");
  };

  // MAGIC: Toast Promise untuk Upload
  // Gak perlu lagi state `isUploading` manual, library yang handle loading UI-nya
  const handleUpload = () => {
    const uploadProcess = new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulasi sukses 90%, gagal 10%
        if (Math.random() > 0.1) resolve();
        else reject();
      }, 2000);
    });

    toast.promise(uploadProcess, {
      loading: "Uploading document...",
      success: <b>Document uploaded successfully!</b>,
      error: <b>Upload failed. Try again.</b>,
    });
  };

  // Mock Intelligence
  const intelligenceData = {
    winProbability: 78,
    competitors: [
      { name: "PT. Global Tech Solusi", strength: "High", risk: "Pricing War" },
      { name: "Mitra Integrasi Data", strength: "Medium", risk: "Incumbent" },
    ],
    risks: ["Deadline sangat ketat (< 14 hari)", "Persyaratan Bank Garansi 5%"],
    insights: "Pola spesifikasi mirip proyek Kemenkeu 2024. Fokus pada TKDN meningkatkan peluang.",
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 relative">
      {/* 2. PASANG TOASTER DISINI (Posisi Top Center biar kelihatan jelas) */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* --- HEADER --- */}
      <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur-md transition-all">
        <div className="mx-auto max-w-6xl">
          {/* Breadcrumb */}
          <div className="mb-4 flex items-center gap-2">
            <button
              onClick={() => router.back()}
              className="group flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-800">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Workspace
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-sm text-slate-400 font-mono">{tenderData.id}</span>
          </div>

          {/* Title & Actions */}
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-2xl font-bold text-slate-900 leading-tight">{tenderData.title}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Building2 className="h-4 w-4 text-slate-400" /> {tenderData.agency}
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-slate-400" /> {tenderData.location}
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-slate-400" /> Deadline:{" "}
                  <span className="font-medium text-amber-600">{formatDate(tenderData.deadline)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden text-right md:block">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Project Value</p>
                <p className="text-xl font-mono font-bold text-slate-900">{formatCurrency(tenderData.value)}</p>
              </div>
              <div className="h-8 w-px bg-slate-200 mx-2 hidden md:block"></div>
              <Button variant="secondary" icon={<MoreHorizontal className="h-4 w-4" />}></Button>
              <Button
                variant="primary"
                className={`shadow-xl shadow-slate-900/20 transition-all ${currentStep === 3 ? "bg-emerald-600 hover:bg-emerald-700" : "bg-slate-900 hover:bg-slate-800"}`}
                icon={currentStep === 3 ? <CheckCircle2 className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />}
                onClick={handleNextStep}
                disabled={currentStep === 3}>
                {currentStep === 0
                  ? "Start Drafting"
                  : currentStep === 1
                    ? "Send to Review"
                    : currentStep === 2
                      ? "Submit Proposal"
                      : "Proposal Submitted"}
              </Button>
            </div>
          </div>

          {/* Workflow Bar */}
          <div className="mt-6 flex items-center gap-1">
            {workflowSteps.map((step, idx) => {
              const isCompleted = idx <= currentStep;
              return (
                <div key={step} className="flex-1 group relative">
                  <div
                    className={`h-1.5 w-full rounded-full transition-all duration-500 ${isCompleted ? "bg-emerald-500" : "bg-slate-200"}`}></div>
                  <div className={`mt-2 flex items-center justify-center`}>
                    <p
                      className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${idx === currentStep ? "text-emerald-700" : isCompleted ? "text-emerald-600/70" : "text-slate-300"}`}>
                      {step}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- CONTENT --- */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Tab Nav */}
        <div className="mb-8 border-b border-slate-200 overflow-x-auto">
          <nav className="-mb-px flex space-x-8 min-w-max">
            {[
              { id: "overview", label: "Overview", icon: Layers },
              { id: "intelligence", label: "AI Intelligence", icon: BrainCircuit },
              { id: "documents", label: "Documents", icon: FileText },
              { id: "tasks", label: "Team Tasks", icon: Users },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group flex items-center gap-2 border-b-2 py-4 px-1 text-sm font-medium transition-colors ${activeTab === tab.id ? "border-amber-500 text-amber-600" : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700"}`}>
                <tab.icon
                  className={`h-4 w-4 ${activeTab === tab.id ? "text-amber-500" : "text-slate-400 group-hover:text-slate-500"}`}
                />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* --- OVERVIEW --- */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-slate-900">Project Scope & Requirements</h3>
                <div className="prose prose-sm prose-slate max-w-none text-slate-600">
                  <p>{tenderData.description || "Belum ada deskripsi detail."}</p>
                  <ul className="mt-4 space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5" />{" "}
                      <span>
                        Kualifikasi: <b>{tenderData.golongan || "Besar"}</b>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5" />{" "}
                      <span>
                        Metode: <b>{tenderData.jenisPengadaan || "Lelang Umum"}</b>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">Key Requirements</h3>
                <div className="flex flex-wrap gap-2">
                  {(tenderData.requirements || ["ISO 9001", "CSMS"]).map((req, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 border border-slate-200">
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-xl shadow-slate-200">
                <h4 className="text-sm font-medium text-slate-400">Sisa Waktu</h4>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-bold font-mono">
                    {Math.max(0, Math.ceil((new Date(tenderData.deadline) - new Date()) / (1000 * 60 * 60 * 24)))}
                  </span>
                  <span className="text-sm text-slate-400">Hari Lagi</span>
                </div>
                <div className="mt-4 h-1.5 w-full rounded-full bg-slate-700 overflow-hidden">
                  <div className="h-full w-[60%] rounded-full bg-amber-500"></div>
                </div>
                <p className="mt-2 text-xs text-slate-400 text-right">Closing: {formatDate(tenderData.deadline)}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h4 className="mb-4 text-sm font-bold text-slate-900">PIC Project</h4>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm border border-amber-200">
                    DA
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Diya Async</p>
                    <p className="text-xs text-slate-500">Lead Engineer</p>
                  </div>
                  <Button variant="ghost" size="sm" className="ml-auto text-xs">
                    Change
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- INTELLIGENCE --- */}
        {activeTab === "intelligence" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-2 fade-in">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col items-center justify-center text-center">
              <div className="relative flex items-center justify-center">
                <svg className="h-32 w-32 -rotate-90 transform" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path
                    className="text-emerald-500"
                    strokeDasharray={`${intelligenceData.winProbability}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-bold text-slate-900">{intelligenceData.winProbability}%</span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Win Rate</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-600">"Peluang menang tinggi, spesifikasi relevan."</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold text-slate-900 flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-red-500" /> Competitor Radar
              </h3>
              <div className="space-y-3">
                {intelligenceData.competitors.map((comp, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <div>
                      <p className="text-sm font-bold text-slate-800">{comp.name}</p>
                      <p className="text-xs text-slate-500">Risk: {comp.risk}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${comp.strength === "High" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>
                      {comp.strength} Threat
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-2 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-6">
              <h3 className="mb-2 text-sm font-bold text-indigo-900 flex items-center gap-2">
                <BrainCircuit className="h-4 w-4 text-indigo-600" /> AI Strategy Insight
              </h3>
              <p className="text-sm text-indigo-800 leading-relaxed">{intelligenceData.insights}</p>
            </div>
          </div>
        )}

        {/* --- TASKS --- */}
        {activeTab === "tasks" && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm animate-in slide-in-from-bottom-2 fade-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-900">Preparation Checklist</h3>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsTaskModalOpen(true)}
                icon={<Plus className="h-4 w-4" />}>
                Add Task
              </Button>
            </div>
            {isTaskModalOpen && (
              <div className="mb-4 flex gap-2 animate-in fade-in zoom-in-95">
                <input
                  type="text"
                  placeholder="What needs to be done?"
                  className="flex-1 rounded-lg border-slate-300 text-sm focus:ring-amber-500 focus:border-amber-500"
                  value={newTaskInput}
                  onChange={(e) => setNewTaskInput(e.target.value)}
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
                />
                <Button variant="primary" size="sm" onClick={handleAddTask}>
                  Save
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setIsTaskModalOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
            <div className="space-y-1">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="group flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer"
                  onClick={() => toggleTask(task.id)}>
                  <button
                    className={`h-5 w-5 rounded border flex items-center justify-center transition-colors ${task.status === "done" ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-300 hover:border-slate-400 bg-white"}`}>
                    {task.status === "done" && <Check className="h-3.5 w-3.5" />}
                  </button>
                  <div className="flex-1">
                    <p
                      className={`text-sm font-medium transition-all ${task.status === "done" ? "text-slate-400 line-through decoration-slate-400" : "text-slate-800"}`}>
                      {task.task}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="hidden sm:flex h-6 px-2 items-center rounded bg-slate-100 text-[10px] font-bold text-slate-500 uppercase">
                      {task.assignee}
                    </div>
                    <div
                      className={`h-2 w-2 rounded-full ${task.status === "done" ? "bg-emerald-500" : task.status === "in-progress" ? "bg-amber-500" : "bg-slate-300"}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- DOCUMENTS (NOW WITH TOAST) --- */}
        {activeTab === "documents" && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm min-h-[300px] flex flex-col items-center justify-center text-center animate-in slide-in-from-bottom-2 fade-in">
            <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Upload className="h-8 w-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Project Documents</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
              Belum ada dokumen yang diunggah. Upload RKS, KAK, atau Draft Proposal di sini.
            </p>
            <div className="flex gap-3">
              <Button variant="secondary" icon={<Download className="h-4 w-4" />}>
                Download Template
              </Button>
              {/* BUTTON UPLOAD PAKE HANDLE BARU */}
              <Button variant="primary" icon={<Upload className="h-4 w-4" />} onClick={handleUpload}>
                Upload File
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

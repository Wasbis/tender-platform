"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Filter,
  Download,
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  FileDown,
  Building2,
  Calendar,
} from "lucide-react";
import Button from "@/components/ui/Button";
import TenderDataTable from "@/components/tables/TenderDataTable";
import { myKBLI, tenders } from "@/libs/dumy-data";
import { formatCurrency, formatDate } from "@/libs/utils";

// 1. IMPORT TOAST
import toast, { Toaster } from "react-hot-toast";

export default function TendersPage() {
  const router = useRouter();

  // --- STATE ---
  const [activeTab, setActiveTab] = useState("All");
  const [sortConfig, setSortConfig] = useState("deadline-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter States
  const [activeFilters, setActiveFilters] = useState({ minPrice: "", maxPrice: "", location: "" });
  const [tempFilters, setTempFilters] = useState({ minPrice: "", maxPrice: "", location: "" });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isInputOpen, setIsInputOpen] = useState(false);

  // Detail Modal State
  const [selectedTender, setSelectedTender] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // --- LOGIC PIPELINE ---
  const uniqueLocations = useMemo(() => [...new Set(tenders.map((t) => t.location))].sort(), []);

  const processedData = useMemo(() => {
    let data = [...tenders];
    if (activeTab === "Matched (Priority)") data = data.filter((item) => myKBLI.includes(item.kbliCode));
    else if (activeTab === "Processing") data = data.filter((item) => ["Drafting", "Submitted"].includes(item.status));
    else if (activeTab === "Archived") data = data.filter((item) => ["Rejected", "Won", "Lost"].includes(item.status));

    if (activeFilters.minPrice) data = data.filter((item) => item.value >= Number(activeFilters.minPrice));
    if (activeFilters.maxPrice) data = data.filter((item) => item.value <= Number(activeFilters.maxPrice));
    if (activeFilters.location && activeFilters.location !== "Semua Lokasi") {
      data = data.filter((item) => item.location === activeFilters.location);
    }

    data.sort((a, b) => {
      switch (sortConfig) {
        case "deadline-asc":
          return new Date(a.deadline) - new Date(b.deadline);
        case "deadline-desc":
          return new Date(b.deadline) - new Date(a.deadline);
        case "value-desc":
          return b.value - a.value;
        case "value-asc":
          return a.value - b.value;
        default:
          return 0;
      }
    });
    return data;
  }, [activeTab, sortConfig, activeFilters]);

  // Perbaikan Pagination Logic
  const totalPages = Math.ceil(processedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = processedData.slice(startIndex, startIndex + itemsPerPage);

  // --- HANDLERS ---
  const handleViewDetail = (tender) => {
    setSelectedTender(tender);
    setIsDetailOpen(true);
  };

  const handleProcessFromModal = () => {
    if (selectedTender) {
      router.push(`/tenders/${selectedTender.id}`);
    }
  };

  // 2. EXPORT WITH TOAST PROMISE
  const handleExport = () => {
    const exportPromise = new Promise((resolve) => setTimeout(resolve, 2000));

    toast.promise(exportPromise, {
      loading: "Generating CSV Report...",
      success: <b>Report downloaded successfully!</b>,
      error: <b>Could not export data.</b>,
    });
  };

  const handleApplyFilter = () => {
    setActiveFilters(tempFilters);
    setCurrentPage(1);
    setIsFilterOpen(false);
    toast.success("Filters applied!");
  };

  const handleResetFilter = () => {
    const reset = { minPrice: "", maxPrice: "", location: "" };
    setTempFilters(reset);
    setActiveFilters(reset);
    setIsFilterOpen(false);
    toast("Filters reset", { icon: "↺" });
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="space-y-6 pb-10">
      {/* 3. PASANG TOASTER */}
      <Toaster position="top-center" />

      {/* HEADER & FILTER BUTTONS */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Tender Workspace</h2>
          <p className="text-sm text-slate-500">
            Found <span className="font-bold text-slate-900">{processedData.length}</span> tenders.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
              <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
            </div>
            <select
              value={sortConfig}
              onChange={(e) => setSortConfig(e.target.value)}
              className="h-9 pl-8 pr-3 text-sm border border-slate-300 rounded-md bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-200 cursor-pointer appearance-none hover:bg-slate-50">
              <option value="deadline-asc">Urgency (Deadline Terdekat)</option>
              <option value="deadline-desc">Relaxed (Deadline Terlama)</option>
              <option value="value-desc">High Value (Termahal)</option>
            </select>
          </div>
          <div className="h-6 w-px bg-slate-300 mx-1 hidden md:block"></div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsFilterOpen(true)}
            icon={<Filter className="h-4 w-4" />}>
            Filter
          </Button>

          <Button variant="secondary" size="sm" onClick={handleExport} icon={<Download className="h-4 w-4" />}>
            Export
          </Button>

          <Button variant="primary" size="sm" onClick={() => setIsInputOpen(true)} icon={<Plus className="h-4 w-4" />}>
            Manual Input
          </Button>
        </div>
      </div>

      {/* TABS */}
      <div className="flex items-center border-b border-slate-200 overflow-x-auto no-scrollbar">
        {["All", "Matched (Priority)", "Processing", "Archived"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-all whitespace-nowrap cursor-pointer ${activeTab === tab ? "border-amber-500 text-amber-600 bg-amber-50/50" : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"}`}>
            {tab === "All" ? "All Tenders" : tab}
          </button>
        ))}
      </div>

      {/* DATA TABLE */}
      <TenderDataTable
        data={currentData}
        myKBLI={myKBLI}
        startIndex={startIndex}
        onViewDetail={handleViewDetail}
        onProcess={(id) => router.push(`/tenders/${id}`)}
      />

      {/* PAGINATION UI (UPDATED) */}
      {processedData.length > 0 && (
        <div className="flex items-center justify-between border-t border-slate-200 bg-white px-4 py-3 sm:px-6 rounded-b-xl shadow-sm -mt-4 z-0 relative">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <p className="text-sm text-slate-700">
              Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
              <span className="font-medium">{Math.min(startIndex + itemsPerPage, processedData.length)}</span> of{" "}
              <span className="font-medium">{processedData.length}</span> results
            </p>

            {/* Logic Tombol Angka */}
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
              {/* Previous Button */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="cursor-pointer relative inline-flex items-center rounded-l-md px-2 py-2 text-slate-400 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed">
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-4 w-4" />
              </button>

              {/* Loop Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={`cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset focus:z-20 focus:outline-offset-0 ${
                    currentPage === pageNum
                      ? "z-10 bg-slate-900 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      : "text-slate-900 ring-slate-300 hover:bg-slate-50"
                  }`}>
                  {pageNum}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="cursor-pointer relative inline-flex items-center rounded-r-md px-2 py-2 text-slate-400 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed">
                <span className="sr-only">Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* --- MODAL DETAIL --- */}
      {isDetailOpen && selectedTender && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex justify-between items-start p-6 border-b border-slate-100">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Detail</h3>
                <div className="h-1 w-8 bg-slate-900 mt-1"></div>
              </div>
              <button
                onClick={() => setIsDetailOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-slate-800 leading-tight mb-2">{selectedTender.title}</h2>
              <div className="flex flex-wrap items-center gap-2 text-xs mb-6">
                <span className="bg-slate-100 text-slate-500 px-2 py-1 rounded">Undangan Prakualifikasi</span>
                <span className="text-slate-500">
                  Tayang hingga{" "}
                  <span className="font-semibold text-slate-700">{formatDate(selectedTender.deadline)}</span>,
                </span>
                <span className="text-slate-500">
                  Oleh <span className="font-bold text-lime-600 uppercase">{selectedTender.agency}</span>
                </span>
              </div>
              <div className="text-sm text-slate-600 leading-relaxed mb-6 border-l-4 border-slate-200 pl-4 italic">
                {selectedTender.description ||
                  "Tidak ada deskripsi rinci untuk tender ini. Silakan unduh dokumen attachment untuk informasi lebih lengkap."}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-xs mb-8 bg-slate-50 p-4 rounded-lg border border-slate-100">
                <div>
                  <span className="block font-bold text-slate-900 mb-1">Golongan Usaha</span>
                  <span className="text-slate-600">{selectedTender.golongan || "Besar Menengah Kecil"}</span>
                </div>
                <div>
                  <span className="block font-bold text-slate-900 mb-1">Jenis Pengadaan</span>
                  <span className="text-slate-600">{selectedTender.jenisPengadaan || "Jasa Lainnya"}</span>
                </div>
                <div className="md:col-span-2">
                  <span className="block font-bold text-slate-900 mb-1">Bidang Usaha (KBLI)</span>
                  <p className="text-slate-600 leading-relaxed uppercase">
                    {selectedTender.bidangUsaha ||
                      `AKTIVITAS JASA KONSULTASI (${selectedTender.kbliCode}); AKTIVITAS PENUNJANG LAINNYA.`}
                  </p>
                </div>
                <div>
                  <span className="block font-bold text-slate-900 mb-1">Nilai Pagu (HPS)</span>
                  <span className="font-mono text-slate-700 font-bold">{formatCurrency(selectedTender.value)}</span>
                </div>
                <div>
                  <span className="block font-bold text-slate-900 mb-1">Lokasi Pengerjaan</span>
                  <span className="text-slate-600">{selectedTender.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="#"
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 font-bold text-sm transition-colors group">
                  <FileDown className="h-4 w-4" />
                  <span className="group-hover:underline">Download Attachment</span>
                </a>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setIsDetailOpen(false)}>
                Kembali
              </Button>
              <Button variant="primary" onClick={handleProcessFromModal}>
                Process Strategy
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODALS LAINNYA --- */}
      <SimpleModal isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} title="Advanced Filter">
        <div className="space-y-4">
          <p className="text-sm text-slate-500">Filter lanjutan simulasi.</p>
          <div className="pt-2 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={handleResetFilter}>
              Reset
            </Button>
            <Button variant="primary" size="sm" onClick={handleApplyFilter}>
              Apply Filter
            </Button>
          </div>
        </div>
      </SimpleModal>
      <SimpleModal isOpen={isInputOpen} onClose={() => setIsInputOpen(false)} title="Manual Input">
        <div className="space-y-4">
          <p className="text-sm text-slate-500">Input manual simulasi.</p>
          <div className="pt-2 flex justify-end gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setIsInputOpen(false);
                toast.success("Draft saved!");
              }}>
              Save
            </Button>
          </div>
        </div>
      </SimpleModal>
    </div>
  );
}

// Modal Component Helper
function SimpleModal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 animate-in zoom-in-95">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-800">{title}</h3>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-slate-400" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

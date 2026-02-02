"use client";

import { useRef, useEffect } from "react";
import { ArrowRight, CheckCircle2, XCircle, FileText } from "lucide-react"; // Tambah Icon FileText
import Button from "@/components/ui/Button";
import { formatCurrency, formatDate, cn } from "@/libs/utils";

// Tambah prop 'onViewDetail'
export default function TenderDataTable({ data, myKBLI, onProcess, onViewDetail, startIndex = 0 }) {
  const tableContainerRef = useRef(null);

  useEffect(() => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop = 0;
    }
  }, [data]);

  const getDaysLeft = (deadline) => {
    const diff = new Date(deadline) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-280px)] rounded-xl border border-slate-200 bg-white shadow-sm">
      <div
        ref={tableContainerRef}
        className="flex-1 overflow-y-auto relative scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent scroll-smooth">
        <table className="w-full text-left text-sm border-separate border-spacing-0">
          <thead className="text-slate-500">
            <tr>
              <th className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50 px-4 py-4 font-semibold shadow-sm w-12 text-center">
                No
              </th>
              <th className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50 px-6 py-4 font-semibold shadow-sm">
                Status Match
              </th>
              <th className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50 px-6 py-4 font-semibold shadow-sm">
                Project Details
              </th>
              <th className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50 px-6 py-4 font-semibold shadow-sm">
                Nilai (HPS)
              </th>
              <th className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50 px-6 py-4 font-semibold shadow-sm">
                Deadline
              </th>
              <th className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50 px-6 py-4 font-semibold shadow-sm">
                Status
              </th>
              <th className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50 px-6 py-4 font-semibold text-right shadow-sm">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                  Tidak ada data.
                </td>
              </tr>
            ) : (
              data.map((tender, index) => {
                const isMatch = myKBLI.includes(tender.kbliCode);
                const daysLeft = getDaysLeft(tender.deadline);

                let progressColor = "bg-emerald-500";
                let progressWidth = "30%";
                if (daysLeft <= 3) {
                  progressColor = "bg-red-500";
                  progressWidth = "100%";
                } else if (daysLeft <= 7) {
                  progressColor = "bg-amber-500";
                  progressWidth = "60%";
                }

                return (
                  <tr key={tender.id} className="transition-colors hover:bg-slate-50/80 group">
                    <td className="px-4 py-4 align-top border-b border-slate-50 text-center text-slate-400 font-mono text-xs">
                      {startIndex + index + 1}
                    </td>

                    <td className="px-6 py-4 align-top border-b border-slate-50">
                      {isMatch ? (
                        <div className="inline-flex items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                          <CheckCircle2 className="h-3.5 w-3.5" /> MATCH
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
                          <XCircle className="h-3.5 w-3.5" /> Unmatch
                        </div>
                      )}
                      <div className="mt-1 text-[10px] text-slate-400 font-mono">Code: {tender.kbliCode}</div>
                    </td>

                    {/* CLICKABLE PROJECT DETAILS */}
                    <td className="px-6 py-4 align-top max-w-[300px] border-b border-slate-50">
                      {/* Judul jadi Link/Button */}
                      <button
                        onClick={() => onViewDetail(tender)}
                        className="text-left font-bold text-slate-900 line-clamp-2 leading-snug hover:text-amber-600 hover:underline transition-colors decoration-2 underline-offset-2">
                        {tender.title}
                      </button>
                      <div className="mt-1 text-xs text-slate-500 flex items-center gap-1">{tender.agency}</div>
                      <div className="mt-1 text-[10px] font-mono text-slate-400">ID: {tender.id}</div>
                    </td>

                    <td className="px-6 py-4 align-top font-mono font-medium text-slate-700 border-b border-slate-50">
                      {formatCurrency(tender.value)}
                    </td>

                    <td className="px-6 py-4 align-top border-b border-slate-50">
                      <div className="font-medium text-slate-700 text-xs">{formatDate(tender.deadline)}</div>
                      <div className="mt-2 h-1.5 w-24 rounded-full bg-slate-100 overflow-hidden">
                        <div className={`h-full rounded-full ${progressColor}`} style={{ width: progressWidth }} />
                      </div>
                      <div
                        className={`text-[10px] mt-1 font-medium ${daysLeft <= 3 ? "text-red-600 animate-pulse" : "text-slate-400"}`}>
                        {daysLeft < 0 ? "Expired" : `${daysLeft} days left`}
                      </div>
                    </td>

                    <td className="px-6 py-4 align-top border-b border-slate-50">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                          tender.status === "Qualified"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : tender.status === "New"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-slate-100 text-slate-600 border-slate-200",
                        )}>
                        {tender.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 align-top text-right border-b border-slate-50">
                      {/* Tombol Process tetap ada untuk Quick Action */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-slate-400 hover:text-slate-600"
                        onClick={() => onViewDetail(tender)}
                        icon={<FileText className="h-4 w-4" />}></Button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

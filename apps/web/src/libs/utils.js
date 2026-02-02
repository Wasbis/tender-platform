import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 1. CN (Class Name) Merger
 * Fungsinya buat menggabungkan class tailwind tanpa tabrakan.
 * Contoh: cn("bg-red-500", "bg-blue-500") -> Hasilnya "bg-blue-500" (yang terakhir menang)
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * 2. Format Rupiah
 * Usage: formatCurrency(15000) -> "Rp 15.000"
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * 3. Format Tanggal Indo
 * Usage: formatDate("2026-03-15") -> "Minggu, 15 Mar 2026"
 */
export function formatDate(dateString) {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

import { Bell, Search, User } from "lucide-react";
import Button from "@/components/ui/Button"; // Import Button Custom

export function TopNavbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      {/* Kiri: Search Bar */}
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search tender ID..."
            className="h-9 w-64 rounded-md border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
          />
        </div>
      </div>

      {/* Kanan: Notifikasi & Profile */}
      <div className="flex items-center gap-4">
        {/* Tombol Lonceng menggunakan Custom Button */}
        <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-700">
          <Bell className="h-5 w-5" />
          {/* Badge Merah */}
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </Button>
        <div className="h-8 w-px bg-slate-200"></div> {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <div className="text-sm font-medium text-slate-900">Diya Async</div>
            <div className="text-xs text-slate-500">Lead Engineer</div>
          </div>
          <div className="h-9 w-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
            <User className="h-5 w-5 text-slate-600" />
          </div>
        </div>
      </div>
    </header>
  );
}

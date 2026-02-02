import { NextResponse } from "next/server";

export function middleware(request) {
  // 1. Ambil cookie session dari browser user
  const session = request.cookies.get("session_token");

  // 2. Cek user lagi ada di halaman mana
  const { pathname } = request.nextUrl;

  // --- LOGIC PROTEKSI ---

  // KASUS A: User SUDAH Login (punya cookie), tapi mau buka halaman Login
  // Tindakan: Tendang balik ke Dashboard (Home)
  if (pathname === "/login" && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // KASUS B: User BELUM Login (gak punya cookie), tapi maksa masuk halaman selain Login
  // Tindakan: Tendang ke halaman Login
  if (pathname !== "/login" && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // KASUS C: Aman, silakan lanjut
  return NextResponse.next();
}

// --- CONFIG MATCHER ---
// Tentukan rute mana saja yang harus dicek oleh Middleware ini
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (opsional, tergantung setup)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

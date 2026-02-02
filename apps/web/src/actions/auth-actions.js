"use server";

import { cookies } from "next/headers";
import { users } from "@/libs/dumy-data";
import { redirect } from "next/navigation";

// Durasi session: 1 Hari
const MAX_AGE = 60 * 60 * 24;

export async function loginAction(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  // 1. Cari User di "Database"
  const user = users.find((u) => u.email === email);

  // 2. Validasi Password
  if (!user || user.passwordHash !== password) {
    return { message: "Email atau password salah!", status: "error" };
  }

  // 3. Set Cookie Session
  const sessionData = JSON.stringify({
    userID: user.userID,
    email: user.email,
    name: user.fullName,
    role: user.role,
  });

  // --- PERBAIKAN DI SINI (TAMBAH AWAIT) ---
  const cookieStore = await cookies(); // Tunggu promise selesai

  cookieStore.set("session_token", sessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: MAX_AGE,
    path: "/",
  });

  // 4. Redirect ke Dashboard
  redirect("/");
}

export async function logoutAction() {
  // --- PERBAIKAN DI SINI JUGA ---
  const cookieStore = await cookies();
  cookieStore.delete("session_token");

  redirect("/login");
}

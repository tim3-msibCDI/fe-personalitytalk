"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Footerrmhs from "@/components/footerrmhs";
import { usePathname } from "next/navigation";
import { getToken } from "@/lib/auth";

export default function UserLayout({ children }) {
  const pathname = usePathname();

  // Cek apakah halaman saat ini adalah "/konsultasi/chat"
  const isChatPage = pathname === "/konsultasi/chat";

  // Cek apakah halaman adalah halaman reset atau change password
  const isResetPasswordPage = pathname === "/lupa-password/request";
  const isChangePasswordPage = pathname === "/lupa-password/change-password";

  // Periksa apakah pengguna sudah login
  const isLoggedIn = Boolean(getToken());

  // Jika di halaman reset password, jangan tampilkan Navbar dan Footer
  if (isResetPasswordPage || isChangePasswordPage) {
    return <>{children}</>; // Hanya render children
  }

  return (
    <>
      <Navbar />
      {children}
      {/* Tampilkan Footerrmhs hanya jika belum login dan bukan di halaman chat */}
      {!isLoggedIn && !isChatPage && <Footerrmhs />}
      {/* Footer utama tidak muncul di halaman chat */}
      {!isChatPage && <Footer />}
    </>
  );
}

"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { usePathname } from "next/navigation";

export default function UserLayout({ children }) {
  const pathname = usePathname();

  // Cek apakah halaman saat ini adalah "/konsultasi/chat"
  const isChatPage = pathname === "/konsultasi/chat";

  const isResetPasswordPage = pathname === "/lupa-password/request";
  const isChangePasswordPage = pathname === "/lupa-password/change-password";

  // Jika di halaman reset password, jangan tampilkan Navbar dan Footer
  if (isResetPasswordPage || isChangePasswordPage) {
    return <>{children}</>; // Hanya render children
  }

  return (
    <>
      <Navbar />
      {children}
      {!isChatPage && <Footer />} {/* Sembunyikan Footer jika di halaman Chat */}
    </>
  );
}

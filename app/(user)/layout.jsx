"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Footerrmhs from "@/components/footerrmhs";
import Loading from "@/components/loading/loading";
import { usePathname } from "next/navigation";
import { getToken } from "@/lib/auth";
import { useEffect, useState } from "react";

export default function UserLayout({ children }) {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  // Cek apakah halaman saat ini adalah "/konsultasi/chat"
  const isChatPage = pathname === "/konsultasi/chat";

  // Cek apakah halaman adalah halaman reset atau change password
  const isResetPasswordPage = pathname === "/lupa-password/request";
  const isChangePasswordPage = pathname === "/lupa-password/change-password";

  useEffect(() => {
    const token = getToken();
    setIsLoggedIn(Boolean(token));
    setIsAuthChecked(true); // Auth check selesai
  }, []);

  // Jika di halaman reset password, jangan tampilkan Navbar dan Footer
  if (isResetPasswordPage || isChangePasswordPage) {
    return <>{children}</>; // Hanya render children
  }

  // Tampilkan loader jika auth belum diperiksa
  if (!isAuthChecked) {
    return <Loading/>;
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

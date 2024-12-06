"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { usePathname } from "next/navigation";

export default function UserLayout({ children }) {
  const pathname = usePathname();

  // Cek apakah halaman saat ini adalah "/konsultasi/chat"
  const isChatPage = pathname === "/konsultasi/chat";

  return (
    <>
      <Navbar />
      {children}
      {!isChatPage && <Footer />} {/* Sembunyikan Footer jika di halaman Chat */}
    </>
  );
}

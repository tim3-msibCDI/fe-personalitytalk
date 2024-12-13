"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/sidebar/sidebar";

export default function LayoutDashboard({ children }) {
  const path = usePathname();

  const Login = ["/admin/login"];

  if (Login.includes(path)) {
    return children;
  }

  // Cek apakah halaman saat ini adalah "/psikolog/chat"
  const isChatPage = path === "/psikolog/chat/id";

  return (
    <section className="flex flex-1">
      {/* Sidebar dengan posisi fixed */}
      {!isChatPage && (
        <div className="fixed top-0 left-0 h-full w-[15%] bg-white shadow-lg z-40">
          <Sidebar />
        </div>
      )}
      {/* Main Content */}
      <div className={`flex flex-col w-full ${!isChatPage ? "ml-[15%]" : ""}`}>
        <main>{children}</main>
      </div>
    </section>
  );
}

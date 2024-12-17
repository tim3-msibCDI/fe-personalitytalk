"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/sidebar/sidebar";

export default function LayoutDashboard({ children }) {
  const path = usePathname();

  const Login = ["/admin/login"];

  if (Login.includes(path)) {
    return children;
  }

  return (
    <section className="flex h-screen">
      {" "}
      {/* Pastikan tinggi penuh */}
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-auto">
        {" "}
        {/* flex-1 untuk sisa ruang */}
        <main className="overflow-y-auto">{children}</main>
      </div>
    </section>
  );
}

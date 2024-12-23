"use client";

import { usePathname } from "next/navigation";
import TopbarAdmin from "@/components/dashboard/section/topbar-admin";
import { Suspense } from "react";

export default function AdminLayout({ children }) {
  const path = usePathname();

  const Login = ["/admin/login"];

  if (Login.includes(path)) {
    return children;
  }

  return (
    <div className="default-layout">
      <TopbarAdmin />
      <Suspense fallback={<div>Loading...</div>}>
        <div>{children}</div>
      </Suspense>
    </div>
  );
}

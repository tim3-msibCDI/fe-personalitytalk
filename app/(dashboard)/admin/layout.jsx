"use client"

import { usePathname } from "next/navigation";
import HeaderAdmin from "@/components/dashboard/section/header-admin";
import TopbarAdmin from "@/components/dashboard/section/topbar-admin";

export default function AdminLayout({ children }) {
  const path = usePathname();

	const Login = ["/admin/login"];
  
	if (Login.includes(path)) {
	  return children;
	}
  
  return (
    <div className="default-layout">
      <TopbarAdmin />  
      <HeaderAdmin />
      <div className="p-6">{children}</div>
    </div>
  );
}

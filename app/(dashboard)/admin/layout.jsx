"use client"

import { usePathname } from "next/navigation";
import HeaderAdmin from "@/components/dashboard/section/header-admin";
import Topbar from "@/components/dashboard/section/topbar";

export default function AdminLayout({ children }) {
  const path = usePathname();

	const Login = ["/admin/login"];
  
	if (Login.includes(path)) {
	  return children;
	}
  
  return (
    <div className="default-layout">
      <Topbar />  
      <HeaderAdmin />
      <div className="p-6">{children}</div>
    </div>
  );
}

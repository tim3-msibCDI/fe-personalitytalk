"use client"

import { usePathname } from "next/navigation";
import Header from "@/components/dashboard/section/header";
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
      <Header />
      <div className="p-6">{children}</div>
    </div>
  );
}

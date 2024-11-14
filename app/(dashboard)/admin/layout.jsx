"use client"

import { usePathname } from "next/navigation";
import Header from "@/components/dashboard/section/header";

export default function AdminLayout({ children }) {
  const path = usePathname();

	const Login = ["/admin/login"];
  
	if (Login.includes(path)) {
	  return children;
	}
  
  return (
    <div className="default-layout">
      <Header />
      <div>{children}</div>
    </div>
  );
}

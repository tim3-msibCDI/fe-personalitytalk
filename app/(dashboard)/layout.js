"use client"

import { usePathname } from "next/navigation";
import Sidebar from "@/components/sidebar/sidebar";

export default function LayoutDashboard({ children }) {
	const path = usePathname();

	const Login = ["/admin/login"];
  
	if (Login.includes(path)) {
	  return children;
	}

	// Cek apakah halaman saat ini adalah "/psikolog/chat"
	const isChatPage = path === "/psikolog/chat";

	return (
		<section className="flex flex-1">
			{!isChatPage && <Sidebar />}
			<div className="flex flex-col w-full h-full">
				<main>{children}</main>
			</div>
		</section>
	);
}
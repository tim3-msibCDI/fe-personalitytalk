"use client";

import { usePathname } from "next/navigation";
import HeaderPsikolog from "@/components/dashboard/section/header-psikolog";
import TopbarPsikolog from "@/components/dashboard/section/topbar-psikolog";

export default function PsikologLayout({ children }) {
    const path = usePathname();

	const Login = ["/login"];
  
	if (Login.includes(path)) {
	  return children;
	}

    // Cek apakah halaman saat ini adalah "/psikolog/chat"
    const isChatPage = path === "/psikolog/chat";
    
    return (
        <div>
            {!isChatPage && <TopbarPsikolog />}
            {!isChatPage && <HeaderPsikolog />}
            <div>{children}</div>
        </div>
    );
}
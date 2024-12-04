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
    
    return (
        <div>
            <TopbarPsikolog />
            <HeaderPsikolog />
            <div className="p-6">{children}</div>
        </div>
    );
}
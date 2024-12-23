"use client";

import { usePathname } from "next/navigation";
import HeaderPsikolog from "@/components/dashboard/section/header-psikolog";
import TopbarPsikolog from "@/components/dashboard/section/topbar-psikolog";
import { UserProvider } from "@/constants/UserContext";

export default function PsikologLayout({ children }) {
    const path = usePathname();

    const Login = ["/login"];
    const isChatPage = /^\/psikolog\/chat\/.+$/.test(path); // Deteksi path untuk "/psikolog/chat/[id]"

    // Jika halaman adalah "/login", langsung render children tanpa layout
    if (Login.includes(path)) {
        return children;
    }

    return (
        <UserProvider>
            {/* Tampilkan Topbar dan Header kecuali pada halaman "/psikolog/chat/[id]" */}
            <TopbarPsikolog />
            {!isChatPage && <HeaderPsikolog />}
            <div>{children}</div>
        </UserProvider>
    );
}
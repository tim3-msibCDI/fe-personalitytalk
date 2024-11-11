"use client";

import { usePathname } from "next/navigation";
import SidebarMenu from "./sidebar_menu";

export default function Sidebar() {
  const pathname = usePathname();
  
  // Tentukan menuType berdasarkan path
  const isPsychologistPath = pathname.startsWith("/psikolog");
  const isAdminPath = pathname.startsWith("/admin");

  const menuType = isAdminPath ? "admin" : isPsychologistPath ? "psychologist" : null;

  // Tampilkan sidebar hanya jika `menuType` teridentifikasi
  if (!menuType) return null;

  return (
    <aside>
      <SidebarMenu menuType={menuType} />
    </aside>
  );
}

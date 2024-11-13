"use client";

import { PSIKOLOG_MENU } from "@/constants";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [headerTitle, setHeaderTitle] = useState("Dashboard"); // Set default title
  
  useEffect(() => {
    // Fungsi untuk mencari item berdasarkan pathname
    const findMenuTitle = (path) => {
      for (const item of PSIKOLOG_MENU) {
        if (item.url === path) {
          return item.headername; // Menemukan headername sesuai URL
        }
        if (item.subMenu) {
          const subItem = item.subMenu.find((sub) => sub.url === path);
          if (subItem) {
            return subItem.headername;
          }
        }
      }
      return "Dashboard"; // Default jika tidak ada yang cocok
    };

    // Set headerTitle berdasarkan pathname saat ini
    const currentTitle = findMenuTitle(pathname);
    setHeaderTitle(currentTitle);
  }, [pathname]);

  return (
    <header className="px-4 py-7">
      <h1 className="font-semibold text-h1">{headerTitle}</h1>
    </header>
  );
}

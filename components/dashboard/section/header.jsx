"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [headerTitle, setHeaderTitle] = useState("Dashboard");

  useEffect(() => {
    // Mengambil segmen terakhir dari pathname
    const pathSegments = pathname.split("/").filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];

    // Fungsi untuk mengubah slug menjadi judul dengan spasi dan kapitalisasi
    const formatTitle = (text) => {
      return text
        .replace(/-/g, " ") // Mengganti tanda "-" dengan spasi
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Kapitalisasi setiap kata
    };

    // Set headerTitle berdasarkan segmen terakhir
    setHeaderTitle(formatTitle(lastSegment || "Dashboard"));
  }, [pathname]);

  return (
    <header className="px-4 mt-7">
      <h1 className="font-semibold text-h1">{headerTitle}</h1>
    </header>
  );
}

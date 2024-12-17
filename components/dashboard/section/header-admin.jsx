"use client";

import { useEffect, useState } from "react";
import Breadcrumbs from "./breadcrumbs";

export default function HeaderAdmin({ addButton }) {
  const [pathname, setPathname] = useState("");

  // Mengakses window.location.pathname di client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Decode pathname agar karakter URL-encoded seperti %20 menjadi spasi
      setPathname(decodeURIComponent(window.location.pathname));
    }
  }, []);

  const getTitle = (pathname) => {
    if (!pathname) return "";
    const segments = pathname.split("/");
    const lastSegment = segments[segments.length - 1];
    return capitalizeWords(lastSegment.replace("-", " "));
  };

  const capitalizeWords = (text) => {
    return text
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const isSettingsPage = pathname.startsWith("/admin/pengaturan");

  return (
    <header className="px-6 mt-7">
      {/* Breadcrumbs */}
      <Breadcrumbs />

      {!isSettingsPage && (
        <div className="flex justify-between items-center">
          {/* Header Title */}
          <h1 className="font-semibold text-h1">{getTitle(pathname)}</h1>

          {/* Tombol Tambah Data (dari props jika tersedia) */}
          {addButton && <div>{addButton}</div>}
        </div>
      )}
    </header>
  );
}

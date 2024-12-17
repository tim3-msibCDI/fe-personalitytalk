"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    const pathSegments = pathname
      .split("/")
      .filter(Boolean)
      .map((segment) => decodeURIComponent(segment)); // Decode each segment

    // Fungsi untuk mengubah slug menjadi judul dengan spasi dan kapitalisasi
    const formatTitle = (text) => {
      return text
        .replace(/-/g, " ") // Mengganti tanda "-" dengan spasi
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Kapitalisasi setiap kata
    };

    // Membuat breadcrumbs dengan setiap segmen menjadi link
    const breadcrumbItems = pathSegments.map((segment, index) => {
      const url = "/" + pathSegments.slice(0, index + 1).join("/");
      return { title: formatTitle(segment), url };
    });

    setBreadcrumbs(breadcrumbItems);
  }, [pathname]);

  return (
    <nav className="text-sm text-textcolor mb-2">
      <ul className="flex items-center space-x-1">
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <li key={index} className="flex items-center">
              {isLast ? (
                // Breadcrumb terakhir dengan font tebal dan warna berbeda
                <span className="font-semibold text-primary">
                  {breadcrumb.title}
                </span>
              ) : (
                // Breadcrumb biasa dengan link
                <Link href={breadcrumb.url} className="hover:underline">
                  {breadcrumb.title}
                </Link>
              )}
              {index < breadcrumbs.length - 1 && (
                <span className="mx-2 text-gray-400">/</span> // Separator
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function HeaderAdmin() {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    const pathSegments = pathname.split("/").filter(Boolean);

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

  // Kondisi untuk menampilkan tombol Tambah Data
  const showAddButton =
    pathname === "/admin/pengguna/umum" ||
    pathname === "/admin/pengguna/mahasiswa" ||
    pathname === "/admin/psikolog/psikolog";

  // Tentukan URL tujuan berdasarkan pathname
  const getAddDataUrl = () => {
    if (pathname === "/admin/pengguna/umum") {
      return "/admin/pengguna/umum/tambah-pengguna";
    }
    if (pathname === "/admin/pengguna/mahasiswa") {
      return "/admin/pengguna/mahasiswa/tambah-mahasiswa";
    }
    if (pathname === "/admin/psikolog/psikolog") {
      return "/admin/psikolog/psikolog/tambah-psikolog";
    }
    return `${pathname}/tambah`; // Default behavior
  };

  return (
    <header className="px-6 mt-7">
      {/* Breadcrumbs */}
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

      {/* Header Title dan Tombol */}
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-h1">
          {breadcrumbs[breadcrumbs.length - 1]?.title || "Dashboard"}
        </h1>

        {/* Tombol Tambah Data */}
        {showAddButton && (
          <Link
            href={getAddDataUrl()} // URL berdasarkan kondisi
            className="px-4 py-2 text-white bg-primary rounded-lg flex items-center space-x-2 hover:bg-primarydark"
          >
            <img
              src="/icons/dashboard/add-data.svg" // Ganti dengan path ikon Anda
              alt="Tambah"
              className="w-4 h-4"
            />
            <span>Tambah Data</span>
          </Link>
        )}
      </div>
    </header>
  );
}

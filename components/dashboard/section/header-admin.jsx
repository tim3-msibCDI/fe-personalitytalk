import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "./breadcrumbs";
import { useState } from "react";
import AddPriceModal from "@/components/popup/addpricepsikolog";

export default function HeaderAdmin() {
  const pathname = usePathname();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal

  // Fungsi untuk menentukan judul berdasarkan pathname
  const getTitle = () => {
    if (!pathname) return "Judul"; // Default jika pathname tidak tersedia
    const segments = pathname.split("/"); // Memisahkan pathname berdasarkan "/"
    const lastSegment = segments[segments.length - 1]; // Mengambil segmen terakhir
    return capitalize(lastSegment.replace("-", " ")); // Mengubah format ke kapitalisasi
  };

  // Fungsi untuk kapitalisasi teks
  const capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  // Kondisi untuk menampilkan tombol Tambah Data
  const showAddButton =
    pathname === "/admin/pengguna/umum" ||
    pathname === "/admin/pengguna/mahasiswa" ||
    pathname === "/admin/psikolog/psikolog" ||
    pathname === "/admin/psikolog/harga-psikolog" ||
    pathname === "/admin/konsultasi/topik-konsultasi" ||
    pathname === "/admin/lainnya/mitra";

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
    if (pathname === "/admin/lainnya/mitra") {
      return "/admin/psikolog/psikolog/tambah-psikolog";
    }
    if (pathname === "/admin/psikolog/harga-psikolog") {
      return null; // Tidak diarahkan ke URL, tetapi membuka modal
    }
    if (pathname === "/admin/konsultasi/topik-konsultasi") {
      return "/admin/psikolog/psikolog/tambah-psikolog";
    }
    return `${pathname}/tambah`; // Default behavior
  };

  // Cek apakah berada di path admin/pengaturan/*
  const isSettingsPage = pathname.startsWith("/admin/pengaturan");

  // Fungsi untuk membuka dan menutup modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false); // Defined closeModal function

  // Modal close handler
  const handleClose = () => {
    closeModal(); // Close modal when triggered
  };

  const handleDataUpdated = () => {
    router.refresh();
    closeModal();
  };

  return (
    <header className="px-6 mt-7">
      {/* Breadcrumbs */}
      <Breadcrumbs />

      {!isSettingsPage && (
        <div className="flex justify-between items-center">
          {/* Header Title */}
          <h1 className="font-semibold text-h1">{getTitle()}</h1>

          {/* Tombol Tambah Data */}
          {showAddButton && (
            <>
              {pathname === "/admin/psikolog/harga-psikolog" ? (
                // Tombol untuk membuka modal
                <button
                  onClick={openModal}
                  className="px-4 py-2 text-white bg-primary rounded-lg flex items-center space-x-2 hover:bg-primarydark"
                >
                  <img
                    src="/icons/dashboard/add-data.svg" // Ganti dengan path ikon Anda
                    alt="Tambah"
                    className="w-4 h-4"
                  />
                  <span>Tambah Data</span>
                </button>
              ) : (
                // Link untuk halaman lain
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
            </>
          )}
        </div>
      )}

      {/* Modal Tambah Harga */}
      {pathname === "/admin/psikolog/harga-psikolog" && (
        <AddPriceModal
          isOpen={isModalOpen}
          onClose={handleClose}
          modalType="add"
          onDataUpdated={handleDataUpdated}
        />
      )}
    </header>
  );
}

"use client";

import { usePathname, useRouter } from "next/navigation";
import AddButton from "../button/add-button";

export default function NavigationPaymentButton() {
  const pathname = usePathname(); // Mendapatkan path saat ini
  const router = useRouter(); // Router untuk navigasi

  // Helper function untuk menentukan apakah tombol aktif
  const isActive = (path) => pathname === path;

  return (
    <div className="flex justify-between items-center space-x-4 py-4">
      <div className="space-x-4">
        {/* Konsultasi Button */}
        <button
          onClick={() => router.push("/admin/keuangan/transaksi")}
          className={`px-4 py-2 rounded-md font-medium transition ${
            isActive("/admin/keuangan/transaksi")
              ? "bg-primary text-white"
              : "border border-primary text-primary hover:bg-primary hover:text-white"
          }`}
        >
          Konsultasi
        </button>

        {/* Psikolog Button */}
        <button
          onClick={() => router.push("/admin/keuangan/transaksi/psikolog")}
          className={`px-4 py-2 rounded-md font-medium transition ${
            isActive("/admin/keuangan/transaksi/psikolog")
              ? "bg-primary text-white"
              : "border border-primary text-primary hover:bg-primary hover:text-white"
          }`}
        >
          Psikolog
        </button>
      </div>

      {/* Add Button */}
      {isActive("/admin/keuangan/transaksi/psikolog") && (
        <div>
          <AddButton />
        </div>
      )}
    </div>
  );
}

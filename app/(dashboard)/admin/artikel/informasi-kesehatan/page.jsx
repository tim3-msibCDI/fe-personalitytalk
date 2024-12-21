"use client";

import HeaderAdmin from "@/components/dashboard/section/header-admin";
import Table from "@/components/dashboard/table/table";
import AddButton from "@/components/dashboard/button/add-button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InformasiKesehatanPage() {
  const router = useRouter();

  // Fungsi untuk navigasi ke halaman tambah data baru
  const handleAddData = () => {
    router.push(
      "/admin/artikel/informasi-kesehatan/tambah-informasi-kesehatan"
    );
  };

  // Fungsi untuk membuka modal kategori
  const handleKategori = () => {
    setIsCategoryModalOpen(true);
  };

  return (
    <>
      <HeaderAdmin
        addButton={<AddButton onClick={handleAddData} text="Tambah Data" />}
      />
      <div className="p-6">
        <div className="bg-primarylight2 p-6 rounded-lg">
          <Table />
        </div>
      </div>
    </>
  );
}

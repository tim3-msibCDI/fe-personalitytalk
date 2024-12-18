"use client";

import Table from "@/components/dashboard/table/table";
import HeaderAdmin from "@/components/dashboard/section/header-admin";
import AddButton from "@/components/dashboard/button/add-button";
import CategoryButton from "@/components/dashboard/button/kategori-button";
import AddCategoryModal from "@/components/popup/addcategorymodal";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ArtikelAdmin() {
  const router = useRouter();
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // Fungsi untuk navigasi ke halaman tambah artikel
  const handleAddArtikel = () => {
    router.push("/admin/artikel/artikel/tambah-artikel");
  };

  // Fungsi untuk membuka modal kategori
  const handleKategoriArtikel = () => {
    setIsCategoryModalOpen(true);
  };

  // Fungsi untuk menutup modal kategori
  const handleCloseCategoryModal = () => {
    setIsCategoryModalOpen(false);
  };

  return (
    <>
      <HeaderAdmin
        addButton={<AddButton onClick={handleAddArtikel} text="Tambah Data" />}
        kategoriButton={
          <CategoryButton
            onClick={handleKategoriArtikel}
            text="Kelola Kategori"
          />
        }
      />
      <div className="p-6">
        <div className="bg-primarylight2 p-6 rounded-lg">
          <Table />
        </div>
      </div>

      {/* AddCategoryModal */}
      <AddCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={handleCloseCategoryModal}
      />
    </>
  );
}

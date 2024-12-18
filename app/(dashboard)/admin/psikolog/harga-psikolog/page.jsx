"use client"
import { mutate } from "swr";
import Table from "@/components/dashboard/table/table";
import HeaderAdmin from "@/components/dashboard/section/header-admin";
import { useState } from "react";
import AddPriceModal from "@/components/popup/addpricepsikolog";
import AddButton from "@/components/dashboard/button/add-button";
import { SkeletonTable } from "@/components/dashboard/table/skeleton-table";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function HargaPsikolog() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Fungsi ini akan dipanggil ketika data berhasil ditambahkan
  const handleDataUpdated = async () => {
    setLoading(true);
    closeModal();

    try {
      // Memperbarui data tabel melalui mutate SWR
      await mutate(`${API_URL}/admin/psikolog-price?page=1`);
    } catch (error) {
      console.error("Gagal memperbarui tabel:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeaderAdmin
        addButton={<AddButton onClick={openModal} text="Tambah Harga" />}
      />
      <div className="p-6">
        <div className="bg-primarylight2 p-6 rounded-lg">
          {loading ? <SkeletonTable /> : <Table />}
        </div>
      </div>

      {/* Modal Tambah Harga */}
      <AddPriceModal
        isOpen={isModalOpen}
        onClose={closeModal}
        modalType="add"
        onDataUpdated={handleDataUpdated}
      />
    </>
  );
}

"use client";

import { useState } from "react";
import { mutate } from "swr";
import Table from "@/components/dashboard/table/table";
import HeaderAdmin from "@/components/dashboard/section/header-admin";
import AddTopicModal from "@/components/popup/addtopic";
import AddButton from "@/components/dashboard/button/add-button";
import { SkeletonTable } from "@/components/dashboard/table/skeleton-table";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function TopicPsikologPage() {
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal
  const [loading, setLoading] = useState(false); // State untuk loading tabel

  const openModal = () => setIsModalOpen(true); // Buka modal
  const closeModal = () => setIsModalOpen(false); // Tutup modal

  // Fungsi untuk memperbarui data tabel setelah tambah topik
  const handleDataUpdated = async () => {
    setLoading(true);
    closeModal();

    try {
      // Mutasi data SWR agar tabel diperbarui
      await mutate(`${API_URL}/admin/topics?page=1`);
    } catch (error) {
      console.error("Gagal memperbarui tabel:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header Admin dengan tombol Tambah */}
      <HeaderAdmin
        addButton={<AddButton onClick={openModal} text="Tambah Topik" />}
      />

      {/* Wrapper Tabel */}
      <div className="p-6">
        <div className="bg-primarylight2 p-6 rounded-lg">
          {loading ? <SkeletonTable /> : <Table />}
        </div>
      </div>

      {/* Modal Tambah Topik */}
      <AddTopicModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onDataUpdated={handleDataUpdated}
      />
    </>
  );
}

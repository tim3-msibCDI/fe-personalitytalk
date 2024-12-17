"use client";

import Table from "@/components/dashboard/table/table";
import HeaderAdmin from "@/components/dashboard/section/header-admin";
import { useState } from "react";
import AddPriceModal from "@/components/popup/addpricepsikolog";
import AddButton from "@/components/dashboard/button/add-button";
import { useRouter } from "next/navigation";
import { SkeletonTable } from "@/components/dashboard/table/skeleton-table";

export default function HargaPsikolog() {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for controlling modal visibility
  const [loading, setLoading] = useState(false); // State for controlling loading state of table
  const router = useRouter(); // Initialize router

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  // Function to handle data update and page reload
  const handleDataUpdated = () => {
    setLoading(true); s
    closeModal(); // Close the modal after data is added
  };

  return (
    <>
      <HeaderAdmin
        addButton={<AddButton onClick={openModal} text="Tambah Harga" />} // Use AddButton to open modal
      />
      <div className="p-6">
        <div className="bg-primarylight2 p-6 rounded-lg">
          {/* Show loading indicator if loading state is true */}
          {loading ? <SkeletonTable /> : <Table />}
        </div>
      </div>

      {/* AddPriceModal */}
      <AddPriceModal
        isOpen={isModalOpen}
        onClose={closeModal}
        modalType="add"
        onDataUpdated={handleDataUpdated} // Pass the handleDataUpdated function
      />
    </>
  );
}

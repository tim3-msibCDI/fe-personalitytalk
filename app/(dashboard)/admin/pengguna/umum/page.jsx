"use client";

import Table from "@/components/dashboard/table/table";
import HeaderAdmin from "@/components/dashboard/section/header-admin";
import { useRouter } from "next/navigation";
import AddButton from "@/components/dashboard/button/add-button";

export default function HargaPsikolog() {
  const router = useRouter();

  // Fungsi untuk meng-handle navigasi
  const handleAddPrice = () => {
    router.push("/admin/psikolog/harga-psikolog/tambah-harga");
  };

  return (
    <>
      <HeaderAdmin
        addButton={<AddButton onClick={handleAddPrice} text="Tambah Harga" />}
      />
      <div className="p-6">
        <div className="bg-primarylight2 p-6 rounded-lg">
          <Table />
        </div>
      </div>
    </>
  );
}

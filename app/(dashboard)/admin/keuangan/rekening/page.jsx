"use client";

import Table from "@/components/dashboard/table/table";
import HeaderAdmin from "@/components/dashboard/section/header-admin";
import AddButton from "@/components/dashboard/button/add-button";
import { useRouter } from "next/navigation";

export default function RekeningPage() {
  const router = useRouter();

  // Fungsi untuk meng-handle navigasi
  const handleAddRekening = () => {
    router.push("/admin/keuangan/rekening/tambah-rekening");
  };
  return (
    <>
      <HeaderAdmin
        addButton={<AddButton onClick={handleAddRekening} text="Tambah Data" />}
      />
      <div className="p-6">
        <div className="bg-primarylight2 p-6 rounded-lg">
          <Table />
        </div>
      </div>
    </>
  );
}

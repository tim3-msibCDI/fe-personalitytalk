"use client";

import Table from "@/components/dashboard/table/table";
import HeaderAdmin from "@/components/dashboard/section/header-admin";
import { useRouter } from "next/navigation";
import AddButton from "@/components/dashboard/button/add-button";

export default function PenggunaUmumPage() {
  const router = useRouter();

  // Fungsi untuk meng-handle navigasi
  const handleAddUsers = () => {
    router.push("/admin/pengguna/umum/tambah-pengguna");
  };

  return (
    <>
      <HeaderAdmin
        addButton={<AddButton onClick={handleAddUsers} text="Tambah Data" />}
      />
      <div className="p-6">
        <div className="bg-primarylight2 p-6 rounded-lg">
          <Table />
        </div>
      </div>
    </>
  );
}

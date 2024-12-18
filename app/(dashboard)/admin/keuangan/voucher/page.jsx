"use client";
import Table from "@/components/dashboard/table/table";
import HeaderAdmin from "@/components/dashboard/section/header-admin";
import AddButton from "@/components/dashboard/button/add-button";
import { useRouter } from "next/navigation";

export default function VoucherPage() {
  const router = useRouter();

  // Fungsi untuk meng-handle navigasi
  const handleAddVoucher = () => {
    router.push("/admin/keuangan/voucher/tambah-voucher");
  };
  return (
    <>
      <HeaderAdmin
        addButton={<AddButton onClick={handleAddVoucher} text="Tambah Data" />}
      />
      <div className="p-6">
        <div className="bg-primarylight2 p-6 rounded-lg">
          <Table />
        </div>
      </div>
    </>
  );
}

import MhsForm from "@/components/dashboard/form/mhsform";
import HeaderAdmin from "@/components/dashboard/section/header-admin";

export default function TambahMahasiswa() {
  return (
    <>
      {/* HeaderAdmin dengan tombol kembali jika diperlukan */}
      <HeaderAdmin />

      {/* Layout dengan padding */}
      <div className="p-6">
        {/* Komponen Form Mahasiswa */}
        <MhsForm isAddMode={true} />
      </div>
    </>
  );
}

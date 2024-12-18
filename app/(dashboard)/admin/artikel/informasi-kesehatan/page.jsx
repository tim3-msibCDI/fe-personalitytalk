import HeaderAdmin from "@/components/dashboard/section/header-admin";
import Table from "@/components/dashboard/table/table";

export default function InformasiKesehatanPage() {
  return (
    <>
      <HeaderAdmin />
      <div className="p-6">
        <div className="bg-primarylight2 p-6 rounded-lg">
          <Table />
        </div>
      </div>
    </>
  );
}

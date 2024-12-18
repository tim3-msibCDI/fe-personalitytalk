import Table from "@/components/dashboard/table/table";
import HeaderAdmin from "@/components/dashboard/section/header-admin";

export default function MitraPage() {
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

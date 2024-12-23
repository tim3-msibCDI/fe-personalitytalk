import Table from "@/components/dashboard/table/table";
import HeaderAdmin from "@/components/dashboard/section/header-admin";
import NavgiationPaymentButton from "@/components/dashboard/section/navigationpayment";

export default function TransaksiPsikologPage() {
  return (
    <>
      <HeaderAdmin />
      <div className="pb-6 px-6">
        <NavgiationPaymentButton />
        <div className="bg-primarylight2 p-6 rounded-lg">
          <Table />
        </div>
      </div>
    </>
  );
}

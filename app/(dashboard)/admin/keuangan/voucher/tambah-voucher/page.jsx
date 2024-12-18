import VoucherForm from "@/components/dashboard/form/voucherform";
import HeaderAdmin from "@/components/dashboard/section/header-admin";

export default function AddVoucherPage() {
  return (
    <>
      <HeaderAdmin />
      <div className="p-6">
        <div className="bg-primarylight2 p-6 rounded-lg">
          <VoucherForm />
        </div>
      </div>
    </>
  );
}

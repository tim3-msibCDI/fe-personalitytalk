import PaymentForm from "@/components/dashboard/form/paymentform";
import HeaderAdmin from "@/components/dashboard/section/header-admin";

export default function RekeningPage() {
  return (
    <>
      <HeaderAdmin />
      <div className="p-6">
        <div className="bg-primarylight2 p-6 rounded-lg">
          <PaymentForm isAddMode={true} />
        </div>
      </div>
    </>
  );
}

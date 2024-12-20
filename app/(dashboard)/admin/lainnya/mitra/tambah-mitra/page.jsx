import PartnerForm from "@/components/dashboard/form/mitraform";
import HeaderAdmin from "@/components/dashboard/section/header-admin";

export default function AddMitraPage() {
  return (
    <>
      <HeaderAdmin />
      <div className="p-6">
        <div className="bg-primarylight2 p-6 rounded-lg">
          <PartnerForm isAddMode={true} />
        </div>
      </div>
    </>
  );
}

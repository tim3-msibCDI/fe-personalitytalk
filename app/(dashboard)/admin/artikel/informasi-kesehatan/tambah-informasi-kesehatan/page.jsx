import DiseaseForm from "@/components/dashboard/form/diseaseform";
import HeaderAdmin from "@/components/dashboard/section/header-admin";

export default function AddDiseasePage() {
  return (
    <>
      <HeaderAdmin />
      <div className="p-6">
        <div className="bg-primarylight2 rounded-lg">
          {/* Gunakan DiseaseForm dengan mode tambah */}
          <DiseaseForm isAddMode={true} />
        </div>
      </div>
    </>
  );
}

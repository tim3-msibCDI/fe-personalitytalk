import UserForm from "@/components/dashboard/form/userform";
import HeaderAdmin from "@/components/dashboard/section/header-admin";

export default function AddPenggunaPage() {
  return (
    <>
      {/* HeaderAdmin Layout */}
      <HeaderAdmin />

      {/* Main Content Wrapper with Padding */}
      <div className="p-6">
        {/* UserForm with add mode enabled */}
        <UserForm isAddMode={true} />
      </div>
    </>
  );
}

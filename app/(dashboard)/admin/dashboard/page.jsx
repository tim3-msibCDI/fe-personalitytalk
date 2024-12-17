import CardDashboardList from "@/components/dashboard/card/carddashboard-list";
import HeaderAdmin from "@/components/dashboard/section/header-admin";

export default function AdminDashboard() {
  return (
    <>
      <HeaderAdmin />
      <div className="p-6">
        <CardDashboardList />
      </div>
    </>
  );
}

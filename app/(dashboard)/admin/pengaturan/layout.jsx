import SidebarAdmin from "@/components/sidebaradmin";
import Breadcrumbs from "@/components/dashboard/section/breadcrumbs";

export default function ProfilePsikologLayout({ children }) {
  return (
    <div className="p-6 text-textcolor">
      <Breadcrumbs />
      <div className="w-full lg:flex gap-4 mt-4">
        {/* Sidebar Here */}
        <SidebarAdmin />

        <div className="flex-1 rounded-lg bg-primarylight2 py-6 px-8 grid border border-solid border-textsec mt-4 lg:mt-0">
          {children}
        </div>
      </div>
    </div>
  );
}

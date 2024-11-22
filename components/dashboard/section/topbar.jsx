import { logoutAdmin } from "@/api/user";
import { useUser } from "@/constants/UserContext";

export default function Topbar() {
  const handleLogout = async () => {
    try {
      setLoading(true);
      await logoutAdmin();
      window.location.href = "/admin/login";
    } catch (error) {
      console.error("Logout failed:", error.message);
    } 
  };
  return (
    <div className="bg-whitebg py-4 px-6 shadow">
      <div className="w-full flex justify-end">
        <button
          onClick={handleLogout}
          className="text-left px-4 py-2 hover:bg-hover bg-primary rounded-lg text-whitebg font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

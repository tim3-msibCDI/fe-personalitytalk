import { logoutUser } from "@/api/user";
import { useUser } from "@/constants/UserContext";

export default function TopbarPsikolog() {
  const handleLogout = async () => {
    try {
      setLoading(true);
      await logoutUser();
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error.message);
    } finally {
      setLoading(false);
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

import { useState, useEffect } from "react";
import { logoutAdmin } from "@/api/user";
import Image from "next/image";

export default function Topbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Ambil nama pengguna dari localStorage saat komponen pertama kali dimuat
    const name = localStorage.getItem("userName");
    setUserName(name || "User"); // Jika tidak ada nama, set default "User"
  }, []);

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      localStorage.removeItem("userName"); // Hapus nama pengguna dari localStorage saat logout
      window.location.href = "/admin/login"; // Redirect ke halaman login
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <div className="bg-whitebg py-4 px-6 shadow">
      <div className="w-full flex justify-end">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)} // Toggle dropdown
            className="flex text-left px-4 py-2 bg-primary rounded-lg text-whitebg font-semibold"
          >
            <Image
              src="/image/default-profile.jpg"
              alt="Foto Profil"
              width={25}
              height={25}
              className="rounded-full mr-2"
            />
            {userName} {/* Menampilkan nama pengguna */}
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 bg-primary shadow-lg rounded-lg w-40">
              <ul>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-whitebg hover:bg-hover hover:rounded-lg font-semibold"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

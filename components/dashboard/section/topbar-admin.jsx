"use client";

import { useState, useEffect } from "react";
import { logoutAdmin } from "@/api/user";
import Image from "next/image";

const API_REAL = process.env.NEXT_PUBLIC_IMG_URL;

export default function TopbarAdmin() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState("");

  useEffect(() => {
    // Ambil nama dan foto profil dari localStorage saat komponen pertama kali dimuat
    const name = localStorage.getItem("userName");
    const photo = localStorage.getItem("userPhoto");

    setUserName(name || "User"); // Default ke "User" jika nama tidak ditemukan
    setUserPhoto(photo ? `${API_REAL}/${photo}` : "/image/default-profile.jpg"); // Tambahkan URL API jika foto tersedia
  }, []);

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      localStorage.removeItem("userName");
      localStorage.removeItem("userPhoto"); // Hapus data dari localStorage saat logout
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
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="flex text-left px-4 py-2 bg-primary rounded-lg text-whitebg font-semibold"
          >
            <Image
              src={userPhoto} // Gunakan foto profil dari localStorage atau gambar default
              alt="Foto Profil"
              width={25}
              height={25}
              className="rounded-full mr-2"
            />
            {userName}
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

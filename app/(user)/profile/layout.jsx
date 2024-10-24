"use client";

import { useState, useEffect } from "react";
import SidebarProfile from "@/components/sidebarprofile";
import { getToken } from "@/lib/auth";

// Fungsi untuk memformat tanggal menjadi format yang lebih mudah dibaca
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("id-ID", options);
};

export default function ProfileUserLayout({ children }) {
  const [user, setUser] = useState({
    nama: "",
    email: "",
    tanggal: "",
    role: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fungsi untuk mengambil data detail user
    const fetchUserProfile = async () => {
      try {
        const token = getToken();
        if (!token) {
          throw new Error("User not authenticated");
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile/detail`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const userData = await response.json();

        // Format tanggal dari yyyy/mm/dd menjadi format lebih readable (masih kurang created_at)
        const formattedDate = formatDate(userData.data.date_birth);

        setUser({
          nama: userData.data.name,
          email: userData.data.email,
          tanggal: formattedDate, // Format tanggal
          role: userData.data.role,
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Tampilkan loading state jika data belum selesai diambil
  }

  return (
    <div className="mx-20 my-9 text-textcolor ">
      <div>
        <h1 className="text-h2 font-semibold">
          Selamat datang kembali {user.nama}!
        </h1>
      </div>
      <div className="w-full mt-6 flex gap-4">
        {/* Sidebar Here */}
        <SidebarProfile nama={user.nama} email={user.email} tanggal={user.tanggal} role={user.role} />

        <div className="flex-1 rounded-lg bg-primarylight py-6 px-8 grid justify-items-center border border-solid border-textsec">
          {children}
        </div>
      </div>
    </div>
  );
}

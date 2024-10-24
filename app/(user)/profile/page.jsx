"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getUserDetail } from "@/lib/auth";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("id-ID", options);
};

export default function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    gender: "",
    dateBirth: "",
    phoneNumber: "",
    role: "",
    universitas: "",
    jurusan: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ambil data user dari API
    const fetchUserProfile = async () => {
      try {
        const userData = await getUserDetail();
        
        // Format tanggal lahir
        const formattedDate = formatDate(userData.dateBirth);
        
        // Simpan data user ke state
        setUser({
          ...userData,
          dateBirth: formattedDate,
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
    return <div>Loading...</div>; // Tampilkan loading state saat data sedang diambil
  }

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-start self-stretch">
        <h3 className="text-h3 font-semibold">Biodata Diri</h3>
        <div className="inline-flex bg-primary text-whitebg px-6 py-2 rounded-lg flex-start">
          <Image src="/icons/pencil-white.svg" width={20} height={20} alt="Edit Icon" />
          Edit Biodata
        </div>
      </div>

      {/* Nama Lengkap */}
      <div className="my-2">
        <label>Nama Lengkap</label>
      </div>
      <div>
        <input
          type="text"
          value={user.name}
          className="border border-textcolor w-full rounded-lg p-3"
          disabled
        />
      </div>

      {/* Email */}
      <div className="my-2">
        <label>Email</label>
      </div>
      <div>
        <input
          type="text"
          value={user.email}
          className="border border-textcolor w-full rounded-lg p-3"
          disabled
        />
      </div>

      <div className="flex gap-4">
        {/* Gender */}
        <div className="flex-1">
          <div className="my-2">
            <label className="block">Gender</label>
          </div>
          <div>
            <input
              type="text"
              value={user.gender}
              className="border border-textcolor rounded-lg p-3 w-full"
              disabled
            />
          </div>
        </div>

        {/* Tanggal Lahir */}
        <div className="flex-1">
          <div className="my-2">
            <label className="block">Tanggal Lahir</label>
          </div>
          <div>
            <input
              type="text"
              value={user.dateBirth}
              className="border border-textcolor rounded-lg p-3 w-full"
              disabled
            />
          </div>
        </div>

        {/* Nomor Telepon */}
        <div className="flex-1">
          <div className="my-2">
            <label className="block">Nomor Telepon</label>
          </div>
          <div>
            <input
              type="text"
              value={user.phoneNumber}
              className="border border-textcolor rounded-lg p-3 w-full"
              disabled
            />
          </div>
        </div>
      </div>

      {/* Jika role = "M", tambahkan universitas dan jurusan */}
      {user.role === "M" && (
        <>
          <div className="my-2">
            <label>Universitas</label>
          </div>
          <div>
            <input
              type="text"
              value={user.universitas}
              className="border border-textcolor w-full rounded-lg p-3"
              disabled
            />
          </div>

          <div className="my-2">
            <label>Jurusan</label>
          </div>
          <div>
            <input
              type="text"
              value={user.jurusan}
              className="border border-textcolor w-full rounded-lg p-3"
              disabled
            />
          </div>
        </>
      )}
    </div>
  );
}

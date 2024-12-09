"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getUserDetail } from "@/api/manage-user";
import UserForm from "@/components/dashboard/form/userform";

export default function EditPenggunaPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (id) {
        try {
          const { success, data, message } = await getUserDetail(id);
          if (success) {
            setUserData(data.data); // Atur data pengguna
          } else {
            console.error("Error fetching user detail:", message);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false); // Selesaikan loading
        }
      }
    };

    fetchUserData();
  }, [id]);

  // Redirect jika data tidak ditemukan atau sedang memuat
  if (loading) {
    return <p>Memuat data pengguna...</p>;
  }

  if (!userData) {
    return <p>Data pengguna tidak ditemukan.</p>;
  }

  return (
    <div className="relative">
      <UserForm
        isEditMode={true} // Mode edit diaktifkan
        userData={userData} // Kirim data pengguna yang diambil
      />
    </div>
  );
}

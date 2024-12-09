// pages/detail-pengguna.js

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getUserDetail } from "@/api/manage-user";
import Loading from "@/components/loading/loading";
import UserForm from "@/components/dashboard/form/userform";

export default function DetailPenggunaPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (id) {
        const { success, data, message } = await getUserDetail(id);
        if (success) {
          const dataUser = data.data;
          setUserData(dataUser);
        } else {
          console.error("Error fetching user detail:", message);
        }
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  if (loading) {
    return <p>Memuat data pengguna...</p>;
  }

  if (!userData) {
    return <p>Data not found</p>;
  }

  return (
    <UserForm
      userData={userData}
      isViewMode={true} 
    />
  );
}

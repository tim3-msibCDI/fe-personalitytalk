"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getUserDetail } from "@/api/manage-user";
import HeaderAdmin from "@/components/dashboard/section/header-admin";
import UserForm from "@/components/dashboard/form/userform";
import { SkeletonTable } from "@/components/dashboard/table/skeleton-table";

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
    return (
      <>
        {/* HeaderAdmin Layout */}
        <HeaderAdmin />

        {/* Main Content Wrapper */}
        <div className="p-6">
          <SkeletonTable />
        </div>
      </>
    );
  }

  if (!userData) {
    return <p>Data tidak ditemukan</p>;
  }

  return (
    <>
      {/* HeaderAdmin Layout */}
      <HeaderAdmin />

      {/* Main Content Wrapper */}
      <div className="p-6">
        {/* UserForm untuk menampilkan detail pengguna */}
        <UserForm
          userData={userData}
          isViewMode={true} // Menyediakan data pengguna dalam mode tampilan
        />
      </div>
    </>
  );
}

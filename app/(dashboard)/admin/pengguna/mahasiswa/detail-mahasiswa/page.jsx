"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MhsForm from "@/components/dashboard/form/mhsform";
import { getMahasiswaDetail } from "@/api/manage-mahasiswa";
import HeaderAdmin from "@/components/dashboard/section/header-admin";
import { SkeletonTable } from "@/components/dashboard/table/skeleton-table"; // Import skeleton table

export default function DetailMahasiswa() {
  const [isClient, setIsClient] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [mhsData, setMhsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the code is running on the client side
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (id && isClient) {
        const { success, data, message } = await getMahasiswaDetail(id);
        if (success) {
          const dataMhs = data.data;
          setMhsData(dataMhs);
        } else {
          console.error("Error fetching mahasiswa detail:", message);
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isClient]);

  // Loading state with Skeleton Table
  if (loading) {
    return (
      <>
        {/* HeaderAdmin Layout */}
        <HeaderAdmin />

        {/* Main Content Wrapper */}
        <div className="p-6">
          <SkeletonTable /> {/* Display skeleton while loading */}
        </div>
      </>
    );
  }

  // Error state if no data found
  if (!mhsData) {
    return <p>Data mahasiswa tidak ditemukan.</p>;
  }

  return (
    <>
      {/* HeaderAdmin Layout */}
      <HeaderAdmin />

      {/* Main Content Wrapper with Padding */}
      <div className="p-6">
        {/* MhsForm for displaying student details */}
        <MhsForm
          mahasiswaData={mhsData} // Pass the mahasiswa data here
          isViewMode={true} // Set to view mode
        />
      </div>
    </>
  );
}

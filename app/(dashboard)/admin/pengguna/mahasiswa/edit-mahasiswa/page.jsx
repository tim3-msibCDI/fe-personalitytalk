"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getMahasiswaDetail } from "@/api/manage-mahasiswa"; // Adjust API call for mahasiswa
import MhsForm from "@/components/dashboard/form/mhsform"; // Use the MhsForm component for mahasiswa
import HeaderAdmin from "@/components/dashboard/section/header-admin";
import { SkeletonTable } from "@/components/dashboard/table/skeleton-table"; // Import skeleton table

export default function EditMahasiswaPage() {
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

  // Fetch mahasiswa data
  useEffect(() => {
    const fetchMahasiswaData = async () => {
      if (id && isClient) {
        try {
          const { success, data, message } = await getMahasiswaDetail(id);
          if (success) {
            setMhsData(data.data); // Set mahasiswa data
          } else {
            console.error("Error fetching mahasiswa detail:", message);
          }
        } catch (error) {
          console.error("Error fetching mahasiswa data:", error);
        } finally {
          setLoading(false); // Finish loading
        }
      }
    };

    fetchMahasiswaData();
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
        {/* MhsForm for editing mahasiswa data */}
        <MhsForm
          isEditMode={true} // Enable edit mode
          mahasiswaData={mhsData} // Send mahasiswa data to the form
        />
      </div>
    </>
  );
}

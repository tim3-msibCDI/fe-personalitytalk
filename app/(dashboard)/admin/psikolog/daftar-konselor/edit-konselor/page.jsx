"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getKonselorDetail } from "@/api/manage-psikolog";
import HeaderAdmin from "@/components/dashboard/section/header-admin";
import PsiForm from "@/components/dashboard/form/psiform";
import { SkeletonTable } from "@/components/dashboard/table/skeleton-table";

export default function EditKonselorPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [psychologistData, setPsychologistData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch konselor data
  useEffect(() => {
    const fetchKonselorData = async () => {
      if (id) {
        try {
          const { success, data, message } = await getKonselorDetail(id);
          if (success) {
            setPsychologistData(data.data); // Set konselor data
          } else {
            console.error("Error fetching konselor detail:", message);
          }
        } catch (error) {
          console.error("Error fetching konselor data:", error);
        } finally {
          setLoading(false); // Finish loading
        }
      }
    };

    fetchKonselorData();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <>
        {/* HeaderAdmin Layout */}
        <HeaderAdmin />

        {/* Main Content Wrapper */}
        <div className="p-6">
          {/* Skeleton table while loading */}
          <SkeletonTable />
        </div>
      </>
    );
  }

  // Error if no konselor data is found
  if (!psychologistData) {
    return (
      <>
        <HeaderAdmin />
        <div className="p-6">
          <p>Data konselor tidak ditemukan.</p>
        </div>
      </>
    );
  }

  return (
    <>
      {/* HeaderAdmin Layout */}
      <HeaderAdmin />

      {/* Main Content Wrapper */}
      <div className="p-6">
        {/* PsiForm for editing konselor data */}
        <PsiForm
          isEditMode={true} // Enable edit mode
          psychologistData={psychologistData} // Send the fetched konselor data to the form
          konselorMode={true} // Enable konselor-specific mode
        />
      </div>
    </>
  );
}

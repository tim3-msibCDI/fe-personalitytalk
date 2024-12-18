"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getPsikologDetail } from "@/api/manage-psikolog";
import HeaderAdmin from "@/components/dashboard/section/header-admin";
import PsiForm from "@/components/dashboard/form/psiform";
import { SkeletonTable } from "@/components/dashboard/table/skeleton-table";

export default function EditPsychologistPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [psychologistData, setPsychologistData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch psychologist data
  useEffect(() => {
    const fetchPsychologistData = async () => {
      if (id) {
        try {
          const { success, data, message } = await getPsikologDetail(id);
          if (success) {
            setPsychologistData(data.data);
          } else {
            console.error("Error fetching psychologist detail:", message);
          }
        } catch (error) {
          console.error("Error fetching psychologist data:", error);
        } finally {
          setLoading(false); // Finish loading
        }
      }
    };

    fetchPsychologistData();
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

  // Error if no psychologist data is found
  if (!psychologistData) {
    return (
      <>
        <HeaderAdmin />
        <div className="p-6">
          <p>Data psikolog tidak ditemukan.</p>
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
        {/* PsiForm for editing psychologist data */}
        <PsiForm
          isEditMode={true} // Enable edit mode
          psychologistData={psychologistData} // Send the fetched psychologist data to the form
        />
      </div>
    </>
  );
}

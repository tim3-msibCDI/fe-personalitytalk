"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getPsikologRegist } from "@/api/manage-psikolog";
import HeaderAdmin from "@/components/dashboard/section/header-admin";
import { SkeletonTable } from "@/components/dashboard/table/skeleton-table";
import PsiViewForm from "@/components/dashboard/form/psireg_form";

export default function DetailRegistPsikologPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [psychologistData, setPsychologistData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPsychologistData = async () => {
      if (id) {
        try {
          const { success, data, message } = await getPsikologRegist(id); // Panggil API detail psikolog
          if (success) {
            setPsychologistData(data.data);
          } else {
            console.error("Error fetching psychologist detail:", message);
          }
        } catch (error) {
          console.error("Error fetching psychologist detail:", error);
        } finally {
          setLoading(false);
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
          <SkeletonTable />
        </div>
      </>
    );
  }

  // Error state jika data tidak ditemukan
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

  // Main content
  return (
    <>
      {/* HeaderAdmin Layout */}
      <HeaderAdmin />

      {/* Main Content Wrapper */}
      <div className="p-6">
        {/* PsiViewForm untuk menampilkan detail */}
        <PsiViewForm
          psychologistData={psychologistData}
          isViewMode={true}
          id={id}
        />
      </div>
    </>
  );
}

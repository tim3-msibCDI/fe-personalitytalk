// pages/detail-psikolog.js

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getPsikologRegist } from "@/api/manage-psikolog";
import Loading from "@/components/loading/loading";
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
            const DataPsikolog = data.data;
            setPsychologistData(DataPsikolog);
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

  if (loading) {
    return <p>Memuat data...</p>; // Gunakan komponen loading
  }

  if (!psychologistData) {
    return <p>Data psikolog tidak ditemukan</p>;
  }

  return <PsiViewForm psychologistData={psychologistData} isViewMode={true} id={id} />;
}

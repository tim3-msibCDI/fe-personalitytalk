// pages/detail-psikolog.js

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getPsikologDetail } from "@/api/manage-psikolog";
import Loading from "@/components/loading/loading";
import PsiForm from "@/components/dashboard/form/psiform";

export default function DetailPsikologPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [psychologistData, setPsychologistData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPsychologistData = async () => {
      if (id) {
        try {
          const { success, data, message } = await getPsikologDetail(id); // Panggil API detail psikolog
          if (success) {
            const DataPsikolog = data.data;
            setPsychologistData(DataPsikolog);
            console.log(DataPsikolog); // Sesuaikan dengan struktur data dari API
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

  return <PsiForm psychologistData={psychologistData} isViewMode={true} />;
}

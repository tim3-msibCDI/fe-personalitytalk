"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getPsikologDetail } from "@/api/manage-psikolog";
import PsiForm from "@/components/dashboard/form/psiform";

export default function EditPsychologistPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
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
            setPsychologistData(data.data); // Atur data psikolog
          } else {
            console.error("Error fetching psychologist detail:", message);
          }
        } catch (error) {
          console.error("Error fetching psychologist data:", error);
        } finally {
          setLoading(false); // Selesaikan loading
        }
      }
    };

    fetchPsychologistData();
  }, [id]);

  // Redirect jika data tidak ditemukan atau sedang memuat
  if (loading) {
    return <p>Memuat data psikolog...</p>;
  }

  if (!psychologistData) {
    return <p>Data psikolog tidak ditemukan.</p>;
  }

  return (
    <div className="relative">
      <PsiForm
        isEditMode={true} // Mode edit diaktifkan
        psychologistData={psychologistData} // Kirim data psikolog yang diambil
      />
    </div>
  );
}

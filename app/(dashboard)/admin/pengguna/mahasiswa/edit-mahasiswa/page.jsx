"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getMahasiswaDetail } from "@/api/manage-mahasiswa"; // Adjust API call for mahasiswa
import MhsForm from "@/components/dashboard/form/mhsform"; // Use the MhsForm component for mahasiswa

export default function EditMahasiswaPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const [mhsData, setMhsData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch mahasiswa data
  useEffect(() => {
    const fetchMahasiswaData = async () => {
      if (id) {
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
  }, [id]);

  // Redirect if data is not found or is still loading
  if (loading) {
    return <p>Memuat data mahasiswa...</p>;
  }

  if (!mhsData) {
    return <p>Data mahasiswa tidak ditemukan.</p>;
  }

  return (
    <div className="relative">
      <MhsForm
        isEditMode={true} // Enable edit mode
        mahasiswaData={mhsData} // Send mahasiswa data to the form
      />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MhsForm from "@/components/dashboard/form/mhsform";
import { getMahasiswaDetail } from "@/api/manage-mahasiswa";

export default function DetailMahasiswa() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [mhsData, setMhsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const { success, data, message } = await getMahasiswaDetail(id);
        if (success) {
          const dataMhs = data.data;
          setMhsData(dataMhs);
        } else {
          console.error("Error fetching user detail:", message);
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <p>Memuat data pengguna...</p>;
  }

  if (!mhsData) {
    return <p>Data not found</p>;
  }

  return (
    <MhsForm
      mahasiswaData={mhsData} // Ensure you're passing correct prop name here
      isViewMode={true}
    />
  );
}

"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getDiseaseDetail, editDisease } from "@/api/manage-artikel";
import HeaderAdmin from "@/components/dashboard/section/header-admin";
import DiseaseForm from "@/components/dashboard/form/diseaseform";
import { SkeletonTable } from "@/components/dashboard/table/skeleton-table";

export default function EditDiseasePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Ambil ID penyakit dari query parameter
  const router = useRouter();

  const [diseaseData, setDiseaseData] = useState(null); // State untuk data penyakit
  const [loading, setLoading] = useState(true); // State untuk loading

  // Fetch data penyakit
  useEffect(() => {
    const fetchDiseaseData = async () => {
      if (id) {
        try {
          const response = await getDiseaseDetail(id);
          const { success, data, message } = response;

          if (success) {
            const dataDisease = data.data;

            console.log("Updated Disease Data:", dataDisease);
            setDiseaseData(dataDisease);
          } else {
            console.error("Error fetching disease detail:", message);
          }
        } catch (error) {
          console.error("Error fetching disease data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDiseaseData();
  }, [id]);

  // Handle update penyakit
  const handleDiseaseUpdate = async (updatedData) => {
    setLoading(true);
    try {
      const response = await editDisease(id, updatedData); // Gunakan API edit penyakit
      if (response.success) {
        // Jika berhasil, perbarui state lokal
        setDiseaseData(updatedData);
        setLoading(false);
        router.push("/admin/arikel/informasi-kesehatan"); // Redirect ke daftar penyakit
      } else {
        console.error("Error updating disease data:", response.message);
      }
    } catch (error) {
      console.error("Error updating disease data:", error);
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <>
        {/* HeaderAdmin Layout */}
        <HeaderAdmin />

        {/* Wrapper Utama */}
        <div className="p-6">
          <SkeletonTable />
        </div>
      </>
    );
  }

  // Jika data penyakit tidak ditemukan
  if (!diseaseData) {
    return <p>Data penyakit tidak ditemukan.</p>;
  }

  return (
    <>
      {/* HeaderAdmin Layout */}
      <HeaderAdmin />

      {/* Wrapper Utama */}
      <div className="p-6">
        <div className="bg-primarylight2 p-6 rounded-lg">
          {/* Gunakan DiseaseForm */}
          <DiseaseForm
            isEditMode={true} // Mode edit
            diseaseData={diseaseData} // Data penyakit yang akan di-edit
            onUpdate={handleDiseaseUpdate} // Handler untuk update
          />
        </div>
      </div>
    </>
  );
}

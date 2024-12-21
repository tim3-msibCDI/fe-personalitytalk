"use client";

import HeaderAdmin from "@/components/dashboard/section/header-admin";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getDiseaseDetail } from "@/api/manage-artikel";
import Image from "next/image";
import { SkeletonTable } from "@/components/dashboard/table/skeleton-table";

const API_REAL = process.env.NEXT_PUBLIC_IMG_URL;

// Fungsi untuk memformat tanggal (menambahkan nama hari)
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    weekday: "long", // Menambahkan nama hari
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Intl.DateTimeFormat("id-ID", options).format(date);
};

export default function PreviewDiseasePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [diseaseData, setDiseaseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiseaseData = async () => {
      if (id) {
        const { success, data, message } = await getDiseaseDetail(id);
        if (success) {
          const dataDisease = data.data;
          setDiseaseData(dataDisease);
        } else {
          console.error("Error fetching disease detail:", message);
        }
        setLoading(false);
      }
    };

    fetchDiseaseData();
  }, [id]);

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

  if (!diseaseData) {
    return <div>No disease data found</div>;
  }

  // Tentukan URL gambar penyakit
  const photoPreview =
    diseaseData.disease_img && diseaseData.disease_img.startsWith("http")
      ? diseaseData.disease_img
      : diseaseData.disease_img
      ? `${API_REAL}/${diseaseData.disease_img}`
      : "/image/default-profile.jpg";

  return (
    <>
      <HeaderAdmin />
      <div className="p-6">
        {/* Nama penyakit */}
        <h1 className="text-h1 font-semibold">{diseaseData.disease_name}</h1>

        {/* Tanggal publikasi atau terakhir diperbarui */}
        <div className="my-1 text-vs">
          {diseaseData.updated_at
            ? formatDate(diseaseData.updated_at)
            : "Tanggal tidak tersedia"}
        </div>
        <div className="my-1 text-vs font-semibold">
          <span className="font-normal text-vs">Ditinjau Oleh </span>
          {diseaseData.writer.name}
        </div>
        {/* Gambar penyakit */}
        {photoPreview && (
          <div className="mb-4">
            <Image
              src={photoPreview} // Gunakan URL absolut atau default
              alt="Disease Image"
              width={400}
              height={200}
              className="rounded-md"
            />
          </div>
        )}

        {/* Deskripsi penyakit */}
        <div
          className="prose max-w-full"
          dangerouslySetInnerHTML={{ __html: diseaseData.content }}
        />
      </div>
    </>
  );
}

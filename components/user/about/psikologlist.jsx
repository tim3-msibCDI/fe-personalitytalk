"use client";

import { useState, useEffect } from "react";
import Cardpsikologi from "./cardpsikologi";
import Loading from "@/components/loading/loading";

export default function Psikologlist() {
  const [data, setData] = useState([]); // State untuk menyimpan data psikolog
  const [visibleData, setVisibleData] = useState([]); // State untuk data yang ditampilkan
  const [loading, setLoading] = useState(true); // State untuk loading state
  const [error, setError] = useState(null); // State untuk error

  useEffect(() => {
    // Fungsi untuk fetch data psikolog
    const fetchPsikolog = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/landing-page/psikolog/recommendation`,
          {
            method: "GET",
            headers: {
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        const result = await response.json();

        if (result.success) {
          setData(result.data); // Simpan data dari API
        } else {
          throw new Error(result.message || "Gagal mengambil data psikolog");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Set loading menjadi false setelah selesai fetch
      }
    };

    fetchPsikolog();
  }, []);

  useEffect(() => {
    // Fungsi untuk mengatur jumlah data berdasarkan ukuran layar
    const updateVisibleData = () => {
      const isSmallScreen = window.innerWidth < 768; // Ukuran layar kecil (md breakpoint)
      if (isSmallScreen) {
        setVisibleData(data.slice(0, 2)); // Ambil hanya 2 data
      } else {
        setVisibleData(data); // Tampilkan semua data
      }
    };

    // Panggil fungsi saat komponen mount
    updateVisibleData();

    // Update data saat ukuran layar berubah
    window.addEventListener("resize", updateVisibleData);
    return () => window.removeEventListener("resize", updateVisibleData);
  }, [data]);

  if (loading) {
    return (
      <div className="bg-whitebg py-12">
        <h2 className="text-h1 font-medium text-center p-2">
          Psikolog PersonalityTalk
        </h2>
        <div>
          <Loading />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-whitebg py-4">
        <h2 className="sm:text-h1 text-h2 font-semibold text-center p-2 my-4">
          Psikolog PersonalityTalk
        </h2>
        <p className="text-center text-m text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-whitebg py-4">
      <h2 className="sm:text-h1 text-h2 font-semibold text-center p-2 my-4">
        Psikolog PersonalityTalk
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:mx-20 mx-2">
        {visibleData.map((person, index) => (
          <Cardpsikologi
            key={index}
            name={person.name}
            image={`${process.env.NEXT_PUBLIC_IMG_URL}/${person.photo_profile}`} // URL lengkap gambar
            title={person.category}
            tags={person.topics}
          />
        ))}
      </div>
    </div>
  );
}

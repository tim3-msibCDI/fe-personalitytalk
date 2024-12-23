import Image from "next/image";
import { useState, useEffect } from "react";
import { getConsultationRating } from "@/api/manage-konsultasi";
import Modal from "../modals/modal";

const API_REAL = process.env.NEXT_PUBLIC_IMG_URL; // Make sure this is set in your .env file

export default function RatingAdmin({ onClose, consul_id, psch_id }) {
  // State untuk menyimpan data psikolog yang dipilih dan rating
  const [ratingData, setRatingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ambil rating data saat komponen pertama kali di-render
  useEffect(() => {
    const fetchRating = async () => {
      try {
        setLoading(true);
        const response = await getConsultationRating(consul_id, psch_id);
        if (response.success) {
          setRatingData(response.data.data);
        } else {
          setError(response.message);
        }
      } catch (error) {
        setError("Terjadi kesalahan saat mengambil data rating");
      } finally {
        setLoading(false);
      }
    };

    fetchRating();
  }, [consul_id, psch_id]); // Re-fetch when consul_id or psch_id changes

  if (loading) {
    return <p>Loading...</p>; // Loading state
  }

  if (error) {
    return <p>{error}</p>; // Error state
  }

  // Logic for handling the image source URL
  const photoPreview =
    ratingData?.photo_profile && ratingData?.photo_profile.startsWith("http")
      ? ratingData?.photo_profile
      : ratingData?.photo_profile
      ? `${API_REAL}/${ratingData?.photo_profile}`
      : "/image/default-profile.jpg"; // Default profile image

  return (
    <Modal isOpen={true} onClose={onClose}>
      {/* Pass isOpen and onClose to Modal */}
      <div className="bg-primary text-white px-6 py-3 rounded-t-lg flex justify-between items-center">
        <div className="flex flex-col">
          <p className="text-m font-semibold">Riwayat Konsultasi</p>
          <p className="text-s font-light">
            Penilaian terhadap sesi konsultasi oleh klien.
          </p>
        </div>
        <Image
          src="/icons/close.png"
          alt="Tutup"
          width={26}
          height={26}
          className="cursor-pointer"
          onClick={onClose}
        />
      </div>
      <div className="p-6">
        <div className="flex gap-4">
          <div className="w-20 h-20 rounded overflow-hidden">
            <Image
              className="mb-2 object-cover w-full h-full"
              src={photoPreview} // Use the computed photoPreview URL
              alt={`Photo ${ratingData?.name}`}
              width={100}
              height={100}
            />
          </div>
          <div className="flex flex-col">
            <p className="text-m font-semibold">
              {ratingData?.name || "Nama Psikolog"}
            </p>
            {/* Tanggal, Waktu konsultasi */}
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center">
                <Image
                  src="/icons/i-konsultasi.png"
                  alt="Icon Konsultasi"
                  width={18}
                  height={18}
                />
                <p className="ml-1">
                  {ratingData?.consultation_date || "Tanggal Tidak Tersedia"}
                </p>
              </div>
              <span className="text-gray-400">|</span>
              <div className="flex items-center">
                <Image
                  src="/icons/time.svg"
                  alt="Icon Waktu"
                  width={18}
                  height={18}
                />
                <p className="ml-1">
                  {ratingData?.consultation_time || "Waktu Tidak Tersedia"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr className="border border-1 border-gray-300 mt-3" />
        <div className="mt-2 text-s">
          <div className="flex justify-between">
            <p>Rating Layanan</p>
            <div className="flex">
              {/* Check if rating is available, if not show "Belum mengisi penilaian" */}
              {ratingData?.rating != null ? (
                [...Array(ratingData?.rating || 5)].map((_, i) => (
                  <Image
                    key={i}
                    src="/icons/star.svg"
                    alt="Star"
                    width={18}
                    height={18}
                  />
                ))
              ) : (
                <p>Belum mengisi penilaian</p>
              )}
            </div>
          </div>
          <p className="mt-2">Review</p>
          {/* Display review or message if it's null */}
          <textarea
            className="w-full h-32 p-3 mt-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Psikolog sangat baik...."
            defaultValue={ratingData?.review || "Belum mengisi penilaian"} // Default text if review is null
            readOnly
          ></textarea>
        </div>
      </div>
    </Modal>
  );
}

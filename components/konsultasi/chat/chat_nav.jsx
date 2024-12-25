"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/modals/modal";
import CatatanPsikolog from "@/components/popup/catatan-psikolog-chat";
import Psikolog from "../form-wizard/psikolog";
import Loading from "@/components/loading/loading";

export default function ChatNavigation({
  psikologInfo,
  consultationTime,
  notes,
  chat_status,
}) {
  const router = useRouter(); // Inisialisasi router

  const [remainingTime, setRemainingTime] = useState(null);

  // State untuk modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Jika data tidak tersedia, gunakan nilai default untuk menghindari error
  const {
    name = "",
    photo_profile = "",
    is_online = false,
  } = psikologInfo || {};
  const { start_time = "", end_time = "", date = "" } = consultationTime || {};

  useEffect(() => {
    if (!date || !start_time || !end_time) return; // Jika data tidak lengkap, hentikan efek

    const updateRemainingTime = () => {
      const now = new Date();
      const startDateTime = new Date(`${date}T${start_time}`);
      const endDateTime = new Date(`${date}T${end_time}`);

      if (now >= startDateTime && now <= endDateTime) {
        const diffInSeconds = Math.floor((endDateTime - now) / 1000);
        const minutes = Math.floor(diffInSeconds / 60);
        const seconds = diffInSeconds % 60;
        setRemainingTime(`${minutes}:${seconds.toString().padStart(2, "0")}`);
      } else if (now > endDateTime) {
        setRemainingTime("00:00"); // Waktu habis
      } else {
        setRemainingTime(null); // Belum dimulai
      }
    };

    updateRemainingTime(); // Perbarui segera saat komponen dimuat

    const interval = setInterval(updateRemainingTime, 1000); // Perbarui setiap detik
    return () => clearInterval(interval); // Bersihkan interval saat komponen di-unmount
  }, [date, start_time, end_time]);

  // Jika data belum ada, tampilkan placeholder atau kosong
  if (!psikologInfo || !consultationTime) {
    return (
      <div className="bg-primarylight2 py-5 px-6">
        <Loading />
      </div>
    );
  }

  // console.log("Status online :", psikologInfo.is_online);

  return (
    <div className="bg-primarylight2">
      <div className="px-6 md:px-8 lg:px-12 ml-4 lg:ml-8 mr-4 lg:mr-8 py-5 flex justify-between">
        <div className="flex items-center gap-4">
          {/* Tombol back */}
          <div onClick={() => router.back()} className="cursor-pointer">
            <Image
              src="/image/icons/arrow_back.png"
              alt="Kembali"
              width={9}
              height={14}
            />
          </div>
          {/* Profil Psikolog */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMG_URL}/${photo_profile}`}
                alt={`Photo ${name}`}
                width={100}
                height={100}
              />
            </div>
            <div>
              <p className="text-m font-semibold">{name}</p>
              <div className="flex items-center text-xs">
                {is_online ? (
                  <>
                    {/* Titik Hijau */}
                    <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                    <span>Online</span>
                  </>
                ) : (
                  <>
                    {/* Titik Abu-Abu */}
                    <span className="h-2 w-2 bg-gray-400 rounded-full mr-2"></span>
                    <span>Offline</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={chat_status === "completed" ? openModal : null}
            disabled={chat_status !== "completed"}
            className={`flex items-center text-whitebg text-m font-semibold gap-2 px-4 rounded-lg
                             ${
                               chat_status === "completed"
                                 ? "bg-primary cursor-pointer"
                                 : "bg-disable cursor-not-allowed"
                             }
                         `}
          >
            <Image
              src="/image/icons/white-catatan.png"
              alt="Icon Catatan"
              width={24}
              height={24}
            />
            <span>Catatan Psikolog</span>
          </button>
          <div
            className={`rounded-lg text-s font-semibold flex items-center px-4 
                            ${
                              chat_status === "completed"
                                ? "bg-gray-400 text-white"
                                : "bg-primary text-white"
                            }
                            ${
                              chat_status === "completed"
                                ? "grayscale(100%) opacity-50"
                                : ""
                            }`}
          >
            <p
              className={`${chat_status === "completed" ? "opacity-100" : ""}`}
            >
              {chat_status === "completed"
                ? "Selesai"
                : remainingTime ?? "Belum dimulai"}
            </p>
          </div>
        </div>
      </div>
      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <CatatanPsikolog onClose={closeModal} notes={notes} />
      </Modal>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/modals/modal";
import SubmitPsikologNotes from "@/components/popup/submit-psikolog-notes";

export default function ChatNavigationPsikolog({
  clientInfo,
  consultationTime,
  notes,
  setNotes,
  chat_status,
  consul_id,
}) {
  const router = useRouter();

  // Hooks harus tetap dipanggil di sini meskipun data belum ada
  const [remainingTime, setRemainingTime] = useState(null);

  // State untuk modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (!consultationTime) return;

    const updateRemainingTime = () => {
      const now = new Date();
      const startDateTime = new Date(
        `${consultationTime.date}T${consultationTime.start_time}`
      );
      const endDateTime = new Date(
        `${consultationTime.date}T${consultationTime.end_time}`
      );

      if (now >= startDateTime && now <= endDateTime) {
        const diffInSeconds = Math.floor((endDateTime - now) / 1000);
        const minutes = Math.floor(diffInSeconds / 60);
        const seconds = diffInSeconds % 60;
        setRemainingTime(`${minutes}:${seconds.toString().padStart(2, "0")}`);
      } else if (now > endDateTime) {
        setRemainingTime("00:00");
      } else {
        setRemainingTime(null); // Belum dimulai
      }
    };

    updateRemainingTime(); // Perbarui segera saat komponen dimuat

    const interval = setInterval(updateRemainingTime, 1000); // Perbarui setiap detik
    return () => clearInterval(interval); // Bersihkan interval saat komponen di-unmount
  }, [consultationTime]);

  // Jika data belum tersedia, tampilkan placeholder
  if (!clientInfo || !consultationTime) {
    return null;
  }
  const handleNotesUpdate = (updatedNotes) => {
    setNotes(updatedNotes);
  };

  const { name = "", photo_profile = "", is_online = false } = clientInfo || {};
  const { start_time, end_time, date } = consultationTime;

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
            <span> + Tambah Catatan</span>
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
        <SubmitPsikologNotes
          onClose={closeModal}
          notes={notes}
          consul_id={consul_id}
          onNotesUpdate={handleNotesUpdate}
        />
      </Modal>
    </div>
  );
}

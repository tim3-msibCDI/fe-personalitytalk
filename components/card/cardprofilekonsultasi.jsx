import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import KonsulBelumMulai from "@/components/popup/konsul-belum-mulai";
import Modal from "@/components/modals/modal";

const formatRupiah = (amount) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(amount);
};

export default function ConsultationHistoryCard({
  consultation_id,
  name,
  status,
  date,
  time,
  psikolog_profile,
  sender_id,
  receiver_id,
}) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const getStatusBgColor = () => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "ongoing":
        return "bg-yellow-500";
      case "scheduled":
        return "bg-orange-500";
      case "failed":
        return "bg-red-500";
      default:
        return "bg-primary";
    }
  };

  const getKet = () => {
    switch (status) {
      case "completed":
        return (
          <>
            <span className="sm:inline hidden">Selesai </span>
            <span></span>
          </>
        );
      case "ongoing":
        return (
          <>
            <span className="sm:inline hidden">Sedang </span>
            <span>Berlangsung</span>
          </>
        );
      case "scheduled":
        return (
          <>
            <span className="sm:inline hidden">Dijadwalkan </span>
            <span>Sesi</span>
          </>
        );
      case "failed":
        return (
          <>
            <span className="sm:inline hidden">Transaksi </span>
            <span>Gagal</span>
          </>
        );
      default:
        return "Status";
    }
  };

  const navigateToChat = ({ consulId, psikologId, senderId, chatStatus }) => {
    if (status === "scheduled") {
      openModal(<KonsulBelumMulai onClose={closeModal} />);
    } else if (status === "ongoing" || status === "completed") {
      localStorage.setItem(
        "clientChatData",
        JSON.stringify({ consulId, psikologId, senderId, chatStatus })
      );
      router.push(`/konsultasi/chat`);
    } else {
      alert(
        "Chat hanya tersedia untuk sesi yang dijadwalkan atau sedang berlangsung."
      );
    }
  };

  return (
    <>
      <div
        className="w-full h-[124px] p-4 bg-primarylight rounded-lg border border-primary justify-between items-center inline-flex mb-2 cursor-pointer"
        onClick={() =>
          navigateToChat({
            consulId: consultation_id,
            psikologId: receiver_id,
            senderId: sender_id,
            chatStatus: status,
          })
        }
      >
        <div className="justify-start items-center gap-3 flex">
          <div className="h-20 rounded-lg justify-start items-center gap-2.5 flex">
            <Image
              className="grow shrink basis-0 rounded-lg hidden sm:inline"
              src={
                psikolog_profile
                  ? `${process.env.NEXT_PUBLIC_IMG_URL}/${psikolog_profile}`
                  : "/default-profile.jpg"
              }
              alt={`${name}'s profile picture`}
              height={100}
              width={100}
            />
          </div>
          <div className="self-stretch flex-col justify-center items-start gap-2 inline-flex">
            <div className="text-textcolor sm:text-base text-s font-semibold">{name}</div>
            <div
              className={`h-5 px-4 py-2 ${getStatusBgColor()} rounded-lg justify-center items-center gap-2.5 inline-flex`}
            >
              <div className="text-neutral-50 text-xs font-semibold">
                {getKet()}
              </div>
            </div>
          </div>
        </div>
        <div className="h-11 justify-end items-center gap-4 flex">
          <div className="flex-col justify-center items-start gap-2 inline-flex">
            <div className="justify-start items-center gap-2 inline-flex">
              <Image
                src="/image/icons/chat-primary.svg"
                width={15}
                height={15}
                alt="icons"
              />
              <div className="text-textcolor text-xs font-semibold">{date}</div>
            </div>
            <div className="justify-start items-center gap-2 inline-flex">
              <Image
                src="/image/icons/coins-primary.svg"
                width={15}
                height={15}
                alt="icons"
              />
              <div className="text-textcolor text-xs font-semibold">{time}</div>
            </div>
          </div>
          <div>
            <Image
              src="/image/icons/arrow-activity.svg"
              width={20}
              height={20}
              alt="icons"
            />
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </>
  );
}

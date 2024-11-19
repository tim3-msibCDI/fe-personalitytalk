"use client";

import { useState } from "react";
import Image from "next/image";
import Modal from "@/components/modals/modal";
import Rating from "@/components/popup/rating";

export default function ChatSelesai() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <hr className="border-1 border-gray-600 mt-5" />
            <div className="flex flex-col justify-center items-center mt-5">
                <Image src="/icons/sad.png" alt="Sedih" width={100} height={100} />
                <p className="text-m font-semibold mt-5">Sesi Konsultasi Selesai</p>
                <p className="text-s px-20 text-center mb-5">Maaf, Sesi Konsultasi kamu telah selesai. Jangan lupa cek catatan psikolog secara berkala. Tenang aja chat kamu tidak akan terhapus dan kamu dapat melanjutkannya lagi.</p>
                <div className="flex gap-5 text-m font-semibold">
                    {/* Rating */}
                    <button
                        className="border border-primary text-primary rounded-lg px-4 py-2 flex gap-1 items-center"
                        onClick={openModal}
                    >
                        <Image
                            src="/icons/bintang.png"
                            alt="Icon Star"
                            width={18}
                            height={18}
                        />
                        Rating Konsultasi
                    </button>
                    <button className="bg-primary text-white rounded-lg px-4 py-2">Pesan lagi</button>
                </div>
                {/* Modal component */}
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <Rating onClose={closeModal} /> {/* Mengirim fungsi closeModal sebagai prop */}
                </Modal>
            </div>
        </>
    );
}
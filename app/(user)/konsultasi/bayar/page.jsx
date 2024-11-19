"use client";

import Image from "next/image";
import Psikolog from "@/components/konsultasi/form-wizard/psikolog";
import Pembayaran from "@/components/konsultasi/form-wizard/pembayaran";
import { jadwalPsikolog } from "@/constants";
import { useState } from "react";
import Modal from "@/components/modals/modal";
import InfoTransfer from "@/components/popup/info-transfer";

export default function Bayar() {

    // State untuk menyimpan data psikolog yang dipilih
    const [selectedPsikolog, setSelectedPsikolog] = useState(jadwalPsikolog[0]);

    // Untuk modal pop up
    const [isModalOpen, setIsModalOpen] = useState(true);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="px-6 md:px-8 lg:px-12 py-9 ml-4 lg:ml-8 mr-4 lg:mr-8">
            <div className="py-6">
                <div className="flex items-center gap-4 cursor-pointer">
                    <Image src="/icons/arrow_back.png" alt="icon kembali" width={9} height={14} />
                    <p className="text-m font-bold">Konsultasi Saya</p>
                </div>
                <div className="flex gap-8 mt-6">
                    <div className="w-2/5">
                        <div className="bg-primarylight2 rounded-md p-4">
                            <Psikolog />
                            <hr className="border-1 border-black my-4" />
                            {/* Detail Konsultasi */}
                            <div className="text-m gap-2">
                                <p className="font-semibold mb-2">Detail Konsultasi</p>
                                <div className="grid grid-cols-2 gap-y-2 text-m text-textcolor">
                                    <p>Topik Konsultasi</p>
                                    <p>: Umum</p>

                                    <p>Durasi Konsultasi</p>
                                    <p>: 60 menit</p>

                                    <p>Jadwal Konsultasi</p>
                                    <p>: Sabtu, 26 Oktober 2024</p>

                                    <p>Waktu Konsultasi</p>
                                    <p>: 13.00 - 14.00</p>
                                </div>
                            </div>
                            <hr className="border-1 border-black my-4" />
                            <div className="flex justify-end">
                                <button
                                    className="px-4 py-2 border border-primary text-primary rounded-lg"
                                    onClick={openModal}
                                >
                                    Informasi Transfer
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Modal component */}
                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                        <InfoTransfer onClose={closeModal} /> {/* Mengirim fungsi closeModal sebagai prop */}
                    </Modal>
                    <div className="w-3/5">
                        <Pembayaran statusPembayaran={selectedPsikolog.status_pembayaran} />
                    </div>
                </div>
            </div>
        </div>
    );
}
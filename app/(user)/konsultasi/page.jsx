"use client";

import { useState } from "react";
import ButtonPrimary from "@/components/button/buttonprimary";
import CardUnggulList from "@/components/card/cardunggullist";
import Cara from "@/components/konsultasi/cara";
import FAQ from "@/components/konsultasi/faq";
import Image from "next/image";
import Modal from "@/components/modals/modal";
import Topik from "@/components/popup/topik";

export default function Konsultasi() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const ajakan = "Tuangkanlah Semua Masalah Kamu Melalui Konsultasi PersonalityTalk";

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <div className="px-6 md:px-8 lg:px-12 ml-12 py-9 flex">
                <div className="w-3/5">
                    <h1 className="text-h1 font-bold text-textcolor py-4 pr-16">
                        {ajakan}
                    </h1>
                    <div className="w-full">
                        <ButtonPrimary
                            className="flex items-center justify-center text-h3"
                            onClick={openModal}
                        >
                            Mulai Konsultasi
                            <Image
                                src="/icons/arrow.png"
                                alt="Arrow"
                                width={15}
                                height={15}
                                className="ml-2 flex items-center"
                            />
                        </ButtonPrimary>
                    </div>
                    <div className="w-full py-4">
                        <hr className="border-black border-1 mt-5 mb-2 mr-2" />
                    </div>
                    <div>
                        <CardUnggulList />
                    </div>
                </div>
                <div className="w-2/5">
                    <Image src="/image/img-content/hero1.png" alt="foto" width={1920} height={1080} />
                </div>
            </div>

            {/* Modal component */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <Topik onClose={closeModal} /> {/* Mengirim fungsi closeModal sebagai prop */}
            </Modal>

            <Cara />
            <FAQ />
        </>
    );
}

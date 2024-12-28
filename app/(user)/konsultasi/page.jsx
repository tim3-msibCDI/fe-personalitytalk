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
  const ajakan =
    "Tuangkanlah Semua Masalah Kamu Melalui Konsultasi PersonalityTalk";

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="md:px-8 lg:px-12 ml-4 lg:ml-8 mr-4 lg:mr-8 py-9 flex flex-col-reverse md:flex-row">
        <div className="w-full md:w-3/5">
          <h1 className="sm:text-h1 text-h3 font-bold text-textcolor py-4 pr-0 md:pr-16">
            {ajakan}
          </h1>
          <div className="w-full">
            <ButtonPrimary
              className="flex items-center justify-center sm:text-h3 text-m font-semibold"
              onClick={openModal}
            >
              Mulai Konsultasi
              <Image
                src="/image/icons/arrow.png"
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
        <div className="w-full md:w-2/5 mb-6 md:mb-0">
          <Image
            src="/image/img-content/hero1.svg"
            alt="foto"
            width={1920}
            height={1080}
            className="mx-auto"
          />
        </div>
      </div>

      {/* Modal component */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Topik onClose={closeModal} />{" "}
        {/* Mengirim fungsi closeModal sebagai prop */}
      </Modal>

      <Cara />
      <FAQ />
    </>
  );
}

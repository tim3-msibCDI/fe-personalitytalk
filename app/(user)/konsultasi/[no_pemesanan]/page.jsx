"use client";

import Image from "next/image";
import Psikolog from "@/components/konsultasi/form-wizard/psikolog";
import Modal from "@/components/modals/modal";
import InfoTransfer from "@/components/popup/info-transfer";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getToken } from "@/lib/auth";

export default function Konsultasi() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const no_pemesanan = searchParams.get("no_pemesanan");

    const [transactionData, setTransactionData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        const fetchTransactionData = async () => {
            setLoading(true); // Set loading to true before fetching
            try {
                const token = getToken();
                if (!token) {
                    router.push("/login");
                    return;
                }

                const psi_id = localStorage.getItem("selectedPsikologId");
                const psch_id = localStorage.getItem("selectedPschId");
                const topic_id = localStorage.getItem("selectedTopic");
                const voucher_code = localStorage.getItem("voucher_code") || "";

                if (!psi_id || !psch_id || !topic_id) {
                    throw new Error("Data ID tidak lengkap di localStorage");
                }

                const body = {
                    psi_id,
                    psch_id,
                    topic_id,
                    voucher_code,
                    payment_method_id: 2
                };

                const url = `${process.env.NEXT_PUBLIC_API_URL}/consultation/create-transaction`;
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                });

                const result = await response.json();
                if (!response.ok || !result.success) {
                    throw new Error(result.message || "Gagal membuat transaksi");
                }

                setTransactionData(result.data.transaction); // Update transactionData
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error("Error:", error.message);
                setLoading(false); // Set loading to false in case of error
            }
        };

        if (no_pemesanan) fetchTransactionData();
    }, [no_pemesanan, router]);

    if (loading) return <p>Memuat detail transaksi...</p>;
    if (!transactionData) return <p>Data transaksi tidak ditemukan</p>;

    const {
        psikolog_name,
        photo_profile,
        category,
        rating,
        years_of_experience,
        price,
        topic,
        consultation_date,
        consultation_time,
        transaction,
    } = transactionData;

    return (
        <div className="px-6 md:px-8 lg:px-12 py-9 ml-4 lg:ml-8 mr-4 lg:mr-8">
            <div className="py-6">
                <div className="flex items-center gap-4 cursor-pointer" onClick={() => router.back()}>
                    <Image src="/icons/arrow_back.png" alt="icon kembali" width={9} height={14} />
                    <p className="text-m font-bold">Konsultasi Saya</p>
                </div>
                <div className="flex gap-8 mt-6">
                    <div className="w-2/5">
                        <div className="bg-primarylight2 rounded-md p-4">
                            {/* Informasi Psikolog */}
                            <Psikolog
                                data={{
                                    name: psikolog_name,
                                    photo: `${process.env.NEXT_PUBLIC_API_URL}/${photo_profile}`,
                                    category,
                                    rating,
                                    experience: years_of_experience,
                                    price,
                                }}
                            />
                            <hr className="border-1 border-black my-4" />

                            {/* Detail Konsultasi */}
                            <div className="text-m gap-2">
                                <p className="font-semibold mb-2">Detail Konsultasi</p>
                                <div className="grid grid-cols-2 gap-y-2 text-m text-textcolor">
                                    <p>Topik Konsultasi</p>
                                    <p>: {topic || "-"}</p>

                                    <p>Durasi Konsultasi</p>
                                    <p>: 60 menit</p>

                                    <p>Jadwal Konsultasi</p>
                                    <p>: {consultation_date || "-"}</p>

                                    <p>Waktu Konsultasi</p>
                                    <p>: {consultation_time || "-"}</p>
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

                    {/* Modal Informasi Transfer */}
                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                        <InfoTransfer />
                    </Modal>
                </div>
            </div>
        </div>
    );
}

import Image from "next/image";
import Modal from "@/components/modals/modal";
import Catatan from "@/components/popup/catatan";
import { useState } from "react";
import { getToken } from "@/lib/auth";

export default function Pembayaran({ status }) {
    const [isCatatanModalOpen, setCatatanModalOpen] = useState(false);
    const [formValues, setFormValues] = useState({
        nama: "",
        rekening: "",
        bukti: null,
    });
    const [isLoading, setIsLoading] = useState(false);

    const openCatatanModal = () => setCatatanModalOpen(true);
    const closeCatatanModal = () => setCatatanModalOpen(false);

    const handleInputChange = (field, value) => {
        setFormValues((prev) => ({ ...prev, [field]: value }));
    };

    const isFormComplete = () => {
        const { nama, rekening, bukti } = formValues;
        return nama && rekening && bukti;
    };

    const handleProsesLanjut = async () => {
        const transactionData = JSON.parse(localStorage.getItem("transactionData")); // Ambil data transaksi
        if (!transactionData || !transactionData.id_transaction) {
            alert("ID transaksi tidak ditemukan di localStorage!");
            return;
        }
        const idTransaction = transactionData.id_transaction;

        setIsLoading(true);

        const formData = new FormData();
        formData.append("id_transaction", idTransaction); // ID Transaksi
        formData.append("payment_proof", formValues.bukti); // File Bukti Pembayaran
        formData.append("sender_name", formValues.nama); // Nama Pemilik Rekening
        formData.append("sender_bank", formValues.rekening); // Nama Bank

        try {
            // Ambil token menggunakan fungsi getToken
            const token = await getToken();
            if (!token) {
                alert("Token tidak ditemukan. Silakan login ulang.");
                return;
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/consultation/upload-payment-proof`, {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "ngrok-skip-browser-warning": "69420",
                },
            });

            if (response.ok) {
                alert("Pembayaran berhasil dikirim!");
                // Muat ulang halaman
                window.location.reload();
            } else {
                const errorData = await response.json();
                alert(`Gagal mengirim pembayaran: ${errorData.message || "Terjadi kesalahan."}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Terjadi kesalahan saat mengirim pembayaran.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-row gap-8">
            {/* Batas Waktu */}
            <div className="w-full">
                {status === "pending" ? (
                    <>
                        <div className="bg-primary px-4 py-3 rounded-t-lg text-m text-whitebg flex justify-center">
                            <p className="font-semibold">Pembayaran</p>
                        </div>
                        <div className="bg-primarylight2 rounded-b-lg text-s text-textcolor">
                            <div className="px-4 py-2 flex flex-col items-center text-center text-s">
                                <p>Selesaikan Pembayaran sebelum waktu habis</p>
                                <p className="font-semibold mt-2">04.00</p>
                            </div>
                            <div className="px-4 py-3">
                                <form className="space-y-2">
                                    {/* Input Nama Rekening */}
                                    <div>
                                        <label htmlFor="nama" className="block text-s text-textcolor">
                                            Pemilik Rekening
                                        </label>
                                        <input
                                            type="text"
                                            id="nama"
                                            placeholder="Masukkan Nama Rekening"
                                            className={`bg-gray-50 border border-gray-300 ${formValues.nama ? "text-black" : "text-text2"
                                            } text-s rounded-lg block w-full p-2`}
                                            value={formValues.nama}
                                            onChange={(e) => handleInputChange("nama", e.target.value)}
                                        />
                                    </div>
                                    {/* Input Bank */}
                                    <div>
                                        <label htmlFor="rekening" className="block text-s text-textcolor">
                                            Nama Bank
                                        </label>
                                        <input
                                            type="text"
                                            id="rekening"
                                            placeholder="Masukkan Nama Bank"
                                            className={`bg-gray-50 border border-gray-300 ${formValues.rekening ? "text-black" : "text-text2"
                                            } text-s rounded-lg block w-full p-2`}
                                            value={formValues.rekening}
                                            onChange={(e) => handleInputChange("rekening", e.target.value)}
                                        />
                                    </div>
                                    {/* Input Bukti Transfer */}
                                    <div>
                                        <label htmlFor="bukti" className="block text-s text-textcolor">
                                            Upload Bukti Pembayaran
                                        </label>
                                        <input
                                            type="file"
                                            id="bukti"
                                            accept=".jpg,.jpeg,.png,.pdf"
                                            className={`bg-gray-50 border border-gray-300 ${formValues.bukti ? "text-black" : "text-text2"
                                            } text-s rounded-lg block w-full p-2`}
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    // Validasi ukuran file
                                                    const maxFileSize = 2 * 1024 * 1024; // 2MB
                                                    if (file.size > maxFileSize) {
                                                        alert("Ukuran file tidak boleh lebih dari 2 MB!");
                                                        e.target.value = null; // Reset file input
                                                        return;
                                                    }
                                                    handleInputChange("bukti", file);
                                                }
                                            }}
                                        />
                                    </div>
                                    {/* Button Proses Lanjut */}
                                    <button
                                        type="button"
                                        disabled={!isFormComplete() || isLoading}
                                        className={`w-full py-2 rounded-md font-semibold text-whitebg ${isFormComplete() && !isLoading ? "bg-primary" : "bg-disable"
                                            }`}
                                        onClick={handleProsesLanjut}
                                    >
                                        {isLoading ? "Mengirim..." : "Proses Lanjut"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </>
                ) : status === "completed" ? (
                    <div className="flex flex-col space-y-4">
                        {/* Button tambah catatan */}
                        <button
                            onClick={openCatatanModal}
                            className="flex items-center justify-center space-x-2 p-3 border border-primary text-primary rounded-lg text-m font-semibold"
                        >
                            <Image
                                src="/icons/catatan.png"
                                alt="Icon Catatan"
                                width={24}
                                height={24}
                            />
                            <span>Tambah Keluhan</span>
                        </button>
                        {/* Button Chat Psikolog */}
                        <button className="flex items-center justify-center space-x-2 p-3 bg-primary text-whitebg text-m font-semibold rounded-lg">
                            <Image
                                src="/icons/konsultasi.png"
                                alt="Chat Psikolog Icon"
                                width={24}
                                height={24}
                            />
                            <span>Chat Psikolog</span>
                        </button>
                    </div>
                ) : status === "failed" ? null : null}
            </div>
            {/* Modal untuk Tambah Catatan */}
            <Modal isOpen={isCatatanModalOpen} onClose={closeCatatanModal}>
                <Catatan onClose={closeCatatanModal} />
            </Modal>
        </div>
    );
}

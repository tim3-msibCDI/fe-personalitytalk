import Image from "next/image";
import Modal from "@/components/modals/modal";
import Catatan from "@/components/popup/catatan";
import { useState, useEffect } from "react";
import { getToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Pembayaran({ status,  chat_status, chat_sessions_id, consultation_id, sender_id, receiver_id }) {
    const [isCatatanModalOpen, setCatatanModalOpen] = useState(false);
    const [formValues, setFormValues] = useState({
        nama: "",
        rekening: "",
        bukti: null,
    });
    const [hasComplaint, setHasComplaint] = useState(false); 
    const [isLoading, setIsLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    const router = useRouter();

    const openCatatanModal = () => setCatatanModalOpen(true);
    const closeCatatanModal = () => setCatatanModalOpen(false);

    // Ambil ID Transaksi
    const transactionData = JSON.parse(localStorage.getItem("transactionData"));
    const idTransaction = transactionData?.id_transaction;
// console.log("ID Transaksi:", idTransaction);

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
        const idTransaction = transactionData?.id_transaction;

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

    const handlePesanLagi = () => {
        router.push("/konsultasi"); // Navigasi ke halaman /konsultasi
    };

    const handleChatClick = ({ consulId, chatSessionId, psikologId, senderId, chatStatus }) => {
        if (chat_status === "scheduled") {
          alert(
            "Sesi konsultasi belum dimulai. Silakan tunggu hingga waktu yang dijadwalkan."
          );
        } else if (chat_status === "ongoing" || chat_status === "completed") {
        //   setChatId(chat_sessions_id);
        //   setConsulId(consultation_id);
        //   setSenderId(sender_id);
        //   setReceiverId(receiver_id);
        //   setChatStatus(chat_status);

          localStorage.setItem("clientChatData", JSON.stringify({ consulId, chatSessionId, psikologId, senderId, chatStatus }));
          router.push(`/konsultasi/chat`);
        } else {
          alert("Chat hanya tersedia untuk sesi yang dijadwalkan atau sedang berlangsung.");
        }
      };

    useEffect(() => {
        if (!idTransaction) return;

        const fetchComplaintStatus = async () => {
            try {
                const token = await getToken();
                if (!token) {
                    console.error("Token tidak ditemukan. Silakan login ulang.");
                    return;
                }

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/consultation/detail-complaint/${idTransaction}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                            "ngrok-skip-browser-warning": "69420",
                        },
                    }
                );

                const result = await response.json();
                if (response.ok && result.data) {
                    setHasComplaint(true); // Keluhan ditemukan
                } else {
                    setHasComplaint(false); // Keluhan tidak ditemukan
                }
            } catch (error) {
                console.error("Error fetching complaint status:", error);
            }
        };

        fetchComplaintStatus();
    }, [idTransaction]);

    useEffect(() => {
        if (status === "pending") {
            // Ambil waktu akhir dari localStorage atau hitung baru jika tidak ada
            const transactionEndTime =
                localStorage.getItem("transactionEndTime") ||
                new Date().getTime() + 15 * 60 * 1000; // 15 menit dari sekarang

            localStorage.setItem("transactionEndTime", transactionEndTime); // Simpan waktu akhir jika belum ada

            const timer = setInterval(() => {
                const now = new Date().getTime();
                const remainingTime = Math.max(Math.floor((transactionEndTime - now) / 1000), 0);

                setTimeLeft(remainingTime);

                if (remainingTime <= 0) {
                    clearInterval(timer);
                    alert("Waktu pembayaran telah habis.");
                    // Tambahkan logika tambahan, seperti navigasi atau update status
                }
            }, 1000);

            return () => clearInterval(timer); // Bersihkan timer saat komponen di-unmount
        }
    }, [status]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
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
                                <p className="font-semibold mt-2">{formatTime(timeLeft)}</p>
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
                                        {isLoading ? "Mengirim..." : "Kirim Bukti"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </>
                ) : status === "pending_confirmation" ? (
                    <>
                        <div className="bg-primary px-4 py-3 rounded-t-lg text-m text-whitebg flex justify-center">
                            <p className="font-semibold">Pembayaran</p>
                        </div>
                        <div className="bg-primarylight2 rounded-b-lg text-s text-textcolor">
                            <div className="px-6 py-32 text-center flex flex-col justify-center items-center">
                                <p className="text-s font-semibold">Data Kamu Telah Diterima</p>
                                <p className="text-s">Kami sedang memproses dan mengecek data Kamu dan akan memberikan konfirmasi segera.</p>
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
                            <span>{hasComplaint ? "Keluhan Saya" : "Tambah Keluhan"}</span>
                        </button>
                        {/* Button Chat Psikolog */}
                        <button
                         className="flex items-center justify-center space-x-2 p-3 bg-primary text-whitebg text-m font-semibold rounded-lg"
                         onClick={() =>
                            handleChatClick({
                              consulId: consultation_id,
                              chatSessionId: chat_sessions_id,
                              psikologId: receiver_id, 
                              senderId: sender_id,
                              chatStatus: status,
                            })
                          }   
                         >
                            <Image
                                src="/icons/konsultasi.png"
                                alt="Chat Psikolog Icon"
                                width={24}
                                height={24}
                            />
                            <span>Chat Psikolog</span>
                        </button>
                    </div>
                ) : status === "failed" ? (
                    <div className="flex flex-col space-y-4">
                        <button
                            onClick={handlePesanLagi}
                            className="flex items-center justify-center space-x-2 p-3 text-white bg-primary rounded-lg text-m font-semibold"
                        >
                            Pesan Lagi
                        </button>
                    </div>
                ) : null}
            </div>
            {/* Modal untuk Tambah Catatan */}
            <Modal isOpen={isCatatanModalOpen} onClose={closeCatatanModal}>
                <Catatan onClose={closeCatatanModal} consulId={consultation_id}/>
            </Modal>
        </div>
    );
}

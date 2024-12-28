"use client";

import Image from "next/image";
import Psikolog from "@/components/konsultasi/form-wizard/psikolog";
import Modal from "@/components/modals/modal";
import InfoTransfer from "@/components/popup/info-transfer";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getToken } from "@/lib/auth";
import Pembayaran from "@/components/konsultasi/form-wizard/pembayaran";
import Loading from "@/components/loading/loading";

export default function DetailTransaksi() {
  const router = useRouter();
  const pathname = usePathname();

  // State untuk data transaksi dan loading
  const [transactionData, setTransactionData] = useState(null);
  const [loading, setLoading] = useState(true);

  // State untuk modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchTransactionData = async () => {
      setLoading(true);
      try {
        // Ambil token autentikasi
        const token = getToken();
        if (!token) {
          alert("Anda perlu login untuk mengakses halaman ini.");
          router.push("/login");
          return;
        }
        const id_transaction = localStorage.getItem("id_transaction");

        // Fetch data transaksi dari API
        const url = `${process.env.NEXT_PUBLIC_API_URL}/history/consultation/transaction/${id_transaction}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
          },
        });

        // Jika respons gagal
        if (!response.ok) {
          console.error("Status API Error:", response.status);
          throw new Error("Gagal mengambil data transaksi.");
        }

        // Ambil dan proses hasil JSON
        const result = await response.json();

        if (!result.success) {
          throw new Error(
            result.message || "Gagal mengambil detail transaksi."
          );
        }

        // Set data transaksi ke state
        setTransactionData(result.data);
      } catch (error) {
        console.error("Error fetching transaction data:", error.message);
        alert("Terjadi kesalahan. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionData();
  }, [pathname, router]);

  // Jika data masih loading
  if (loading) return <Loading />;

  // Jika data transaksi tidak ditemukan
  if (!transactionData) return <p>Data transaksi tidak ditemukan</p>;

  // Destruktur data transaksi
  const {
    id_consultation,
    psi_id,
    client_id,
    chat_session_id,
    chat_status,
    psikolog_name,
    photo_profile,
    category,
    rating,
    years_of_experience,
    topic,
    consultation_date,
    consultation_time,
    transaction: {
      payment_method_name,
      owner_bank,
      no_rekening,
      booking_date,
      payment_date,
      status,
      no_pemesanan,
      total_harga,
      diskon,
      total_pembayaran,
    },
  } = transactionData;

  // Fungsi kalkulasi durasi konsultasi
  function calculateDuration(consultationTime) {
    if (!consultationTime) return 0;

    try {
      // Memisahkan waktu mulai dan waktu selesai
      const [startTime, endTime] = consultationTime.split(" - ");

      // Memecah jam dan menit dari waktu mulai
      const [startHour, startMinute] = startTime.split(":").map(Number);

      // Memecah jam dan menit dari waktu selesai
      const [endHour, endMinute] = endTime.split(":").map(Number);

      // Mengubah waktu ke dalam format Date
      const startDate = new Date(0, 0, 0, startHour, startMinute);
      const endDate = new Date(0, 0, 0, endHour, endMinute);

      // Menghitung durasi dalam menit
      const duration = (endDate - startDate) / (1000 * 60);

      return duration > 0 ? duration : 0; // Pastikan durasi tidak negatif
    } catch (error) {
      console.error("Error saat menghitung durasi:", error);
      return 0; // Kembalikan 0 jika ada error
    }
  }

  // Format harga
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })
      .format(price)
      .replace("Rp", "Rp ");
  };

  return (
    <div className="px-6 md:px-8 lg:px-12 py-9 ml-4 lg:ml-8 mr-4 lg:mr-8">
      <div className="py-6">
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => router.back()}
        >
          <Image
            src="/image/icons/arrow_back.png"
            alt="icon kembali"
            width={9}
            height={14}
          />
          <p className="text-m font-bold">Konsultasi Saya</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 mt-6">
          <div className="w-full lg:w-2/5">
            <div className="bg-primarylight2 rounded-md p-4">
              {/* Informasi Psikolog */}
              <Psikolog
                data={{
                  name: psikolog_name,
                  photo: `${process.env.NEXT_PUBLIC_IMG_URL}/${photo_profile}`,
                  category,
                  rating,
                  experience: years_of_experience,
                  status,
                }}
              />
              <hr className="border-1 border-black my-4" />

              {/* Detail Konsultasi */}
              <div className="text-m gap-2">
                <p className="font-semibold mb-2">Detail Konsultasi</p>
                <div className="grid grid-cols-2 gap-y-2 sm:text-m text-s text-textcolor">
                  <p>Topik Konsultasi</p>
                  <p>: {topic}</p>

                  <p>Durasi Konsultasi</p>
                  <p>: {calculateDuration(consultation_time)} menit</p>

                  <p>Jadwal Konsultasi</p>
                  <p>: {consultation_date}</p>

                  <p>Waktu Konsultasi</p>
                  <p>: {consultation_time}</p>
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
          <div className="w-full lg:w-3/5">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Rincian */}
              <div className="w-full lg:w-3/5">
                {/* Detail Pemesanan */}
                <div className="bg-primarylight2 p-4 rounded-lg h-auto w-full max-w-[500px] flex flex-col justify-center">
                  <p className="text-m font-semibold text-left mb-3">
                    Detail Pemesanan
                  </p>
                  <div className="grid grid-cols-2 gap-y-2 sm:text-m text-s text-textcolor">
                    <p>No. Pemesanan</p>
                    <p>: {no_pemesanan}</p>

                    <p>Metode Pembayaran</p>
                    <p>: {payment_method_name}</p>

                    <p>Atas Nama</p>
                    <p>: {owner_bank}</p>

                    <p>No. Rekening</p>
                    <p>: {no_rekening}</p>

                    <p>Waktu Pemesanan</p>
                    <p>: {booking_date}</p>

                    {(status === "pending_confirmation" ||
                      status === "completed") && (
                      <>
                        <p>Waktu Pembayaran</p>
                        <p>: {payment_date}</p>
                      </>
                    )}
                  </div>
                </div>
                {/* Rincian nota */}
                <div className="bg-primarylight2 justify-start p-4 rounded-lg mt-4 h-auto w-full max-w-[500px] flex flex-col justify-center">
                  <p className="text-m font-semibold text-left mb-3">
                    Rincian Nota
                  </p>
                  <div className="grid grid-cols-2 gap-y-2 lg:text-m text-s text-textcolor">
                    <p>Total Harga Konsultasi</p>
                    <p>: {formatPrice(total_harga)}</p>

                    <p>Diskon Voucher</p>
                    <p>: {formatPrice(diskon)}</p>

                    <p className="font-semibold">Total Pembayaran</p>
                    <p className="font-semibold">
                      : {formatPrice(total_pembayaran)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Pembayaran */}
              <div className="w-full lg:w-2/5">
                <Pembayaran
                  status={status}
                  chat_status={chat_status}
                  chat_sessions_id={chat_session_id}
                  consultation_id={id_consultation}
                  sender_id={client_id}
                  receiver_id={psi_id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Informasi Transfer */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <InfoTransfer onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}

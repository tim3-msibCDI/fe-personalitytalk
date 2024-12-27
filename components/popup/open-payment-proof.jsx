import Image from "next/image";
import { useState, useEffect } from "react";
import { getToken } from "@/lib/auth";

export default function PaymentProofModal({
  isOpen,
  onClose,
  idTransaksi,
  status,
  senderName,
  senderBank,
  paymentProof,
  failureReason,
}) {
  const [rejectionReason, setRejectionReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log(failureReason);

  // Set nilai awal rejectionReason dari failureReason
  useEffect(() => {
    if (failureReason) {
      setRejectionReason(failureReason);
    }
  }, [failureReason]);

  console.log(senderBank);
  console.log(failureReason);

  const handleApprove = async () => {
    setIsSubmitting(true);
    try {
      const token = getToken();
      if (!token) throw new Error("Token tidak ditemukan!");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/consultation/transactions/approve/${idTransaksi}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Gagal menyetujui bukti pembayaran.");
      }

      alert("Bukti pembayaran berhasil disetujui.");
      onClose(); // Tutup modal setelah berhasil
    } catch (error) {
      console.error("Error approving payment proof:", error);
      alert("Terjadi kesalahan saat menyetujui bukti pembayaran.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      alert("Harap isi alasan penolakan!");
      return;
    }
    const reason = rejectionReason.trim();

    setIsSubmitting(true);
    try {
      const token = getToken();
      if (!token) throw new Error("Token tidak ditemukan!");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/consultation/transactions/reject/${idTransaksi}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reason }),
        }
      );

      if (!response.ok) {
        throw new Error("Gagal menolak bukti pembayaran.");
      }

      alert("Bukti pembayaran berhasil ditolak.");
      onClose(); // Tutup modal setelah berhasil
    } catch (error) {
      console.error("Error rejecting payment proof:", error);
      alert("Terjadi kesalahan saat menolak bukti pembayaran.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg lg:w-[480px] w-96 h-auto max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat diklik di dalam
      >
        <div className="bg-primary text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-lg font-semibold">Bukti Pembayaran</h2>
          <Image
            src="/image/icons/close.png"
            alt="Tutup"
            width={26}
            height={26}
            className="cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="p-6 space-y-4">
          <div>
            <p>Pemilik Rekening: {senderName}</p>
          </div>
          <div>
            <p>Bank Pengirim: {senderBank}</p>
          </div>
          <div>
            {paymentProof && (
              <Image
                src={`${process.env.NEXT_PUBLIC_IMG_URL}/${paymentProof}`}
                alt="Bukti Pembayaran"
                width={190}
                height={190}
                className="rounded-lg"
              />
            )}
          </div>
          <div>
            <p>Berikan Alasan</p>
            <textarea
              className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Masukkan alasan penolakan"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            ></textarea>
          </div>

          {/* Cek apakah statusnya completed atau failed */}
          {status !== "completed" && status !== "failed" && (
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleReject}
                className={`flex items-center px-4 py-2 rounded-md ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 text-white"
                }`}
                disabled={isSubmitting}
              >
                <Image
                  src="/image/icons/no.png" // Path untuk ikon "Tolak"
                  alt="Ikon Tolak"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                {isSubmitting ? "Menyimpan..." : "Tolak"}
              </button>
              <button
                onClick={handleApprove}
                className={`flex items-center px-4 py-2 rounded-md ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 text-white"
                }`}
                disabled={isSubmitting}
              >
                <Image
                  src="/image/icons/yes.png" // Path untuk ikon "Setujui"
                  alt="Ikon Setujui"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                {isSubmitting ? "Menyetujui..." : "Setujui"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import { useState, useEffect } from "react";
import { getToken } from "@/lib/auth";

export default function CommissionProofModal({
  isOpen,
  onClose,
  idCommission,
  status,
  psychologistName,
  paymentMethod,
  commissionAmount,
  paymentProof,
  failureReason,
}) {
  const [rejectionReason, setRejectionReason] = useState("");

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
          <h2 className="text-lg font-semibold">Bukti Komisi</h2>
          <Image
            src="/icons/close.png"
            alt="Tutup"
            width={26}
            height={26}
            className="cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="p-6 space-y-4">
          <div>
            <p>Nama Psikolog: {psychologistName}</p>
          </div>
          <div>
            <p>Metode Pembayaran: {paymentMethod}</p>
          </div>
          <div>
            <p>Jumlah Komisi: Rp {commissionAmount}</p>
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
        </div>
      </div>
    </div>
  );
}

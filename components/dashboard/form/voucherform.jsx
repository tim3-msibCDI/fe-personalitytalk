"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/modals/modal";
import { addVoucher } from "@/api/manage-keuangan";
import Image from "next/image";

export default function VoucherForm() {
  const router = useRouter();

  // State form
  const [code, setCode] = useState("");
  const [discountValue, setDiscountValue] = useState(null);
  const [minTransactionAmount, setMinTransactionAmount] = useState(null);
  const [validFrom, setValidFrom] = useState("");
  const [validTo, setValidTo] = useState("");
  const [quota, setQuota] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(""); // Tambahan state untuk gambar modal

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      code,
      voucher_type: "consultation", // Tetap "consultation"
      discount_value: discountValue,
      min_transaction_amount: minTransactionAmount,
      valid_from: validFrom,
      valid_to: validTo,
      quota,
    };

    setLoading(true);
    try {
      const response = await addVoucher(formData);
      setMessage(response.message || "Voucher berhasil ditambahkan");
      setModalImage("/icons/dashboard/sucess.svg"); // Gambar sukses
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
        router.push("/admin/keuangan/voucher");
      }, 3000);
    } catch (error) {
      setMessage(error.message || "Terjadi kesalahan");
      setModalImage("/icons/dashboard/fail.svg"); // Gambar gagal
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // Validasi form
  const isFormValid = () => {
    return (
      code.trim() &&
      discountValue > 0 &&
      minTransactionAmount > 0 &&
      validFrom.trim() &&
      validTo.trim() &&
      quota > 0
    );
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="container mx-auto p-4 bg-primarylight2 rounded-md"
      >
        <div className="space-y-4">
          <div>
            <label>Kode Voucher</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Masukkan Kode Voucher"
              className="border border-textcolor p-2 rounded-md w-full"
            />
          </div>

          <div>
            <label>Jenis Voucher</label>
            <input
              type="text"
              value="consultation"
              disabled
              className="border border-textcolor p-2 rounded-md w-full bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label>Nilai Diskon</label>
            <input
              type="number"
              value={discountValue}
              onChange={(e) => setDiscountValue(parseInt(e.target.value))}
              placeholder="Masukkan Nilai Diskon"
              className="border border-textcolor p-2 rounded-md w-full"
            />
          </div>

          <div>
            <label>Minimal Transaksi</label>
            <input
              type="number"
              value={minTransactionAmount}
              onChange={(e) =>
                setMinTransactionAmount(parseInt(e.target.value))
              }
              placeholder="Masukkan Minimal Transaksi"
              className="border border-textcolor p-2 rounded-md w-full"
            />
          </div>

          <div>
            <label>Berlaku Dari</label>
            <input
              type="date"
              value={validFrom}
              onChange={(e) => setValidFrom(e.target.value)}
              className="border border-textcolor p-2 rounded-md w-full"
            />
          </div>

          <div>
            <label>Berlaku Hingga</label>
            <input
              type="date"
              value={validTo}
              onChange={(e) => setValidTo(e.target.value)}
              className="border border-textcolor p-2 rounded-md w-full"
            />
          </div>

          <div>
            <label>Kuota</label>
            <input
              type="number"
              value={quota}
              onChange={(e) => setQuota(parseInt(e.target.value))}
              placeholder="Masukkan Kuota"
              className="border border-textcolor p-2 rounded-md w-full"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2 disabled:bg-disable disabled:cursor-not-allowed"
            disabled={!isFormValid() || loading}
          >
            {loading ? "Memproses..." : "Simpan"}
          </button>
        </div>
      </form>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6 text-center">
          <Image
            src={modalImage}
            width={150}
            height={150}
            alt="modal status"
            className="mx-auto"
          />
          <h2 className="text-h2 font-medium text-textcolor">{message}</h2>
        </div>
      </Modal>
    </>
  );
}

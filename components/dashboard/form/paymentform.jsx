"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addPaymentMethod, editPaymentMethod } from "@/api/manage-keuangan";
import Image from "next/image";
import Modal from "@/components/modals/modal";

const API_REAL = process.env.NEXT_PUBLIC_IMG_URL;

export default function PaymentForm({
  isAddMode = false,
  isEditMode = false,
  paymentData,
}) {
  const router = useRouter();

  // State form
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [noRek, setNoRek] = useState("");
  const [owner, setOwner] = useState("");
  const [logo, setLogo] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Prefill data jika mode edit
  useEffect(() => {
    if (isEditMode && paymentData) {
      setName(paymentData.name || "");
      setType(paymentData.type || "");
      setBankCode(paymentData.bank_code || "");
      setNoRek(paymentData.no_rek || "");
      setOwner(paymentData.owner || "");

      // Jika logo berupa URL
      const linkPhoto =
        paymentData.logo && paymentData.logo.startsWith("http")
          ? paymentData.logo
          : paymentData.logo
          ? `${API_REAL}/${paymentData.logo}`
          : "/images/default-bank-logo.jpg";

      setLogo(linkPhoto);
      setPreviewImage(linkPhoto); // Pratinjau gambar
    }
  }, [isEditMode, paymentData]);

  // Handle perubahan file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      type,
      bank_code: bankCode,
      no_rek: noRek,
      owner,
    };

    if (logo && typeof logo === "object") {
      formData.logo = logo;
    }

    setLoading(true);
    try {
      if (isAddMode) {
        const response = await addPaymentMethod(formData);
        setMessage(response.message || "Rekening berhasil ditambahkan");
      } else if (isEditMode) {
        // Kirim hanya data yang berubah
        const updatedData = {};
        for (const key in formData) {
          if (formData[key] !== paymentData[key]) {
            updatedData[key] = formData[key];
          }
        }

        const response = await editPaymentMethod(paymentData.id, updatedData);
        setMessage(response.message || "Data rekening berhasil diubah");
      }

      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
        router.push("/admin/keuangan/rekening");
      }, 3000);
    } catch (error) {
      setMessage(error.message || "Terjadi kesalahan");
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // Validasi form
  const isFormValid = () => {
    return (
      name.trim() &&
      type.trim() &&
      bankCode.trim() &&
      noRek.trim() &&
      owner.trim()
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
            <label>Nama Bank</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan Nama Bank"
              className="border border-textcolor p-2 rounded-md w-full"
            />
          </div>

          <div>
            <label>Jenis Pembayaran</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border border-textcolor p-2 rounded-md w-full"
            >
              <option value="" disabled>Pilih Jenis Pembayaran</option>
              <option value="Pembayaran Otomatis">Pembayaran Otomatis</option>
              <option value="Transfer Bank">Transfer Bank</option>
            </select>
          </div>

          <div>
            <label>Kode Bank</label>
            <input
              type="text"
              value={bankCode}
              onChange={(e) => setBankCode(e.target.value)}
              placeholder="Masukkan Kode Bank"
              className="border border-textcolor p-2 rounded-md w-full"
            />
          </div>

          <div>
            <label>Nomor Rekening</label>
            <input
              type="text"
              value={noRek}
              onChange={(e) => setNoRek(e.target.value)}
              placeholder="Masukkan Nomor Rekening"
              className="border border-textcolor p-2 rounded-md w-full"
            />
          </div>

          <div>
            <label>Nama Pemilik</label>
            <input
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              placeholder="Masukkan Nama Pemilik Rekening"
              className="border border-textcolor p-2 rounded-md w-full"
            />
          </div>

          <div>
            <label>Gambar</label>
            <div className="mt-2">
              {previewImage && (
                <Image
                  src={previewImage}
                  alt="Preview"
                  width={150}
                  height={150}
                  className="rounded-md object-cover"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-textcolor"
              />
            </div>
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
            src="/image/icons/sucess.svg"
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

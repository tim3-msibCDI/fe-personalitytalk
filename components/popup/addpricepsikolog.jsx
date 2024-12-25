import { useState, useEffect } from "react";
import Modal from "../modals/modal";
import { addPsikologPrice, updatePsikologPrice } from "@/api/manage-psikolog";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AddPriceModal({
  isOpen,
  onClose,
  priceData = null,
  modalType = "add",
  onDataUpdated, // Terima props callback
}) {
  const [formData, setFormData] = useState({ code: "", price: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (priceData && modalType === "edit") {
      setFormData(priceData);
    } else {
      setFormData({ code: "", price: "" });
    }
  }, [priceData, modalType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      let response;

      if (modalType === "edit" && priceData?.id) {
        response = await updatePsikologPrice(priceData.id, {
          code: formData.code,
          price: parseInt(formData.price, 10),
        });
      } else {
        response = await addPsikologPrice({
          code: formData.code,
          price: parseInt(formData.price, 10),
        });
      }

      if (response.success) {
        setMessage({ type: "success", text: response.message });
        onDataUpdated(); // Panggil fungsi untuk update data setelah operasi berhasil
        router.refresh();
        onClose(); // Tutup modal
      } else {
        setMessage({ type: "error", text: response.message });
        console.log("Error response:", response);
      }
    } catch (error) {
      console.error("Error during submission:", error);
      setMessage({
        type: "error",
        text: "Terjadi kesalahan saat menyimpan data.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="">
        {/* Header */}
        <div className="flex justify-between items-center bg-orange-500 p-4 rounded-t-md">
          <h2 className="text-white text-lg font-semibold">
            {modalType === "edit" ? "Edit Data" : "Tambah Data"}
          </h2>
          <button
            onClick={onClose}
            className="text-white text-xl font-bold focus:outline-none"
          >
            X
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 bg-gray-50 rounded-b-md">
          <div className="mb-4">
            <label>No SIPP</label>
            <input
              type="text"
              id="code"
              name="code"
              placeholder="Masukan No SIPP"
              value={formData.code}
              onChange={handleChange}
              className="border border-textcolor p-2 rounded-md w-full bg-white text-textcolor"
              required
            />
          </div>
          <div className="mb-4">
            <label>Harga</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Masukan Harga"
              value={formData.price}
              onChange={handleChange}
              className="border border-textcolor p-2 rounded-md w-full bg-white text-textcolor"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none"
              disabled={loading}
            >
              {loading ? (
                "Menyimpan..."
              ) : (
                <>
                  <Image
                    src="/image/icons/dashboard/save.svg"
                    alt="Save"
                    width={20}
                    height={20}
                  />
                  Simpan
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "../modals/modal";
import axios from "axios";
import { getToken } from "@/lib/auth";
import useSWR, { mutate } from "swr"; // Import mutate

export default function AddCommissionModal({ isOpen, onClose, onDataUpdated }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    consultation_id: "",
    transfer_proof: null,
  });
  const [consultations, setConsultations] = useState([]);
  const [consultationDetails, setConsultationDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Fetch all consultation IDs
  useEffect(() => {
    const fetchConsultationIds = async () => {
      if (isOpen) {
        try {
          const token = getToken();
          if (!token) throw new Error("Token tidak ditemukan!");

          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/admin/consultation/psikolog_commission/id`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420",
              },
            }
          );

          if (response.data.success) {
            setConsultations(response.data.data.map((item) => item.id)); // Extract IDs only
          }
        } catch (error) {
          console.error("Error fetching consultation IDs:", error);
        }
      }
    };

    fetchConsultationIds();
  }, [isOpen]);

  // Fetch consultation details when consultation_id changes
  useEffect(() => {
    const fetchConsultationDetails = async () => {
      if (formData.consultation_id) {
        try {
          const token = getToken();
          if (!token) throw new Error("Token tidak ditemukan!");

          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/admin/consultation/psikolog_commission/${formData.consultation_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420",
              },
            }
          );

          if (response.data.success) {
            setConsultationDetails(response.data.data);
          }
        } catch (error) {
          console.error("Error fetching consultation details:", error);
        }
      }
    };

    fetchConsultationDetails();
  }, [formData.consultation_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      transfer_proof: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const token = getToken();
      if (!token) throw new Error("Token tidak ditemukan!");

      const formDataObj = new FormData();
      formDataObj.append("transfer_proof", formData.transfer_proof);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/consultation/psikolog_commission/${formData.consultation_id}/transfer-commission`,
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      if (response.data.success) {
        setMessage({ type: "success", text: response.data.message });
        // Refresh the data using mutate
        mutate("/admin/consultation/psikolog_commission"); // Update the key to match your data fetching
        onDataUpdated(); // Callback to refresh data
        router.refresh(); // Trigger router refresh if needed
        onClose(); // Close the modal
      } else {
        setMessage({ type: "error", text: response.data.message });
      }
    } catch (error) {
      console.error("Error submitting commission:", error);
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
      <div>
        {/* Header */}
        <div className="flex justify-between items-center bg-orange-500 p-4 rounded-t-md">
          <h2 className="text-white text-lg font-semibold">
            Kirim Komisi Psikolog
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
            <label className="block text-gray-700 mb-2">ID Konsultasi</label>
            <select
              name="consultation_id"
              value={formData.consultation_id}
              onChange={handleChange}
              className="border p-2 rounded-md w-full bg-white text-gray-700"
              required
            >
              <option value="">Pilih ID Konsultasi</option>
              {consultations.map((id) => (
                <option key={id} value={id}>
                  {id}
                </option>
              ))}
            </select>
          </div>

          {consultationDetails && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Nama Psikolog
                </label>
                <input
                  type="text"
                  value={consultationDetails.psikolog_name}
                  className="border p-2 rounded-md w-full bg-gray-200 text-gray-700"
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Komisi Psikolog
                </label>
                <input
                  type="text"
                  value={`Rp ${consultationDetails.psikolog_comission}`}
                  className="border p-2 rounded-md w-full bg-gray-200 text-gray-700"
                  readOnly
                />
              </div>
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Bank</label>
                  <input
                    type="text"
                    value={consultationDetails.payment_method}
                    className="border p-2 rounded-md w-full bg-gray-200 text-gray-700"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    Nomor Rekening
                  </label>
                  <input
                    type="text"
                    value={consultationDetails.rekening}
                    className="border p-2 rounded-md w-full bg-gray-200 text-gray-700"
                    readOnly
                  />
                </div>
              </div>
            </>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Bukti Bayar</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border p-2 rounded-md w-full bg-white text-gray-700"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none"
              disabled={loading}
            >
              {loading ? "Mengirim..." : "Kirim"}
            </button>
          </div>
        </form>

        {/* Message */}
        {message && (
          <div
            className={`mt-4 p-2 rounded ${
              message.type === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {message.text}
          </div>
        )}
      </div>
    </Modal>
  );
}

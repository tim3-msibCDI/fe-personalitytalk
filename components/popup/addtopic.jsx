import { useState, useEffect } from "react";
import Modal from "../modals/modal";
import { addTopic, updateTopic } from "@/api/manage-konsultasi"; // Import the necessary functions
import { useRouter } from "next/navigation";

export default function AddTopicModal({
  isOpen,
  onClose,
  topicData = null,
  modalType = "add", // default is "add", can be "edit" when editing a topic
  onDataUpdated, // Callback to refresh data after operation
}) {
  const [formData, setFormData] = useState({ topic_name: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const router = useRouter();

  // Effect to set form data when modalType is "edit"
  useEffect(() => {
    if (topicData && modalType === "edit") {
      setFormData(topicData); // Pre-fill form with existing topic data
    } else {
      setFormData({ topic_name: "" }); // Reset form data for adding a new topic
    }
  }, [topicData, modalType]);

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

      if (modalType === "edit" && topicData?.id) {
        // If editing, call the updateTopic function
        response = await updateTopic(topicData.id, { topic_name: formData.topic_name });
      } else {
        // If adding, call the addTopic function
        response = await addTopic({ topic_name: formData.topic_name });
      }

      if (response.success) {
        setMessage({ type: "success", text: response.message });
        onDataUpdated(); // Callback to refresh data
        router.refresh(); // Optionally refresh the page or data
        onClose(); // Close the modal after success
      } else {
        setMessage({ type: "error", text: response.message });
      }
    } catch (error) {
      console.error("Error during submission:", error);
      setMessage({ type: "error", text: "Terjadi kesalahan saat menyimpan data." });
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
            {modalType === "edit" ? "Edit Topik" : "Tambah Topik"}
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
            <label className="block text-gray-700 mb-2">Nama Topik</label>
            <input
              type="text"
              name="topic_name"  // Change name to 'topic_name'
              placeholder="Masukkan Nama Topik"
              value={formData.topic_name}  // Use topic_name for value
              onChange={handleChange}
              className="border p-2 rounded-md w-full bg-white text-gray-700"
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
                  <span className="text-xl font-bold">+</span>
                  {modalType === "edit" ? "Update" : "Tambah"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

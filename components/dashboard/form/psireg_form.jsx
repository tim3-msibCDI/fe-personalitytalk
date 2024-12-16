import { useState } from "react";
import Image from "next/image";
import { approvedPsikolog, rejectedPsikolog } from "@/api/manage-psikolog";
import { useRouter } from "next/navigation";

const API_REAL = process.env.NEXT_PUBLIC_API_URL2;

export default function PsiViewForm({
  isViewMode = false,
  psychologistData,
  id,
}) {
  const router = useRouter();
  const {
    name,
    email,
    phone_number: phoneNumber,
    photo_profile: photoProfile,
    date_birth: dateBirth,
    gender,
    sipp,
    practice_start_date: practiceStartDate,
    description,
    selected_topics: selectedTopics,
  } = psychologistData;

  const [isModalOpen, setModalOpen] = useState(false);
  const [isRejectModalOpen, setRejectModalOpen] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState({
    isOpen: false,
    message: "",
    success: false,
  });
  const [rejectReason, setRejectReason] = useState("");
  const [loading, setLoading] = useState(false);

  const linkPhoto =
    photoProfile && photoProfile.startsWith("http")
      ? photoProfile
      : photoProfile
      ? `${API_REAL}${photoProfile}`
      : "/image/default-profile.jpg";

  const renderInputField = (label, value) => (
    <div>
      <label>{label}</label>
      <input
        type="text"
        value={value || "-"}
        disabled
        className="border border-textcolor p-2 rounded-md w-full bg-white text-textcolor"
      />
    </div>
  );

  const renderTextAreaField = (label, value) => (
    <div>
      <label>{label}</label>
      <textarea
        value={value || "-"}
        disabled
        className="border border-textcolor p-2 rounded-md w-full bg-white text-textcolor"
        rows={Math.max(3, Math.ceil((value?.length || 0) / 50))}
      />
    </div>
  );

  const handleApprove = async () => {
    setLoading(true);
    try {
      await approvedPsikolog(id);
      setFeedbackModal({
        isOpen: true,
        message: "Psikolog berhasil disetujui.",
        success: true,
      });
      setTimeout(() => router.push("/admin/psikolog/kelola-psikolog"), 2000);
    } catch (error) {
      setFeedbackModal({
        isOpen: true,
        message: "Gagal menyetujui psikolog.",
        success: false,
      });
    } finally {
      setLoading(false);
      setModalOpen(false);
    }
  };

  const handleReject = async () => {
    setLoading(true);
    try {
      await rejectedPsikolog(id, rejectReason);
      setFeedbackModal({
        isOpen: true,
        message: "Psikolog berhasil ditolak.",
        success: true,
      });
      setTimeout(() => router.push("/admin/psikolog/kelola-psikolog"), 2000);
    } catch (error) {
      setFeedbackModal({
        isOpen: true,
        message: "Gagal menolak psikolog.",
        success: false,
      });
    } finally {
      setLoading(false);
      setRejectModalOpen(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-primarylight2 rounded-lg">
      <h2 className="text-h3 font-semibold text-textcolor mb-4">
        Biodata Psikolog
      </h2>
      <div className="flex items-start space-x-6">
        <div className="flex-shrink-0">
          <Image
            src={linkPhoto}
            alt="Profile"
            width={275}
            height={275}
            className="rounded-lg"
          />
        </div>

        <div className="flex-1 space-y-4 border-l border-text2 pl-6">
          {renderInputField("Nama Lengkap", name)}
          {renderInputField("Email", email)}
          {renderInputField("Nomor Telepon", phoneNumber)}
          {renderInputField(
            "Jenis Kelamin",
            gender === "M" ? "Laki-laki" : gender === "F" ? "Perempuan" : "-"
          )}
          {renderInputField("Tanggal Lahir", dateBirth)}
          {renderInputField("SIPP", sipp)}
          {renderInputField("Tanggal Mulai Praktik", practiceStartDate)}
          {renderInputField("Topik Keahlian", selectedTopics.join(", "))}
          {renderTextAreaField("Deskripsi", description)}
          <div className="w-full mt-6">
            <label>Status Pendaftaran</label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setRejectModalOpen(true)}
                className="flex-1 bg-red-500 text-white font-medium py-2 px-6 flex items-center justify-center space-x-2 rounded-md hover:bg-red-600"
              >
                <Image
                  src="/icons/dashboard/rejected.svg"
                  alt="Reject Icon"
                  width={20}
                  height={20}
                />
                <span>Tolak Psikolog</span>
              </button>

              <button
                onClick={() => setModalOpen(true)}
                className="flex-1 bg-green-500 text-white font-medium py-2 px-6 flex items-center justify-center space-x-2 rounded-md hover:bg-green-600"
              >
                <Image
                  src="/icons/dashboard/approved.svg"
                  alt="Approve Icon"
                  width={20}
                  height={20}
                />
                <span>Terima Psikolog</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Confirm Approve */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-96 h-48">
            <p>Apakah Anda yakin ingin menyetujui psikolog ini?</p>
            <div className="mt-14 flex justify-between space-x-4 ">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-300 py-2 px-4 rounded-md hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={handleApprove}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                disabled={loading}
              >
                {loading ? "Loading..." : "Ya, Setujui"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Confirm Reject */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-1/3 rounded-lg shadow-lg">
            <div className="bg-fail text-white flex justify-between items-center rounded-t-lg px-6 py-3">
              <h3 className="text-m font-medium">Psikolog Ditolak</h3>
              <button
                onClick={() => setRejectModalOpen(false)}
                className="text-white text-xl font-extrabold hover:text-gray-200 focus:outline-none"
              >
                ✕
              </button>
            </div>

            <div className="px-6 py-4">
              <label htmlFor="rejectReason" className="block font-medium mb-2">
                Berikan Alasan
              </label>
              <textarea
                id="rejectReason"
                className="border border-gray-300 p-2 rounded-md w-full resize-none text-s"
                placeholder="Berikan Alasan Mengapa Mereka Ditolak"
                rows={4}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              ></textarea>
            </div>

            <div className="flex justify-end items-center px-6 py-4 rounded-b-lg">
              <button
                onClick={handleReject}
                className="flex items-center bg-fail text-white py-2 px-4 rounded-md hover:bg-red-600"
                disabled={loading}
              >
                <Image
                  src="/icons/dashboard/rejected.svg"
                  alt="Reject Icon"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                {loading ? "Loading..." : "Tolak Psikolog"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {feedbackModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-5">
          <div className="bg-white p-6 rounded-md text-center w-96 h-64">
            <Image
              src={
                feedbackModal.success
                  ? "/icons/dashboard/sucess.svg"
                  : "/icons/dashboard/fail.svg"
              }
              alt="Feedback Icon"
              width={150}
              height={150}
              className="mx-auto"
            />
            <h2 className="mt-4 text-h2 font-medium text-textcolor">
              {feedbackModal.message}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Select from "react-select";
import { editPsikolog, getTopics, fetchBanks } from "@/api/manage-psikolog";
import Modal from "@/components/modals/modal";

const API_REAL = process.env.NEXT_PUBLIC_API_URL2;

export default function PsiForm({
  isEditMode = false,
  isViewMode = false,
  konselorMode = false,
  psychologistData,
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [dateBirth, setDateBirth] = useState("");
  const [sipp, setSipp] = useState("");
  const [practiceStartDate, setPracticeStartDate] = useState("");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [availableTopics, setAvailableTopics] = useState([]); // State untuk topik yang tersedia
  const [bank, setBank] = useState("");
  const [bankId, setBankId] = useState("");
  const [rekening, setRekening] = useState("");
  const [listtopics, setListtopics] = useState("");
  const [photoProfile, setPhotoProfile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableBanks, setAvailableBanks] = useState([]); // State untuk daftar bank

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoProfile(file);
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPhotoProfile(null);
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {};
    const checkAndUpdate = (key, stateValue, originalValue) => {
      // Jika stateValue null atau undefined, jangan tambahkan ke updatedData
      if (stateValue === null || stateValue === undefined) {
        return;
      }
    
      if (key === "rekening") {
        // Hanya tambahkan jika rekening berubah dan tidak kosong/null
        if (stateValue && stateValue !== originalValue) {
          updatedData[key] = stateValue;
        }
      } else if (key === "bank_id") {
        // Hanya tambahkan jika bank_id berubah dan valid
        const stateValueNumber = Number(stateValue);
        if (!isNaN(stateValueNumber) && stateValueNumber !== Number(originalValue)) {
          updatedData[key] = stateValueNumber;
        }
      } else if (stateValue !== originalValue) {
        // Field lainnya
        updatedData[key] = stateValue;
      }
    };

    checkAndUpdate("name", name, psychologistData.name);
    checkAndUpdate("email", email, psychologistData.email);
    checkAndUpdate("phone_number", phoneNumber, psychologistData.phone_number);
    checkAndUpdate("date_birth", dateBirth, psychologistData.date_birth);
    checkAndUpdate("gender", gender, psychologistData.gender);
    checkAndUpdate("sipp", sipp, psychologistData.sipp);
    checkAndUpdate(
      "practice_start_date",
      practiceStartDate,
      psychologistData.practice_start_date
    );
    checkAndUpdate("bank_id", bankId, psychologistData.bank_id); // Bank ID
    checkAndUpdate("rekening", rekening, psychologistData.rekening);

    const selectedTopicIds = selectedTopics.map((topic) => topic.value);

    if (
      selectedTopicIds.length > 0 &&
      !selectedTopicIds.every((id) =>
        psychologistData.selected_topics?.map((topic) => topic.id).includes(id)
      )
    ) {
      updatedData.updated_topics = selectedTopicIds;
    }

    if (photoProfile && photoProfile !== psychologistData.photo_profile) {
      updatedData.photo_profile = photoProfile; // Pastikan ini adalah data gambar terbaru
    }

    if (Object.keys(updatedData).length === 0) {
      setMessage("Tidak ada perubahan yang dibuat.");
      setIsModalOpen(true);
      return;
    }

    setLoading(true);
    console.log("Updated Data: ", updatedData);

    try {
      const response = await editPsikolog(psychologistData.id, updatedData);
      setMessage(response.message || "Data psikolog berhasil diubah");
      setIsModalOpen(true);

      setTimeout(() => {
        setIsModalOpen(false);
        if (!konselorMode) {
          router.push("/admin/psikolog/daftar-psikolog");
        } else {
          router.push("/admin/psikolog/daftar-konselor");
        }
      }, 3000);
    } catch (error) {
      setMessage(error.message || "Terjadi kesalahan");
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEditMode) {
      const fetchTopicsAndBanks = async () => {
        try {
          const topics = await getTopics();
          const banks = await fetchBanks();

          setAvailableTopics(
            topics.data.map((topic) => ({
              value: topic.id,
              label: topic.topic_name,
            }))
          );

          setAvailableBanks(
            banks.map((bank) => ({
              value: bank.id.toString(),
              label: bank.name,
            }))
          );
        } catch (error) {
          console.error(
            "Error fetching topics and banks:",
            error.response || error
          );
        }
      };

      fetchTopicsAndBanks();
    }

    if (psychologistData) {
      console.log("Psychologist data:", psychologistData);

      setName(psychologistData.name || "");
      setEmail(psychologistData.email || "");
      setPhoneNumber(psychologistData.phone_number || "");
      setGender(psychologistData.gender || "");
      setDateBirth(psychologistData.date_birth || "");
      setSipp(psychologistData.sipp || "");
      setPracticeStartDate(psychologistData.practice_start_date || "");
      setRekening(psychologistData.rekening || "");

      setBank(psychologistData.bank_name || "");
      setBankId(
        psychologistData.bank_id ? psychologistData.bank_id.toString() : ""
      );

      const topicSelections =
        psychologistData.selected_topics?.map((topic) => ({
          value: topic.id,
          label: topic.topic_name,
        })) || [];
      setSelectedTopics(topicSelections);

      const topicList = psychologistData.selected_topics
        ?.map((topic) => topic.topic_name)
        .join(", ");
      setListtopics(topicList || "");

      const linkPhoto =
        psychologistData.photo_profile &&
        psychologistData.photo_profile.startsWith("http")
          ? psychologistData.photo_profile
          : psychologistData.photo_profile
          ? `${API_REAL}${psychologistData.photo_profile}`
          : "/image/default-profile.jpg";

      setPhotoProfile(linkPhoto);
      setPreviewImage(linkPhoto);
    }
  }, [isEditMode, psychologistData]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="container mx-auto p-6 bg-primarylight2 rounded-lg"
      >
        <h2 className="text-h3 font-semibold text-textcolor mb-4">
          {isEditMode ? "Edit Data Psikolog" : "Biodata Psikolog"}
        </h2>
        <div className="flex items-start space-x-6">
          <div className="flex-shrink-0">
            <Image
              src={previewImage || "/image/default-profile.jpg"}
              alt="Profile"
              width={275}
              height={275}
              className="rounded-lg"
            />
            {isEditMode && (
              <div className="mt-2">
                <label className="block text-sm font-medium text-textcolor">
                  Unggah Foto Profil
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-textcolor file:mr-4 file:py-1 file:px-4 file:border file:border-textcolor file:text-sm file:font-medium file:bg-whitebg file:text-textcolor hover:file:bg-primarydark"
                />
              </div>
            )}
          </div>

          <div className="flex-1 space-y-4 border-l border-text2 pl-6">
            <div>
              <label>Nama Lengkap</label>
              <input
                id="fullName"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditMode}
                className="border border-textcolor p-2 rounded-md w-full disabled:bg-white disabled:text-textcolor"
              />
            </div>
            <div>
              <label>Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditMode}
                className="border border-textcolor p-2 rounded-md w-full disabled:bg-white disabled:text-textcolor"
              />
            </div>
            <div>
              <label>Nomor Telepon</label>
              <input
                id="phone"
                name="phone_number"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={!isEditMode}
                className="border border-textcolor p-2 rounded-md w-full disabled:bg-white disabled:text-textcolor"
              />
            </div>
            <div>
              <label>Jenis Kelamin</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                disabled={!isEditMode}
                className="border border-textcolor p-2 rounded-md w-full disabled:bg-white disabled:text-textcolor"
              >
                <option value="">Pilih</option>
                <option value="M">Laki-laki</option>
                <option value="F">Perempuan</option>
              </select>
            </div>
            <div>
              <label>Tanggal Lahir</label>
              <input
                type="date"
                value={dateBirth}
                onChange={(e) => setDateBirth(e.target.value)}
                disabled={!isEditMode}
                className="border border-textcolor p-2 rounded-md w-full disabled:bg-white disabled:text-textcolor"
              />
            </div>
            <div>
              <label>SIPP</label>
              <input
                type="text"
                value={konselorMode ? "-" : sipp}
                onChange={(e) => setSipp(e.target.value)}
                disabled={!isEditMode || !!konselorMode}
                className="border border-textcolor p-2 rounded-md w-full disabled:bg-white disabled:text-textcolor"
              />
            </div>
            <div className="flex items-start gap-6 w-full">
              <div className="flex-1">
                <label>Tanggal Mulai Praktik</label>
                <input
                  type="date"
                  value={practiceStartDate}
                  onChange={(e) => setPracticeStartDate(e.target.value)}
                  disabled={!isEditMode}
                  className="border border-textcolor p-2 rounded-md w-full disabled:bg-white disabled:text-textcolor"
                />
              </div>
              <div className="flex-1 text-textcolor">
                <label>Topik Keahlian</label>
                {isViewMode ? (
                  <input
                    type="text"
                    value={listtopics}
                    disabled
                    className="border border-textcolor p-2 rounded-md w-full disabled:bg-white disabled:text-textcolor"
                  />
                ) : (
                  <div className="flex flex-wrap gap-4">
                    <Select
                      isMulti
                      value={selectedTopics}
                      onChange={(topics) => setSelectedTopics(topics)}
                      options={availableTopics}
                      isDisabled={!isEditMode}
                      className="mt-2"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-start gap-6 w-full">
              <div className="flex-1">
                <label>Bank</label>
                {isViewMode ? (
                  <input
                    type="text"
                    value={bank}
                    disabled
                    className="border border-textcolor p-2 rounded-md w-full disabled:bg-white disabled:text-textcolor"
                  />
                ) : (
                  <select
                    value={bankId}
                    onChange={(e) => {
                      const selectedBank = availableBanks.find(
                        (bankOption) => bankOption.value === e.target.value
                      );
                      setBankId(selectedBank ? selectedBank.value : "");
                      setBank(selectedBank ? selectedBank.label : "");
                    }}
                    disabled={!isEditMode}
                    className="border border-textcolor p-2 rounded-md w-full disabled:bg-white disabled:text-textcolor"
                  >
                    <option value="">Pilih Bank</option>
                    {availableBanks.map((bankOption) => (
                      <option key={bankOption.value} value={bankOption.value}>
                        {bankOption.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="flex-1">
                <label>Nomor Rekening</label>
                <input
                  type="text"
                  value={rekening}
                  onChange={(e) => setRekening(e.target.value)}
                  disabled={!isEditMode}
                  className="border border-textcolor p-2 rounded-md w-full disabled:bg-white disabled:text-textcolor"
                />
              </div>
            </div>
          </div>
        </div>
        {isEditMode && (
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md disabled:bg-disable disabled:cursor-not-allowed"
              disabled={
                loading || !bank || selectedTopics.length === 0 || !rekening
              }
            >
              {loading ? "Memproses..." : "Simpan Perubahan"}
            </button>
          </div>
        )}
      </form>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6 text-center">
          <div className="py-16">
            <Image
              src="/icons/dashboard/sucess.svg"
              width={150}
              height={150}
              alt="success"
              className="mx-auto"
            />
            <h2 className="mt-4 text-h2 font-medium text-textcolor text-center">
              Data Psikolog Berhasil Diubah.
            </h2>
          </div>
        </div>
      </Modal>
    </>
  );
}

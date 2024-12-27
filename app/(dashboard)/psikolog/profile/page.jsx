"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useUser } from "@/constants/useUser";
import Loading from "@/components/loading/loading";
import Modal from "@/components/modals/modal";
import { getToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("id-ID", options);
};

export default function PsikologProfile() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, isLoading, isError, updateUserProfile } = useUser();
  const [topicsList, setTopicsList] = useState([]);
  const [showTopicsDropdown, setShowTopicsDropdown] = useState(false);
  const [bankList, setBanksList] = useState([]); // State untuk daftar bank

  useEffect(() => {
    if (isEditing) {
      // Fetch topics list from API when editing is enabled
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/psikolog/topics`, {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setTopicsList(data.data); // Ambil array 'data' dari respons
          } else {
            console.error("Failed to fetch topics:", data.message);
          }
        })
        .catch((error) => console.error("Error fetching topics:", error));

      // Ambil token autentikasi
      const token = getToken();
      if (!token) {
        alert("Anda perlu login untuk mengakses halaman ini.");
        router.push("/login");
        return;
      }

      // Fetch daftar bank
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/psikolog/banks`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setBanksList(data.data); // Simpan daftar bank dari API
          } else {
            console.error("Failed to fetch banks:", data.message);
          }
        })
        .catch((error) => console.error("Error fetching banks:", error));
    }
  }, [isEditing]);

  if (isLoading) return <Loading />;
  if (isError) return <p>Error loading user data</p>;

  const formattedDate = user.dateBirth ? formatDate(user.dateBirth) : "";

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setFormData({
      ...user,
      gender: user.gender === "F" ? "F" : "M", // Atur nilai gender dengan benar
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Change detected:", name, value);
    if (name === "topics") {
      const selectedOptions = Array.from(e.target.selectedOptions).map(
        (option) => ({
          id: parseInt(option.value),
          topic_name: option.text,
        })
      );
      setFormData({ ...formData, topics: selectedOptions });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      name: formData.name,
      email: formData.email,
      gender: formData.gender,
      date_birth: formData.dateBirth,
      phone_number: formData.phoneNumber,
      sipp: formData.sipp || "",
      practice_start_date: formData.practiceStartDate,
      description: formData.description,
      bank_id:
        bankList.find((bank) => bank.name === formData.bankName)?.id || null, // Ambil ID bank berdasarkan nama
      rekening: formData.rekening,
      topics: formData.topics.map((topic) => topic.id), // Ambil hanya ID topik
    };

    try {
      await updateUserProfile(dataToSend);
      setFormData((prev) => ({ ...prev, ...dataToSend }));
      setIsEditing(false);

      // Tampilkan alert keberhasilan
      alert("Profil berhasil diperbarui!");

      // Reload halaman untuk memuat data terbaru
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-start">
        <h3 className="text-h3 font-semibold pb-3">Biodata Diri</h3>
        {!isEditing && (
          <button
            className="inline-flex bg-primary text-white px-6 py-2 rounded-lg hover:bg-hover"
            onClick={toggleEdit}
          >
            <Image
              src="/image/icons/pencil-white.svg"
              width={20}
              height={20}
              alt="Edit Icon"
              className="mr-2"
            />
            Edit Biodata
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Nama Lengkap */}
        <div className="my-2">
          <label>Nama Lengkap</label>
          <input
            type="text"
            name="name"
            value={isEditing ? formData.name : user.name}
            onChange={handleChange}
            className={`border border-gray-300 w-full rounded-lg p-3 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
            disabled={!isEditing}
          />
        </div>

        {/* Email */}
        <div className="my-2">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={isEditing ? formData.email : user.email}
            onChange={handleChange}
            className={`border border-gray-300 w-full rounded-lg p-3 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
            disabled={!isEditing}
          />
        </div>

        {/* Nomor Telepon */}
        <div className="my-2">
          <label>Nomor Telepon</label>
          <input
            type="text"
            name="phoneNumber"
            value={isEditing ? formData.phoneNumber : user.phoneNumber}
            onChange={handleChange}
            className={`border border-gray-300 w-full rounded-lg p-3 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
            disabled={!isEditing}
          />
        </div>

        {/* Gender */}
        <div className="my-2">
          <label>Jenis Kelamin</label>
          {isEditing ? (
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border border-gray-300 w-full rounded-lg p-3 bg-white"
            >
              <option value="M">Laki-laki</option>
              <option value="F">Perempuan</option>
            </select>
          ) : (
            <input
              type="text"
              name="gender"
              value={user.gender}
              className="border border-gray-300 w-full rounded-lg p-3 bg-gray-100"
              disabled
            />
          )}
        </div>

        {/* Tanggal Lahir */}
        <div className="my-2">
          <label>Tanggal Lahir</label>
          <input
            type={isEditing ? "date" : "text"}
            name="dateBirth"
            value={isEditing ? formData.dateBirth : formattedDate}
            onChange={handleChange}
            className={`border border-gray-300 w-full rounded-lg p-3 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
            disabled={!isEditing}
          />
        </div>

        {/* SIPP */}
        <div className="my-2">
          <label>Surat Izin Praktek Psikolog (SIPP)</label>
          <input
            type="text"
            name="sipp"
            value={isEditing ? formData.sipp : user.sipp}
            onChange={handleChange}
            className={`border border-gray-300 w-full rounded-lg p-3 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
            disabled={!isEditing}
          />
        </div>

        {/* Tanggal Awal Praktek */}
        <div className="my-2">
          <label>Tanggal Awal Praktek</label>
          <input
            type={isEditing ? "date" : "text"}
            name="practiceStartDate"
            value={
              isEditing ? formData.practiceStartDate : user.practiceStartDate
            }
            onChange={handleChange}
            className={`border border-gray-300 w-full rounded-lg p-3 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
            disabled={!isEditing}
          />
        </div>

        {/* Topik Keahlian */}
        <div className="my-2">
          <label>Topik Keahlian</label>
          {isEditing ? (
            <div className="border border-gray-300 w-full rounded-lg p-3 bg-white">
              <div className="grid grid-cols-3 gap-4">
                {topicsList.map((topic) => (
                  <label key={topic.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={topic.id}
                      checked={formData.topics.some((t) => t.id === topic.id)}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        const updatedTopics = isChecked
                          ? [
                              ...formData.topics,
                              { id: topic.id, topic_name: topic.topic_name },
                            ]
                          : formData.topics.filter((t) => t.id !== topic.id);
                        setFormData({ ...formData, topics: updatedTopics });
                      }}
                      className="w-4 h-4"
                    />
                    <span>{topic.topic_name}</span>
                  </label>
                ))}
              </div>
            </div>
          ) : (
            <ul className="flex flex-row gap-2 border border-gray-300 w-full rounded-lg p-3 bg-gray-100">
              {user.topics.map((topic, index) => (
                <li key={topic.id}>
                  {topic.topic_name}
                  {index < user.topics.length - 1 && ","}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Bank */}
        <div className="my-2">
          <label>Bank</label>
          {isEditing ? (
            <select
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              className="border border-gray-300 w-full rounded-lg p-3 bg-white"
            >
              <option value="">Pilih Bank</option>
              {bankList.map((bank) => (
                <option key={bank.id} value={bank.name}>
                  {bank.name}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              name="bankName"
              value={user.bankName}
              className="border border-gray-300 w-full rounded-lg p-3 bg-gray-100"
              disabled
            />
          )}
        </div>

        {/* Nomor Rekening */}
        <div className="my-2">
          <label>Nomor Rekening</label>
          <input
            type="text"
            name="rekening"
            value={isEditing ? formData.rekening : user.rekening}
            onChange={handleChange}
            className={`border border-gray-300 w-full rounded-lg p-3 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
            disabled={!isEditing}
          />
        </div>

        {/* Deskripsi */}
        <div className="my-2">
          <label>Deskripsi</label>
          <textarea
            name="description"
            value={isEditing ? formData.description : user.description}
            onChange={handleChange}
            className={`border border-gray-300 w-full rounded-lg p-3 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
            disabled={!isEditing}
          ></textarea>
        </div>

        {isEditing && (
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
              onClick={() => setIsEditing(false)}
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-hover"
            >
              Simpan
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

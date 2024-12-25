"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import Image from "next/image";
import { addMahasiswa, editMahasiswa } from "@/api/manage-mahasiswa";
import Modal from "@/components/modals/modal";

const API_REAL = process.env.NEXT_PUBLIC_IMG_URL;

export default function MhsForm({
  isEditMode = false,
  isAddMode = false,
  isViewMode = false,
  mahasiswaData,
}) {
  const router = useRouter(); // Inisialisasi useRouter
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [dateBirth, setDateBirth] = useState("");
  const [universitas, setUniversitas] = useState(""); // Tambahkan universitas
  const [jurusan, setJurusan] = useState(""); // Tambahkan jurusan
  const [photoProfile, setPhotoProfile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // Pratinjau gambar
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (mahasiswaData) {
      setName(mahasiswaData.name || "");
      setEmail(mahasiswaData.email || "");
      setPhoneNumber(mahasiswaData.phone_number || "");
      setGender(mahasiswaData.gender || "");
      setDateBirth(mahasiswaData.date_birth || "");

      // Access universitas and jurusan from mahasiswa object
      setUniversitas(mahasiswaData.mahasiswa.universitas || "");
      setJurusan(mahasiswaData.mahasiswa.jurusan || "");

      const linkPhoto =
        mahasiswaData.photo_profile &&
        mahasiswaData.photo_profile.startsWith("http")
          ? mahasiswaData.photo_profile
          : mahasiswaData.photo_profile
          ? `${API_REAL}/${mahasiswaData.photo_profile}`
          : "/image/default-profile.jpg";

      setPhotoProfile(linkPhoto);
      setPreviewImage(linkPhoto);
    }
  }, [mahasiswaData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoProfile(file); // Set file ke state
      setPreviewImage(URL.createObjectURL(file)); // Pratinjau gambar
    } else {
      setPhotoProfile(null);
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      phone_number: phoneNumber,
      gender,
      date_birth: dateBirth,
      universitas,
      jurusan,
    };

    // Tambahkan photo_profile hanya jika ada
    if (photoProfile) {
      formData.photo_profile = photoProfile;
    }

    setLoading(true);
    try {
      if (isAddMode) {
        const response = await addMahasiswa(formData);
        setMessage(response.message || "Mahasiswa berhasil ditambahkan");
        console.log(response);
      } else if (isEditMode) {
        // Kirimkan hanya data yang berubah
        const updatedData = {};
        for (const key in formData) {
          if (formData[key] !== mahasiswaData[key]) {
            updatedData[key] = formData[key];
          }
        }

        const response = await editMahasiswa(mahasiswaData.id, updatedData);
        setMessage(response.message || "Data mahasiswa berhasil diubah");
      }
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
        router.push("/admin/pengguna/mahasiswa"); // Redirect setelah modal tertutup
      }, 3000); // Tutup modal setelah 3 detik
    } catch (error) {
      setMessage(error.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      name.trim() &&
      email.trim() &&
      phoneNumber.trim() &&
      gender &&
      dateBirth &&
      universitas.trim() &&
      jurusan.trim() &&
      photoProfile
    );
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="container mx-auto p-6 bg-primarylight2 rounded-lg"
      >
        <h2 className="text-h3 font-semibold text-textcolor mb-4">
          {isAddMode
            ? "Tambah Mahasiswa"
            : isEditMode
            ? "Edit Biodata Mahasiswa"
            : "Biodata Mahasiswa"}
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
            {!isViewMode && (isEditMode || isAddMode) && (
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
                disabled={!isAddMode && !isEditMode && isViewMode}
                placeholder={isAddMode ? "Masukkan nama lengkap" : ""}
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
                disabled={!isAddMode && !isEditMode && isViewMode}
                placeholder={isAddMode ? "Masukkan email" : ""}
                className="border border-textcolor p-2 rounded-md w-full disabled:bg-white disabled:text-textcolor"
              />
            </div>
            <div>
              <label>Nomor Telepon</label>
              <div className="flex items-center border border-textcolor rounded-md w-full bg-white">
                <span className="px-2">+62</span>
                <input
                  id="phone"
                  name="phone_number"
                  type="number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={!isAddMode && !isEditMode && isViewMode}
                  placeholder={isAddMode ? "Masukkan nomor telepon" : ""}
                  className="w-full p-2 mr-2 outline-none"
                />
              </div>
            </div>
            <div>
              <label>Jenis Kelamin</label>
              <select
                id="gender"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                disabled={!isAddMode && !isEditMode && isViewMode}
                className="border border-textcolor p-2 rounded-md w-full disabled:bg-white disabled:text-textcolor"
              >
                <option value="">Jenis Kelamin</option>
                <option value="M">Laki-laki</option>
                <option value="F">Perempuan</option>
              </select>
            </div>
            <div>
              <label>Tanggal Lahir</label>
              <input
                id="birthDate"
                name="date_birth"
                type="date"
                value={dateBirth}
                onChange={(e) => setDateBirth(e.target.value)}
                disabled={!isAddMode && !isEditMode && isViewMode}
                placeholder={isAddMode ? "Masukkan tanggal lahir" : ""}
                className="border border-textcolor p-2 rounded-md w-full disabled:bg-white disabled:text-textcolor"
              />
            </div>
            <div>
              <label>Universitas</label>
              <input
                id="universitas"
                name="universitas"
                type="text"
                value={universitas}
                onChange={(e) => setUniversitas(e.target.value)}
                disabled={!isAddMode && !isEditMode && isViewMode}
                placeholder={isAddMode ? "Masukkan nama universitas" : ""}
                className="border border-textcolor p-2 rounded-md w-full disabled:bg-white disabled:text-textcolor"
              />
            </div>
            <div>
              <label>Jurusan</label>
              <input
                id="jurusan"
                name="jurusan"
                type="text"
                value={jurusan}
                onChange={(e) => setJurusan(e.target.value)}
                disabled={!isAddMode && !isEditMode && isViewMode}
                placeholder={isAddMode ? "Masukkan jurusan" : ""}
                className="border border-textcolor p-2 rounded-md w-full disabled:bg-white disabled:text-textcolor"
              />
            </div>
          </div>
        </div>
        {!isViewMode && (isEditMode || isAddMode) && (
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md disabled:bg-disable disabled:cursor-not-allowed"
              disabled={!isFormValid() || loading}
            >
              <Image
                src="/image/icons/dashboard/save.svg"
                width={20}
                height={20}
                alt="sv"
              />
              {loading
                ? "Memproses..."
                : isAddMode
                ? "Simpan Data"
                : "Simpan Perubahan"}
            </button>
          </div>
        )}
      </form>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6 text-center">
          <div className="py-16">
            <Image
              src="/image/icons/dashboard/sucess.svg"
              width={150}
              height={150}
              alt="success"
              className="mx-auto"
            />
            <h2 className="mt-4 text-h2 font-medium text-textcolor text-center">
              {isAddMode
                ? "Mahasiswa Berhasil Ditambahkan."
                : isEditMode
                ? "Data Mahasiswa Berhasil Diubah."
                : "Operasi Berhasil"}
            </h2>
          </div>
        </div>
      </Modal>
    </>
  );
}

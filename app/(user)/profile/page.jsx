"use client";

import { useState } from "react";
import Image from "next/image";
import { useUser } from "@/constants/UserContext";
import { updateProfile } from "@/api/user";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("id-ID", options);
};

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const { user, setUser } = useUser();

  const formattedDate = user.dateBirth ? formatDate(user.dateBirth) : "";

  // Fungsi untuk toggle mode edit
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setFormData(user);
  };

  // Fungsi untuk menangani perubahan pada input form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Menyiapkan data yang akan dikirimkan
    const dataToSend = {
      name: formData.nama,
      email: formData.email,
      gender: formData.gender,
      date_birth: formData.dateBirth,
      phone_number: formData.phoneNumber,
    };

    if (formData.gender === "Perempuan") {
      dataToSend.gender = "F";
    } else if (formData.gender === "Laki-laki") {
      dataToSend.gender = "M";
    }

    // Jika role adalah "M", tambahkan universitas dan jurusan ke data yang dikirim
    if (user.role === "M") {
      dataToSend.universitas = formData.universitas;
      dataToSend.jurusan = formData.jurusan;
    }

    try {
      const response = await updateProfile(dataToSend);

      if (response && response.data) {
        // Update state user di context dengan data baru
        setUser((prevUser) => ({
          ...prevUser,
          ...dataToSend,
        }));
        setIsEditing(false); // Kembali ke mode non-edit
      } else {
        console.error("Invalid response from updateProfile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-start self-stretch">
        <h3 className="text-h3 font-semibold pb-3">Biodata Diri</h3>
        {!isEditing && (
          <button
            className="inline-flex bg-primary text-whitebg px-6 py-2 rounded-lg flex-start hover:bg-hover"
            onClick={toggleEdit}
          >
            <Image
              src="/icons/pencil-white.svg"
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
        </div>
        <div>
          <input
            type="text"
            name="nama"
            value={isEditing ? formData.nama : user.nama}
            onChange={handleChange}
            className="border border-textcolor bg-whitebg w-full rounded-lg p-3"
            disabled={!isEditing}
          />
        </div>

        {/* Email */}
        <div className="my-2">
          <label>Email</label>
        </div>
        <div>
          <input
            type="text"
            name="email"
            value={isEditing ? formData.email : user.email}
            onChange={handleChange}
            className="border border-textcolor bg-whitebg w-full rounded-lg p-3"
            disabled={!isEditing}
          />
        </div>

        <div className="flex gap-4">
          {/* Gender */}
          <div className="flex-1">
            <div className="my-2">
              <label className="block">Gender</label>
            </div>
            <div>
              {isEditing ? (
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="border border-textcolor bg-whitebg rounded-lg p-3 w-full"
                >
                  <option value="">Jenis Kelamin</option>
                  <option value="F">Perempuan</option>
                  <option value="M">Laki-laki</option>
                </select>
              ) : (
                <input
                  type="text"
                  name="gender"
                  value={user.gender === "F" ? "Perempuan" : "Laki-laki"}
                  className="border border-textcolor bg-whitebg rounded-lg p-3 w-full"
                  disabled
                />
              )}
            </div>
          </div>

          {/* Tanggal Lahir */}
          <div className="flex-1">
            <div className="my-2">
              <label className="block">Tanggal Lahir</label>
            </div>
            <div>
              <input
                type={isEditing ? "date" : "text"}
                name="dateBirth"
                value={isEditing ? formData.dateBirth : formattedDate}
                onChange={handleChange}
                className="border border-textcolor bg-whitebg rounded-lg p-3 w-full"
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Nomor Telepon */}
          <div className="flex-1">
            <div className="my-2">
              <label className="block">Nomor Telepon</label>
            </div>
            <div>
              <input
                type="number"
                name="phoneNumber"
                value={isEditing ? formData.phoneNumber : user.phoneNumber}
                onChange={handleChange}
                className="border border-textcolor bg-whitebg rounded-lg p-3 w-full"
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>

        {user.role === "M" && (
          <div className="flex gap-4">
            {/* Universitas */}
            <div className="flex-1">
              <div className="my-2">
                <label>Universitas</label>
              </div>
              <div>
                <input
                  type="text"
                  name="universitas"
                  value={isEditing ? formData.universitas : user.universitas}
                  onChange={handleChange}
                  className="border border-textcolor bg-whitebg w-full rounded-lg p-3"
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Jurusan */}
            <div className="flex-1">
              <div className="my-2">
                <label>Jurusan</label>
              </div>
              <div>
                <input
                  type="text"
                  name="jurusan"
                  value={isEditing ? formData.jurusan : user.jurusan}
                  onChange={handleChange}
                  className="border border-textcolor bg-whitebg w-full rounded-lg p-3"
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
        )}

        {user.role === "U" && !isEditing && (
          <div className="mt-4 flex justify-end w-full">
            <div className="text-right">
              <p>Apakah Kamu seorang mahasiswa?</p>
              <button className="w-full inline-flex justify-center items-center bg-primary text-whitebg px-6 py-2 rounded-lg ml-auto hover:bg-hover">
                <Image
                  src="/icons/arrow.png"
                  width={15}
                  height={15}
                  className="mr-2"
                />
                <span>Klik disini</span>
              </button>
            </div>
          </div>
        )}

        {isEditing && (
          <div className="mt-4 flex justify-end w-full">
            <div className="text-right">
              <p>Apakah Kamu seorang mahasiswa?</p>
              <button
                className="bg-transparent border border-primary px-6 py-2 rounded-lg hover:bg-hover w-1/2"
                onClick={toggleEdit}
              >
                Batal
              </button>
              <button
                type="submit"
                className=" bg-primary text-whitebg px-6 py-2 rounded-lg ml-auto hover:bg-hover w-1/2"
              >
                Simpan
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

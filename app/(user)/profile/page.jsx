"use client";

import { useState } from "react";
import Image from "next/image";
import { useUser } from "@/constants/useUser";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("id-ID", options);
};

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const { user, isLoading, isError, updateUserProfile, mutate } = useUser();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading user data</p>;

  const formattedDate = user.dateBirth ? formatDate(user.dateBirth) : "";

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setFormData(user);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      name: formData.nama,
      email: formData.email,
      gender: formData.gender === "Perempuan" ? "F" : "M",
      date_birth: formData.dateBirth,
      phone_number: formData.phoneNumber,
      universitas: formData.universitas || "",
      jurusan: formData.jurusan || "",
    };

    try {
      await updateUserProfile(dataToSend);
      // Mutate the SWR cache to update UI immediately without refetching from server
      mutate((prevUser) => ({ ...prevUser, ...dataToSend }), {
        revalidate: false,
      }).then((dataToSend) => {
        setFormData(dataToSend); // Update formData with latest data
        setIsEditing(false); // Exit editing mode
      });
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
        <div className="my-2">
          <label>Nama Lengkap</label>
        </div>
        <div>
          <input
            type="text"
            name="nama"
            value={isEditing ? formData.nama : user.nama}
            onChange={handleChange}
            className={`border border-textcolor w-full rounded-lg p-3 ${isEditing ? "bg-white" : "bg-gray-100"}`}
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
            className={`border border-textcolor w-full rounded-lg p-3 ${isEditing ? "bg-white" : "bg-gray-100"}`}
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
                  className={`border border-textcolor w-full rounded-lg p-3 ${isEditing ? "bg-white" : "bg-gray-100"}`}
                >
                  <option value="">Jenis Kelamin</option>
                  <option value="Perempuan">Perempuan</option>
                  <option value="Laki-laki">Laki-laki</option>
                </select>
              ) : (
                <input
                  type="text"
                  name="gender"
                  value={user.gender === "F" ? "Perempuan" : "Laki-laki"}
                  className={`border border-textcolor w-full rounded-lg p-3 ${isEditing ? "bg-white" : "bg-gray-100"}`}
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
                className={`border border-textcolor w-full rounded-lg p-3 ${isEditing ? "bg-white" : "bg-gray-100"}`}
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
                className={`border border-textcolor w-full rounded-lg p-3 ${isEditing ? "bg-white" : "bg-gray-100"}`}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>

        {user.role === "M" && (
          <div className="flex gap-4">
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
                  className={`border border-textcolor w-full rounded-lg p-3 ${isEditing ? "bg-white" : "bg-gray-100"}`}
                  disabled={!isEditing}
                />
              </div>
            </div>

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
                  className={`border border-textcolor w-full rounded-lg p-3 ${isEditing ? "bg-white" : "bg-gray-100"}`}
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
            <div className="text-center w-64">
              <p>Simpan Perubahan?</p>
              <button
                className="bg-transparent border border-primary px-6 py-2 rounded-lg hover:bg-hover w-28 mr-2"
                onClick={toggleEdit}
              >
                Batal
              </button>
              <button
                type="submit"
                className=" bg-primary text-whitebg px-6 py-2 rounded-lg ml-auto hover:bg-hover w-28"
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

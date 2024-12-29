"use client";

import { useState } from "react";
import Image from "next/image";
import { useUser } from "@/constants/useUser";
import { getUserDetail } from "@/api/user";
import Loading from "@/components/loading/loading";

import Modal from "@/components/modals/modal";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("id-ID", options);
};

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [upgradeErrors, setUpgradeErrors] = useState({});
  const {
    user,
    isLoading,
    isError,
    updateUserProfile,
    upgradeToMahasiswa,
    mutate,
  } = useUser();

  if (isLoading) return <Loading />;
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

    if (isUpgrading && (name === "universitas" || name === "jurusan")) {
      setUpgradeErrors((prevErrors) => ({
        ...prevErrors,
        [name]: value ? "" : `Field ${name} wajib diisi`,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      name: formData.name,
      email: formData.email,
      gender: formData.gender,
      date_birth: formData.dateBirth,
      phone_number: formData.phone_number,
      universitas: formData.universitas || "",
      jurusan: formData.jurusan || "",
    };

    try {
      console.log(dataToSend);
      await updateUserProfile(dataToSend);
      setIsModalOpen(true);
      mutate((prevUser) => ({ ...prevUser, ...dataToSend }), {
        revalidate: false,
      }).then((dataToSend) => {
        setFormData(dataToSend);
        setIsEditing(false);
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleUpgradeMahasiswa = () => {
    setIsUpgrading(true);
  };

  const toggleUpgradeMahasiswa = () => {
    setIsUpgrading(!isUpgrading);
    setFormData(user);
    setUpgradeErrors({});
  };

  const handleUpgradeSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!formData.universitas) errors.universitas = "Universitas wajib diisi";
    if (!formData.jurusan) errors.jurusan = "Jurusan wajib diisi";

    setUpgradeErrors(errors);

    // Prevent submission if there are errors
    if (Object.keys(errors).length > 0) return;
    console.log(formData.universitas, formData.jurusan);

    try {
      await upgradeToMahasiswa(formData.universitas, formData.jurusan);
      setIsUpgrading(false);
      user.role = "M";
      user.universitas = formData.universitas;
      user.jurusan = formData.jurusan;
      await mutate();

      setIsModalOpen(true);
    } catch (error) {
      console.error("Error upgrading to mahasiswa:", error);
    }
  };

  const isUpgradeButtonDisabled =
    !formData.universitas ||
    !formData.jurusan ||
    Object.values(upgradeErrors).some((error) => error);

  return (
    <div className="w-full">
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <p>Profil berhasil diperbarui!</p>
        </Modal>
      )}
      <div className="w-full flex justify-between items-start self-stretch">
        <h3 className="text-h3 font-semibold pb-3">Biodata Diri</h3>
        {!isEditing && !isUpgrading && (
          <button
            className="inline-flex bg-primary text-whitebg lg:px-6 px-4 py-2 rounded-lg flex-start hover:bg-hover sm:text-base text-s"
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

      <form onSubmit={isUpgrading ? handleUpgradeSubmit : handleSubmit}>
        <div className="my-2">
          <label>Nama Lengkap</label>
        </div>
        <div>
          <input
            type="text"
            name="name"
            value={isEditing ? formData.name : user.name}
            onChange={handleChange}
            className={`border border-textcolor w-full rounded-lg p-3 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
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
            className={`border border-textcolor w-full rounded-lg p-3 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
            disabled={!isEditing}
          />
        </div>

        <div className="lg:flex gap-4">
          {/* Gender */}
          <div className="flex-1">
            <div className="my-2">
              <label className="block">Gender</label>
            </div>
            <div>
              {isEditing ? (
                <div className="relative">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`border border-textcolor w-full rounded-lg p-3 pr-12 ${
                      isEditing ? "bg-white" : "bg-gray-100"
                    }`}
                  >
                    <option value="">Jenis Kelamin</option>
                    <option value="F">Perempuan</option>
                    <option value="M">Laki-laki</option>
                  </select>
                  <div className="absolute top-1/2 right-4 transform -translate-y-1/2 pointer-events-none">
                    <Image
                      src="/image/icons/select-arrow-down.svg"
                      alt="Dropdown Icon"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              ) : (
                <input
                  type="text"
                  name="gender"
                  value={
                    user.gender === "F"
                      ? "Perempuan"
                      : user.gender === "M"
                      ? "Laki-laki"
                      : user.gender
                  }
                  className={`border border-textcolor w-full rounded-lg p-3 bg-gray-100`}
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
                className={`border border-textcolor w-full rounded-lg p-3 ${
                  isEditing ? "bg-white" : "bg-gray-100"
                }`}
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
                name="phone_number"
                value={isEditing ? formData.phone_number : user.phone_number}
                onChange={handleChange}
                className={`border border-textcolor w-full rounded-lg p-3 ${
                  isEditing ? "bg-white" : "bg-gray-100"
                }`}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>

        {user.role === "M" && (
          <div className="lg:flex gap-4">
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
                  className={`border border-textcolor w-full rounded-lg p-3 ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
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
                  className={`border border-textcolor w-full rounded-lg p-3 ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
        )}

        {user.role === "U" && !isEditing && !isUpgrading && (
          <div className="mt-4 flex justify-end w-full">
            <div className="text-right">
              <p>Apakah Kamu seorang mahasiswa?</p>
              <button
                type="button"
                className="w-full inline-flex justify-center items-center bg-primary text-whitebg px-6 py-2 rounded-lg ml-auto hover:bg-hover"
                onClick={handleUpgradeMahasiswa}
              >
                <Image
                  src="/image/icons/arrow.png"
                  width={15}
                  height={15}
                  className="mr-2"
                  alt="arrow"
                />
                <span>Klik disini</span>
              </button>
            </div>
          </div>
        )}

        {isUpgrading && (
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="my-2">
                <label>Universitas</label>
              </div>
              <div>
                <input
                  type="text"
                  name="universitas"
                  value={formData.universitas || ""}
                  onChange={handleChange}
                  className="border border-textcolor w-full rounded-lg p-3 bg-white"
                />
                {upgradeErrors.universitas && (
                  <p className="text-red-500">{upgradeErrors.universitas}</p>
                )}
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
                  value={formData.jurusan || ""}
                  onChange={handleChange}
                  className="border border-textcolor w-full rounded-lg p-3 bg-white"
                />
                {upgradeErrors.jurusan && (
                  <p className="text-red-500">{upgradeErrors.jurusan}</p>
                )}
              </div>
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
                className="bg-primary text-whitebg px-6 py-2 rounded-lg ml-auto hover:bg-hover w-28"
              >
                Simpan
              </button>
            </div>
          </div>
        )}
        {isUpgrading && (
          <div className="mt-4 flex justify-end w-full">
            <div className="text-center w-64">
              <p>Simpan Perubahan?</p>
              <button
                className="bg-transparent border border-primary px-6 py-2 rounded-lg hover:bg-hover w-28 mr-2"
                onClick={toggleUpgradeMahasiswa}
              >
                Batal
              </button>
              <button
                type="submit"
                className="bg-primary text-whitebg px-6 py-2 rounded-lg ml-auto hover:bg-hover w-28"
                disabled={isUpgradeButtonDisabled}
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

"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { registerUser } from "@/api/user";
import Modal from "@/components/modals/modal";
import Loading from "@/components/loading/loading";

export default function Register() {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateBirth, setDateBirth] = useState("");
  const [gender, setGender] = useState("");
  const [university, setUniversity] = useState("");
  const [major, setMajor] = useState("");
  const [startPractice, setStartPractice] = useState("");
  const [sippNumber, setSippNumber] = useState("");
  const [topics, setTopics] = useState([]);
  const [availableTopics, setAvailableTopics] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [description, setdescription] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isAgreed, setIsAgreed] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownRoleOpen, setIsDropdownRoleOpen] = useState(false);
  const [isDropdownJkOpen, setIsDropdownJkOpen] = useState(false);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/psikolog/topics`,
          {
            headers: {
              "ngrok-skip-browser-warning": "69420",
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200 && response.data.success) {
          setAvailableTopics(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, []);

  const handleTopicsChange = (topicId) => {
    setTopics((prev) => {
      // Pastikan `prev` adalah array sebelum melakukan operasi
      if (Array.isArray(prev)) {
        return prev.includes(topicId)
          ? prev.filter((id) => id !== topicId)
          : [...prev, topicId];
      }
      return [topicId]; // Jika sebelumnya bukan array, inisialisasi array baru
    });
  };

  const toogleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const getTopicNames = (topicIds) => {
    return availableTopics
      .filter((topic) => topicIds.includes(topic.id))
      .map((topic) => topic.topic_name);
  };

  const renderSelectedTopics = () => {
    if (topics.length === 0) return "Pilih topik";
    const selectedNames = availableTopics
      .filter((topic) => topics.includes(topic.id))
      .map((topic) => topic.topic_name);
    return selectedNames.length > 1
      ? `${selectedNames.length} topik dipilih`
      : selectedNames[0];
  };

  const handleProfilePhotoChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  function handleDateChange(e) {
    setDateBirth(e.target.value);
    if (e.target.value) {
      setIsDateSelected(true);
    } else {
      setIsDateSelected(false);
    }
  }

  function handleCheckboxChange(event) {
    setIsAgreed(event.target.checked);
  }

  // Function untuk handle submit
  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError({});

    // Validasi sederhana di frontend
    const newErrors = {};
    if (!name) {
      newErrors.name = "Nama Lengkap wajib diisi";
    }
    if (!email) {
      newErrors.email = "Email wajib diisi";
    }
    if (!password) {
      newErrors.password = "Password wajib diisi";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password wajib diisi";
    }
    if (!phoneNumber) {
      newErrors.phone_number = "Nomor telepon wajib diisi";
    }
    if (!dateBirth) {
      newErrors.date_birth = "Tanggal lahir wajib diisi";
    }
    if (!gender) {
      newErrors.gender = "Jenis kelamin wajib dipilih";
    }
    if (!role) {
      newErrors.role = "Role wajib dipilih";
    }
    if (role === "M" && !university) {
      newErrors.universitas = "Universitas wajib diisi";
    }
    if (role === "M" && !major) {
      newErrors.jurusan = "Jurusan wajib diisi";
    }
    if ((role === "P" || role === "K") && !startPractice)
      newErrors.startPractice = "Tanggal Memulai Praktik wajib diisi";
    if (role === "P" && !sippNumber)
      newErrors.sippNumber = "Nomor SIPP wajib diisi";
    if (
      (role === "P" || role === "K") &&
      (!Array.isArray(topics) || topics.length === 0)
    ) {
      newErrors.topics = "Pilih minimal satu topik";
    }
    if ((role === "P" || role === "K") && !profilePhoto)
      newErrors.profilePhoto = "Foto Profil wajib diunggah";
    if (role === "P" && !description)
      newErrors.description = "Deskripsi wajib diisi";

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Password dan konfirmasi password tidak sama";
    }

    if (password.length > 0 && password.length < 7) {
      newErrors.password = "Password baru harus memiliki minimal 8 karakter.";
      newErrors.confirmPassword = "";
    }

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      let requestData;
      let isFormData = false;

      if (role === "P" || role === "K") {
        // Format data untuk multipart/form-data
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("phone_number", phoneNumber);
        formData.append("date_birth", dateBirth);
        formData.append("gender", gender);
        formData.append("role", role);
        formData.append("practice_start_date", startPractice);
        formData.append("description", description);
        formData.append("photo_profile", profilePhoto); // File
        // Pastikan topics berupa array dan tambahkan ke formData
        if (Array.isArray(topics) && topics.length > 0) {
          topics.forEach((topicId) =>
            formData.append("topics[]", topicId.toString())
          );
        } else {
          throw new Error(
            "Topics harus berupa array dengan minimal satu elemen."
          );
        }
        if (role === "P") {
          formData.append("sipp", sippNumber);
        }

        requestData = formData;
        isFormData = true;

        const formDataLog = {};
        formData.forEach((value, key) => {
          formDataLog[key] = value;
        });
      } else {
        // Format data untuk JSON
        requestData = {
          name,
          email,
          password,
          phone_number: phoneNumber,
          date_birth: dateBirth,
          gender,
          role,
          ...(role === "M" && {
            universitas: university,
            jurusan: major,
          }),
        };
      }
      const response = await registerUser(requestData, isFormData);

      if (response.status === 200 || response.status === 201) {
        window.location.href = "/login"; // Redirect ke halaman login setelah berhasil
      } else {
        const errorData = response.data;
        setError(errorData.data.message);
      }
    } catch (error) {
      if (error.response) {
        console.log("API Error Response:", error.response.data);
        setError(
          error.response?.data?.message ||
            "Terjadi kesalahan. Silakan coba lagi."
        );
      } else {
        console.log("Error:", error.message);
        setError("Terjadi kesalahan. Silakan coba lagi.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function redirectToGoogleLogin() {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth/google`;
  }

  const splitIntoColumns = (topics) => {
    const half = Math.ceil(topics.length / 2);
    return [topics.slice(0, half), topics.slice(half)];
  };

  return (
    <>
      {/* Loading */}
      {isLoading && <Loading />}
      {/* Modal for displaying error messages */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6">
          <div className="pb-6 flex justify-items-end">
            <button onClick={() => setIsModalOpen(false)} className="ml-auto">
              <Image
                src="/image/icons/close.svg"
                alt="Login Image"
                width={25}
                height={25}
                className="bg-primary rounded-md"
              />
            </button>
          </div>
          <div>
            <Image
              src="/image/icons/sad.png"
              alt="Icons Sad"
              width={111}
              height={111}
              className="rounded-md mx-auto"
            />
          </div>
          <p className="lg:text-h3 text-m font-medium text-center py-6 lg:pb-16 pb-10">
            {error}
          </p>
        </div>
      </Modal>

      <div className="flex flex-row mt-16 mb-24 justify-center">
        <div className="mr-20 my-auto hidden lg:flex">
          <Image
            src="/image/login/rafiki.png"
            alt="Login Image"
            width={475}
            height={0}
          />
        </div>
        <div className="bg-primarylight rounded-lg pb-8 w-553 lg:mx-2 mx-4">
          <div className="grid justify-center mt-7">
            <Image
              src="/image/logo.webp"
              alt="Logo"
              width={187.32}
              height={0}
            />
          </div>

          <div className="mt-8">
            <div className="mx-6">
              <form onSubmit={onSubmit}>
                <div>
                  <label className="text-m font-normal text-textcolor">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    placeholder="Masukan Nama Lengkap Anda"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`py-2 px-4 w-full rounded-lg text-s mt-1 font-light border-solid border focus:text-textcolor placeholder:text-textsec ${
                      error.name ? "border-red-500" : "border-text2"
                    }`}
                  />
                  {error.name && (
                    <span className="text-red-500 text-sm">{error.name}</span>
                  )}
                </div>

                <div className="pt-5">
                  <label className="text-m font-normal text-textcolor">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Masukan Email Anda"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`py-2 px-4 w-full rounded-lg text-s mt-1 font-light border-solid border focus:text-textcolor placeholder:text-textsec ${
                      error.email ? "border-red-500" : "border-text2"
                    }`}
                  />
                  {error.email && (
                    <span className="text-red-500 text-sm">{error.email}</span>
                  )}
                </div>

                <div className="pt-5">
                  <label className="text-m font-normal text-textcolor">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukan Password Anda"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`py-2 px-4 w-full rounded-lg text-s mt-1 font-light border-solid border focus:text-textcolor placeholder:text-textsec ${
                        error.password ? "border-red-500" : "border-text2"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-1.5 mt-1 right-4 flex items-center"
                    >
                      <Image
                        src={`/image/icons/${
                          showPassword ? "eye-fill" : "eye-off-fill"
                        }.svg`}
                        alt={showPassword ? "Hide Password" : "Show Password"}
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                  {error.password && (
                    <span className="text-red-500 text-sm">
                      {error.password}
                    </span>
                  )}
                </div>

                <div className="pt-5">
                  <label className="text-m font-normal text-textcolor">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Ulangi Password Anda"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`py-2 px-4 w-full rounded-lg text-s mt-1 font-light border-solid border focus:text-textcolor placeholder:text-textsec ${
                        error.confirmPassword
                          ? "border-red-500"
                          : "border-text2"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-1.5 mt-1 right-4 flex items-center"
                    >
                      <Image
                        src={`/image/icons/${
                          showConfirmPassword ? "eye-fill" : "eye-off-fill"
                        }.svg`}
                        alt={
                          showConfirmPassword
                            ? "Hide Password"
                            : "Show Password"
                        }
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                  {error.confirmPassword && (
                    <span className="text-red-500 text-sm">
                      {error.confirmPassword}
                    </span>
                  )}
                </div>

                <div className="pt-5">
                  <label className="text-m font-normal text-textcolor">
                    Nomor Telepon
                  </label>
                  <input
                    type="text"
                    placeholder="Masukan nomor telepon anda"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className={`py-2 px-4 w-full rounded-lg text-s mt-1 font-light border-solid border focus:text-textcolor placeholder:text-textsec ${
                      error.phone_number ? "border-red-500" : "border-text2"
                    }`}
                  />
                  {error.phone_number && (
                    <span className="text-red-500 text-sm">
                      {error.phone_number}
                    </span>
                  )}
                </div>

                <div className="pt-5 relative">
                  <label className="text-m font-normal text-textcolor">
                    Tanggal Lahir
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={dateBirth}
                      onChange={handleDateChange}
                      onFocus={() => setIsDateSelected(false)}
                      onBlur={() => setIsDateSelected(!!dateBirth)}
                      className={`py-2 px-4 w-full rounded-lg text-s mt-1 font-light border-solid border pr-12 ${
                        isDateSelected ? "text-textcolor" : "text-textsec"
                      } placeholder:text-textsec ${
                        error.date_birth ? "border-red-500" : "border-text2"
                      }`}
                    />
                    <Image
                      src="/image/icons/calendar.svg"
                      alt="Select Date"
                      className="absolute top-1/2 right-4 transform -translate-y-1/2 pointer-events-none"
                      width={15}
                      height={15}
                    />
                  </div>
                  {error.date_birth && (
                    <span className="text-red-500 text-sm">
                      {error.date_birth}
                    </span>
                  )}
                </div>

                <div className="pt-5">
                  <label className="text-m font-normal text-textcolor">
                    Jenis Kelamin
                  </label>
                  <div className="relative">
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      onFocus={() => setIsDropdownJkOpen(true)}
                      onBlur={() => setIsDropdownJkOpen(false)}
                      className={`py-2 px-4 w-full rounded-lg text-s mt-1 font-light border-solid border pr-12 ${
                        gender === "" ? "text-textsec" : "text-textcolor"
                      } ${error?.gender ? "border-red-500" : "border-text2"}`}
                    >
                      <option value="">Pilih Jenis Kelamin</option>
                      <option value="M">Laki-laki</option>
                      <option value="F">Perempuan</option>
                    </select>
                    <div
                      className={`absolute top-1/2 right-4 transform -translate-y-1/2 transition-transform duration-200 ${
                        isDropdownJkOpen ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      <Image
                        src="/image/icons/select-arrow-down.svg"
                        alt="Dropdown Icon"
                        className="pointer-events-none mt-1"
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>
                  {error?.gender && (
                    <span className="text-red-500 text-sm">{error.gender}</span>
                  )}
                </div>

                <div className="pt-5 relative">
                  <label className="text-m font-normal text-textcolor">
                    Role
                  </label>
                  <div className="relative">
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      onFocus={() => setIsDropdownRoleOpen(true)} // Dropdown dibuka
                      onBlur={() => setIsDropdownRoleOpen(false)} // Dropdown ditutup
                      className={`py-2 px-4 w-full rounded-lg text-s mt-1 font-light border-solid border pr-12 ${
                        role === "" ? "text-textsec" : "text-textcolor"
                      } ${error?.role ? "border-red-500" : "border-text2"}`}
                    >
                      <option value="">Pilih Role</option>
                      <option value="M">Mahasiswa</option>
                      <option value="U">Umum</option>
                      <option value="P">Psikolog</option>
                      <option value="K">Konselor</option>
                    </select>
                    <div
                      className={`absolute top-1/2 right-4 transform -translate-y-1/2 transition-transform duration-200 ${
                        isDropdownRoleOpen ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      <img
                        src="/image/icons/select-arrow-down.svg"
                        alt="Dropdown Icon"
                        className="pointer-events-none"
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>
                  {error?.role && (
                    <span className="text-red-500 text-sm">{error.role}</span>
                  )}
                </div>

                {/* Input Mahasiswa */}
                {role === "M" && (
                  <>
                    <div className="pt-5">
                      <label className="text-m font-normal text-textcolor">
                        Universitas
                      </label>
                      <input
                        type="text"
                        placeholder="Masukan universitas anda"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        className={`py-2 px-4 w-full rounded-lg text-s mt-1 font-light border-solid border focus:text-textcolor placeholder:text-textsec ${
                          error.universitas ? "border-red-500" : "border-text2"
                        }`}
                      />
                      {error.universitas && (
                        <span className="text-red-500 text-sm">
                          {error.universitas}
                        </span>
                      )}
                    </div>

                    <div className="pt-5">
                      <label className="text-m font-normal text-textcolor">
                        Jurusan
                      </label>
                      <input
                        type="text"
                        placeholder="Masukan jurusan anda"
                        value={major}
                        onChange={(e) => setMajor(e.target.value)}
                        className={`py-2 px-4 w-full rounded-lg text-s mt-1 font-light border-solid border focus:text-textcolor placeholder:text-textsec ${
                          error.jurusan ? "border-red-500" : "border-text2"
                        }`}
                      />
                      {error.jurusan && (
                        <span className="text-red-500 text-sm">
                          {error.jurusan}
                        </span>
                      )}
                    </div>
                  </>
                )}

                {/* Input Psikolog */}
                {role === "P" && (
                  <>
                    <div className="pt-5">
                      <label className="text-m font-normal text-textcolor">
                        Tanggal Memulai Praktik
                      </label>
                      <input
                        type="date"
                        value={startPractice}
                        onFocus={() => setIsDateSelected(false)}
                        onBlur={() => setIsDateSelected(!!dateBirth)}
                        onChange={(e) => setStartPractice(e.target.value)}
                        className={`py-2 px-4 w-full rounded-lg text-s mt-1 font-light border-solid border ${
                          isDateSelected ? "text-textcolor" : "text-textsec"
                        } placeholder:text-textsec ${
                          error.practice_start_date
                            ? "border-red-500"
                            : "border-text2"
                        }`}
                      />
                      {error.practice_start_date && (
                        <span className="text-red-500 text-sm">
                          {error.practice_start_date}
                        </span>
                      )}
                    </div>
                    <div className="pt-5">
                      <label className="text-m font-normal text-textcolor">
                        Nomor SIPP
                      </label>
                      <input
                        type="text"
                        placeholder="Masukan nomor SIPP anda"
                        value={sippNumber}
                        onChange={(e) => {
                          const value = e.target.value;
                          setSippNumber(value);

                          // Hitung jumlah '-' dalam input
                          const dashCount = (value.match(/-/g) || []).length;

                          if (dashCount !== 3) {
                            setError((prev) => ({
                              ...prev,
                              sipp: "Format SIPP harus xxxxxxxx-xxxx-xx-xxxx",
                            }));
                          } else {
                            setError((prev) => ({
                              ...prev,
                              sipp: "",
                            }));
                          }
                        }}
                        className={`py-2 px-4 w-full rounded-lg text-s mt-1 font-light border-solid border ${
                          sippNumber === "" ? "text-textsec" : "text-textcolor"
                        } ${error.sipp ? "border-red-500" : "border-text2"}`}
                      />
                      {error.sipp && (
                        <span className="text-red-500 text-sm">
                          {error.sipp}
                        </span>
                      )}
                    </div>
                    <div className="pt-5">
                      <label className="text-m font-normal text-textcolor">
                        Topik
                      </label>
                      <div
                        className={`py-2 px-4 w-full rounded-lg text-s mt-1 font-light bg-whitebg border-solid border ${
                          topics === "" ? "text-textsec" : "text-textcolor"
                        } ${error.topics ? "border-red-500" : "border-text2"}`}
                        onClick={toogleDropdown}
                      >
                        {renderSelectedTopics()}
                        <div
                          className={`absolute z-10 bg-white shadow-md rounded-lg mt-2 ${
                            isDropdownOpen ? "block" : "hidden"
                          }`}
                        >
                          {Array.isArray(availableTopics) &&
                          availableTopics.length > 0 ? (
                            <div className="grid grid-cols-2 gap-4 px-4 py-2">
                              {splitIntoColumns(availableTopics).map(
                                (column, colIdx) => (
                                  <div key={colIdx} className="flex flex-col">
                                    {column.map((topic) => (
                                      <div
                                        key={topic.id}
                                        className="flex items-center px-4 py-2 hover:bg-gray-100"
                                      >
                                        <input
                                          type="checkbox"
                                          id={topic.id}
                                          value={topic.id}
                                          checked={topics.includes(topic.id)}
                                          onChange={() =>
                                            handleTopicsChange(topic.id)
                                          }
                                          className="mr-2"
                                        />
                                        <label
                                          htmlFor={topic.id}
                                          className="text-sm text-gray-800"
                                        >
                                          {topic.topic_name}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                )
                              )}
                            </div>
                          ) : (
                            <p className="text-gray-500 px-4 py-2">
                              Tidak ada topik tersedia.
                            </p>
                          )}
                        </div>
                      </div>
                      {error.topics && (
                        <span className="text-red-500 text-sm">
                          {error.topics}
                        </span>
                      )}
                    </div>
                    <div className="pt-5">
                      <label className="text-m font-normal text-textcolor">
                        Foto Profil
                      </label>
                      <input
                        type="file"
                        onChange={handleProfilePhotoChange}
                        className={`py-2 px-4 w-full bg-whitebg rounded-lg text-s mt-1 font-light border-solid border ${
                          profilePhoto === ""
                            ? "text-textsec"
                            : "text-textcolor"
                        } ${
                          error.photo_profile
                            ? "border-red-500"
                            : "border-text2"
                        }`}
                      />
                      {error.photo_profile && (
                        <span className="text-red-500 text-sm">
                          {error.photo_profile}
                        </span>
                      )}
                    </div>
                    <div className="pt-5">
                      <label className="text-m font-normal text-textcolor">
                        Deskripsi
                      </label>
                      <textarea
                        value={description}
                        placeholder="Masukan deskripsi anda"
                        onChange={(e) => setdescription(e.target.value)}
                        className={`py-2 px-4 w-full rounded-lg text-s mt-1 font-light border-solid border ${
                          description === "" ? "text-textsec" : "text-textcolor"
                        } ${
                          error.description ? "border-red-500" : "border-text2"
                        }`}
                      />
                      {error.description && (
                        <span className="text-red-500 text-sm">
                          {error.description}
                        </span>
                      )}
                    </div>
                  </>
                )}

                {/* Konselor inputs */}
                {role === "K" && (
                  <>
                    <div className="pt-5">
                      <label className="text-m font-normal text-textcolor">
                        Tanggal Memulai Praktik
                      </label>
                      <input
                        type="date"
                        value={startPractice}
                        onFocus={() => setIsDateSelected(false)}
                        onBlur={() => setIsDateSelected(!!dateBirth)}
                        onChange={(e) => setStartPractice(e.target.value)}
                        className={`py-2 px-4 w-full rounded-lg text-s mt-1 font-light border-solid border ${
                          isDateSelected ? "text-textcolor" : "text-textsec"
                        } placeholder:text-textsec ${
                          error.practice_start_date
                            ? "border-red-500"
                            : "border-text2"
                        }`}
                      />
                      {error.practice_start_date && (
                        <span className="text-red-500 text-sm">
                          {error.practice_start_date}
                        </span>
                      )}
                    </div>
                    <div className="pt-5">
                      <label className="text-m font-normal text-textcolor">
                        Topik
                      </label>
                      <div
                        className={`py-2 px-4 w-full rounded-lg text-s mt-1 font-light bg-whitebg border-solid border ${
                          topics === "" ? "text-textsec" : "text-textcolor"
                        } ${error.topics ? "border-red-500" : "border-text2"}`}
                        onClick={toogleDropdown}
                      >
                        {renderSelectedTopics()}
                        <div
                          className={`absolute z-10 bg-white shadow-md rounded-lg mt-2 ${
                            isDropdownOpen ? "block" : "hidden"
                          }`}
                        >
                          {Array.isArray(availableTopics) &&
                          availableTopics.length > 0 ? (
                            <div className="grid grid-cols-2 gap-4 px-4 py-2">
                              {splitIntoColumns(availableTopics).map(
                                (column, colIdx) => (
                                  <div key={colIdx} className="flex flex-col">
                                    {column.map((topic) => (
                                      <div
                                        key={topic.id}
                                        className="flex items-center px-4 py-2 hover:bg-gray-100"
                                      >
                                        <input
                                          type="checkbox"
                                          id={topic.id}
                                          value={topic.id}
                                          checked={topics.includes(topic.id)}
                                          onChange={() =>
                                            handleTopicsChange(topic.id)
                                          }
                                          className="mr-2"
                                        />
                                        <label
                                          htmlFor={topic.id}
                                          className="text-sm text-gray-800"
                                        >
                                          {topic.topic_name}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                )
                              )}
                            </div>
                          ) : (
                            <p className="text-gray-500 px-4 py-2">
                              Tidak ada topik tersedia.
                            </p>
                          )}
                        </div>
                      </div>
                      {error.topics && (
                        <span className="text-red-500 text-sm">
                          {error.topics}
                        </span>
                      )}
                    </div>
                    <div className="pt-5">
                      <label className="text-m font-normal text-textcolor">
                        Foto Profil
                      </label>
                      <input
                        type="file"
                        onChange={handleProfilePhotoChange}
                        className={`py-2 px-4 w-full bg-whitebg rounded-lg text-s mt-1 font-light border-solid border ${
                          profilePhoto === ""
                            ? "text-textsec"
                            : "text-textcolor"
                        } ${
                          error.photo_profile
                            ? "border-red-500"
                            : "border-text2"
                        }`}
                      />
                      {error.photo_profile && (
                        <span className="text-red-500 text-sm">
                          {error.photo_profile}
                        </span>
                      )}
                    </div>
                    <div className="pt-5">
                      <label className="text-m font-normal text-textcolor">
                        Deskripsi
                      </label>
                      <textarea
                        value={description}
                        placeholder="Masukan deskripsi anda"
                        onChange={(e) => setdescription(e.target.value)}
                        className={`py-2 px-4 w-full rounded-lg text-s mt-1 font-light border-solid border ${
                          description === "" ? "text-textsec" : "text-textcolor"
                        } ${
                          error.description ? "border-red-500" : "border-text2"
                        }`}
                      />
                      {error.description && (
                        <span className="text-red-500 text-sm">
                          {error.description}
                        </span>
                      )}
                    </div>
                  </>
                )}

                <div className="py-5 flex">
                  <input
                    type="checkbox"
                    id="sdk"
                    name="sdk"
                    value="sdk"
                    className="w-5 h-5 accent-primary border-primary text-whitebg"
                    onChange={handleCheckboxChange}
                    required
                  />
                  <label
                    htmlFor="sdk"
                    className="text-m font-light underline pl-2"
                  >
                    <Link href="/syarat-dan-ketentuan">
                      Dengan ini, saya telah membaca dan menyetujui Syarat dan
                      Ketentuan
                    </Link>
                  </label>
                </div>

                <button
                  className={`bg-primary hover:bg-hover text-white py-2 w-full rounded-lg text-s font-medium 
                    ${isLoading || !isAgreed ? "disabled:bg-hover" : ""}`}
                  type="submit"
                  disabled={!isAgreed}
                >
                  Daftar
                </button>

                {/* Tombol Google hanya muncul jika role bukan Psikolog atau Konselor */}
                {role !== "P" && role !== "K" && (
                  <button
                    onClick={redirectToGoogleLogin}
                    className="flex items-center px-4 py-2 bg-whitebg text-textcolor rounded-lg w-full justify-center text-s mt-3.5"
                  >
                    <Image
                      src="/image/icons/google.svg"
                      alt="Google Logo"
                      width={0}
                      height={30}
                      className="w-6 h-6 mr-2"
                    />
                    Lanjutkan dengan Akun Google
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

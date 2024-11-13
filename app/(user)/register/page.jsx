"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { registerUser } from "@/api/user";
import Modal from "@/components/modals/modal";

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

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isAgreed, setIsAgreed] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(false);

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

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Password dan konfirmasi password tidak sama";
    }

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const userData = {
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

      const response = await registerUser(userData);

      if (response.status === 200 || response.status === 201) {
        window.location.href = "/login"; // Redirect ke halaman login setelah berhasil
      } else {
        const errorData = response.data;
        setError(errorData.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        setError("Terjadi kesalahan pada server. Silakan coba lagi nanti.");
      } else {
        setError(
          error.response?.data?.message ||
            "Terjadi kesalahan. Silakan coba lagi."
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Modal for displaying error messages */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6">
          <div className="pb-6 flex justify-items-end">
            <button onClick={() => setIsModalOpen(false)} className="ml-auto">
              <Image
                src="/icons/close.svg"
                alt="Login Image"
                width={25}
                height={25}
                className="bg-primary rounded-md"
              />
            </button>
          </div>
          <div>
            <Image
              src="/icons/sad.png"
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
                  <input
                    type="password"
                    placeholder="Masukan Password Anda"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`py-2 px-4 w-full rounded-lg text-s mt-1 font-light border-solid border focus:text-textcolor placeholder:text-textsec ${
                      error.password ? "border-red-500" : "border-text2"
                    }`}
                  />
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
                  <input
                    type="password"
                    placeholder="Ulangi Password Anda"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`py-2 px-4 w-full rounded-lg text-s mt-1 font-light border-solid border focus:text-textcolor placeholder:text-textsec ${
                      error.confirmPassword ? "border-red-500" : "border-text2"
                    }`}
                  />
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

                <div className="pt-5">
                  <label className="text-m font-normal text-textcolor">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    value={dateBirth}
                    onChange={handleDateChange}
                    onFocus={() => setIsDateSelected(false)}
                    onBlur={() => setIsDateSelected(!!dateBirth)}
                    className={`py-2 px-4 w-full rounded-lg text-s mt-1 font-light border-solid border ${
                      isDateSelected ? "text-textcolor" : "text-textsec"
                    } placeholder:text-textsec ${
                      error.date_birth ? "border-red-500" : "border-text2"
                    }`}
                  />
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
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className={`py-2 px-4 w-full rounded-lg text-s mt-1 font-light border-solid border ${
                      gender === "" ? "text-textsec" : "text-textcolor"
                    } ${error.gender ? "border-red-500" : "border-text2"}`}
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="M">Laki-laki</option>
                    <option value="F">Perempuan</option>
                  </select>
                  {error.gender && (
                    <span className="text-red-500 text-sm">{error.gender}</span>
                  )}
                </div>

                <div className="pt-5">
                  <label className="text-m font-normal text-textcolor">
                    Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className={`py-2 px-4 w-full rounded-lg text-s mt-1 font-light border-solid border ${
                      role === "" ? "text-textsec" : "text-textcolor"
                    } ${error.role ? "border-red-500" : "border-text2"}`}
                  >
                    <option value="">Pilih Role</option>
                    <option value="M">Mahasiswa</option>
                    <option value="U">Umum</option>
                  </select>
                  {error.role && (
                    <span className="text-red-500 text-sm">{error.role}</span>
                  )}
                </div>

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
                  disabled={isLoading || !isAgreed}
                >
                  {isLoading ? "Loading..." : "Daftar"}
                </button>
                <button className="flex items-center px-4 py-2 bg-whitebg text-textcolor rounded-lg w-full justify-center text-s mt-3.5">
                  <Image
                    src="/image/icons/google.svg"
                    alt="Google Logo"
                    width={0}
                    height={30}
                    className="w-6 h-6 mr-2"
                  />
                  Lanjutkan dengan Akun Google
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

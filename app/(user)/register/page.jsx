"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [date_birth, setDateBirth] = useState("");
  const [gender, setGender] = useState("");
  const [university, setUniversity] = useState("");
  const [major, setMajor] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
  
    if (password !== confirm_password) {
      setError("Password dan Konfirmasi Password tidak sama");
      setIsLoading(false);
      return;
    }
  
    try {
      const formData = {
        name: name,
        email: email,
        password: password,
        phone_number: phone_number,
        date_birth: date_birth,
        gender: gender,
        role: role,
        ...(role === "M" && {
          universitas: university,
          jurusan: major,
        }),
      };
  
      console.log("FormData being sent:", formData);
  
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      console.log("API Response:", response);
  
      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error data from API:", errorData);
        throw new Error("Failed to submit the data: " + errorData.message);
      }
  
      const data = await response.json();
      window.location.href = "/login"
      console.log("Data submitted successfully:", data);
    } catch (error) {
      setError(error.message);
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  }
  

  return (
    <>
      <div className="flex flex-row mt-16 mb-24 justify-center">
        <div className="mr-20 my-auto">
          <Image
            src="/image/login/rafiki.png"
            alt="Login Image"
            width={475}
            height={0}
          />
        </div>
        <div className="bg-primarylight rounded-lg w-553 pb-8">
          <div className="grid justify-center mt-7">
            <Image
              src="/image/logo.webp"
              alt="Logo"
              width={187.32}
              height={0}
            />
          </div>

          <div className="text-textcolor mt-8">
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
                    className="py-2 px-4 w-full rounded-lg text-s text-textsec mt-1 font-light border-solid border border-text2"
                    required
                  />
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
                    className="py-2 px-4 w-full rounded-lg text-s text-textsec mt-1 font-light border-solid border border-text2"
                  />
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
                    className="py-2 px-4 w-full rounded-lg text-s text-textsec mt-1 font-light border-solid border border-text2"
                  />
                </div>

                <div className="pt-5">
                  <label className="text-m font-normal text-textcolor">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Ulangi Password Anda"
                    value={confirm_password}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="py-2 px-4 w-full rounded-lg text-s text-textsec mt-1 font-light border-solid border border-text2"
                  />
                </div>

                <div className="pt-5">
                  <label className="text-m font-normal text-textcolor">
                    Nomor Telepon
                  </label>
                  <input
                    type="text"
                    placeholder="Masukan nomor telepon anda"
                    value={phone_number}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="py-2 px-4 w-full rounded-lg text-s text-textsec mt-1 font-light border-solid border border-text2"
                  />
                </div>

                <div className="pt-5">
                  <label className="text-m font-normal text-textcolor">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    value={date_birth}
                    onChange={(e) => setDateBirth(e.target.value)}
                    className="py-2 px-4 w-full rounded-lg text-s text-textsec mt-1 font-light border-solid border border-text2"
                  />
                </div>

                <div className="pt-5">
                  <label className="text-m font-normal text-textcolor">
                    Jenis Kelamin
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="py-2 px-4 w-full rounded-lg text-s text-textsec mt-1 font-light border-solid border border-text2"
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="M">Laki-laki</option>
                    <option value="F">Perempuan</option>
                  </select>
                </div>

                <div className="pt-5">
                  <label className="text-m font-normal text-textcolor">
                    Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="py-2 px-4 w-full rounded-lg text-s text-textsec mt-1 font-light border-solid border border-text2"
                  >
                    <option value="">Pilih Role</option>
                    <option value="M">Mahasiswa</option>
                    <option value="U">Umum</option>
                  </select>
                </div>

                {role === "M" && (
                  <>
                    <div className="pt-5">
                      <label className="text-m font-normal text-textcolor">
                        Universitas
                      </label>
                      <input
                        type="text"
                        placeholder="Masukan Universitas Anda"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        className="py-2 px-4 w-full rounded-lg text-s text-textsec mt-1 font-light border-solid border border-text2"
                      />
                    </div>

                    <div className="pt-5">
                      <label className="text-m font-normal text-textcolor">
                        Jurusan
                      </label>
                      <input
                        type="text"
                        placeholder="Masukan Jurusan Anda"
                        value={major}
                        onChange={(e) => setMajor(e.target.value)}
                        className="py-2 px-4 w-full rounded-lg text-s text-textsec mt-1 font-light border-solid border border-text2"
                      />
                    </div>
                  </>
                )}

                <div className="pt-5 flex">
                  <input
                    type="checkbox"
                    id="sdk"
                    name="sdk"
                    value="sdk"
                    className="w-5 h-5 border-2 border-solid border-primary bg-primary text-primary"
                  />
                  <label
                    htmlFor="sdk"
                    className="text-m font-light underline ml-2 decoration-solid"
                  >
                    <Link href="#">
                      Dengan ini, Saya telah membaca dan menyetujui Syarat dan
                      Ketentuan
                    </Link>
                  </label>
                </div>

                {error && <div style={{ color: "red" }}>{error}</div>}

                <button
                  className="bg-primary text-whitebg text-s w-full py-2 px-4 mt-8 rounded-lg"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Daftar"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

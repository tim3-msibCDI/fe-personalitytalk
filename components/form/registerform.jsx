"use client"

import { useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import CheckboxField from "./CheckboxField";

export default function RegisterForm() {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [date_birth, setDateBirth] = useState("");
  const [gender, setGender] = useState("")
  const [university, setUniversity] = useState("");
  const [major, setMajor] = useState("");

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(null); // Clear previous errors when a new request starts

    // Check password confirmation
    if (password !== confirm_password) {
      setError("Password dan Konfirmasi Password tidak sama");
      setIsLoading(false);
      return;
    }

    try {
      const formData = {
        name,
        email,
        password,
        phone_number,
        date_birth,
        gender,
        // ...(role === "Mahasiswa" && { university, major }) // Conditionally add university and major if role is Mahasiswa
      };

      console.log(formData)

      const response = await fetch('https://9505-182-2-41-165.ngrok-free.app/api/register/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit the data. Please try again.');
      }

      const data = await response.json();
      console.log("Data submitted successfully:", data);
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={onSubmit}>
        <InputField
          type="text"
          label="Nama Lengkap"
          placeholder="Masukan Nama Lengkap Anda"
          id="name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <InputField
          type="email"
          label="Email"
          placeholder="Masukan Email Anda"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          type="password"
          label="Password"
          placeholder="Masukan Password Anda"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <InputField
          type="password"
          label="Confirm Password"
          placeholder="Ulangi Password Anda"
          id="confirm_password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <InputField
          type="number"
          label="Nomor Telepon"
          placeholder="Masukan nomor telepon anda"
          id="no_telp"
          onChange={(e) => setPhone_number(e.target.value)}
          required
        />
        <InputField
          type="date"
          label="Tanggal Lahir"
          placeholder="Masukan Tanggal Lahir"
          id="birth_date"
          onChange={(e) => setDateBirth(e.target.value)}
          required
        />

        <div className="pt-5">
          <label className="text-m font-normal text-textcolor">Jenis Kelamin</label>
          <select
            className="py-2 px-4 w-full rounded-lg text-s text-textsec mt-1 font-light border-solid border border-text2"
            onChange={(e) => setGender(e.target.value)} // Update state berdasarkan pilihan role
          >
            <option value="">Jenis Kelamin Anda</option>
            <option value="F">Perempuan</option>
            <option value="M">Laki-laki</option>
          </select>
        </div>

        <div className="pt-5">
          <label className="text-m font-normal text-textcolor">Role</label>
          <select
            className="py-2 px-4 w-full rounded-lg text-s text-textsec mt-1 font-light border-solid border border-text2"
            onChange={(e) => setRole(e.target.value)} // Update state berdasarkan pilihan role
          >
            <option value="">Pilih Role Anda</option>
            <option value="Umum">Umum</option>
            <option value="Mahasiswa">Mahasiswa</option>
          </select>
        </div>

        {role === "Mahasiswa" && (
          <>
            <InputField
              type="text"
              label="Universitas"
              placeholder="Masukan Universitas Anda"
              id="universitas"
              onChange={(e) => setUniversity(e.target.value)}
              required
            />
            <SelectField
              label="Jurusan"
              options={[
                "Pilih Jurusan",
                "Teknik Informatika",
                "Sistem Informasi",
                "Teknik Elektro",
                "Teknik Sipil",
              ]}
              onChange={(e) => setMajor(e.target.value)}
            />
          </>
        )}

        <CheckboxField
          label="Dengan ini, Saya telah membaca dan menyetujui Syarat dan Ketentuan yang berlaku."
          href="#"
        />

        <button
          className="bg-primary text-whitebg text-s w-full py-2 px-4 mt-8 rounded-lg"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

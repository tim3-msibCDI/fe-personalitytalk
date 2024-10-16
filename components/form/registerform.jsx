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
  


  return (
    <form action="">
      <InputField
        type="text"
        label="Nama Lengkap"
        placeholder="Masukan Nama Lengkap Anda"
        id="name"
        onChange={(e)=>setName(e.target.value)}
        required
      />
      <InputField
        type="email"
        label="Email"
        placeholder="Masukan Email Anda"
        id="email"
        onChange={(e)=>setEmail(e.target.value)}
        required
      />
      <InputField
        type="password"
        label="Password"
        placeholder="Masukan Password Anda"
        id="password"
        onChange={(e)=>setPassword(e.target.value)}
        required
      />
      <InputField
        type="password"
        label="Confirm Password"
        placeholder="Ulangi Password Anda"
        id="confirm_password"
        onChange={(e)=>setConfirmPassword(e.target.value)}
        required
      />
      <InputField
        type="number"
        label="Nomor Telepon"
        placeholder="Masukan nomor telepon anda"
        id="no_telp"
        onChange={(e)=>setPhone_number(e.target.value)}
        required
      />
      <InputField
        type="date"
        label="Tanggal Lahir"
        placeholder="Masukan Tanggal Lahir"
        id="birth_date"
        onChange={(e)=>setDateBirth(e.target.value)}
        required
      />

      <SelectField
        label="Jenis Kelamin"
        options={["Jenis Kelamin Anda", "Laki-laki", "Perempuan"]}
      />

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

      {/* Render input tambahan jika role adalah Mahasiswa */}
      {role === "Mahasiswa" && (
        <>
          <InputField
            type="text"
            label="Universitas"
            placeholder="Masukan Universitas Anda"
            id="universitas"
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
          />
        </>
      )}

      <CheckboxField
        label="Dengan ini, Saya telah membaca dan menyetujui Syarat dan Ketentuan yang berlaku."
        href="#"
      />

      <button className="bg-primary text-whitebg text-s w-full py-2 px-4 mt-8 rounded-lg">
        Daftar
      </button>
    </form>
  );
}

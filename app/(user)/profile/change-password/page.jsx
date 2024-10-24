"use client";

import { useState } from "react";
import { changePassword } from "@/api/user";

export default function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    // Validasi form sederhana
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("Semua field harus diisi.");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Password baru dan konfirmasi password tidak cocok.");
      setLoading(false);
      return;
    }

    try {
      await changePassword(oldPassword, newPassword, confirmPassword);
      setSuccess("Password berhasil diubah.");
    } catch (err) {
      setError("Gagal mengubah password. Pastikan password lama benar.");
      console.log(oldPassword,newPassword, confirmPassword);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-start self-stretch">
        <h3 className="text-h3 font-semibold">Ganti Password</h3>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <div className="my-4">
        <label>Password Lama</label>
        <input
          type="password"
          placeholder="Masukkan password lama"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="border border-textcolor w-full rounded-lg p-3"
        />
      </div>

      <div className="my-4">
        <label>Password Baru</label>
        <input
          type="password"
          placeholder="Masukkan password baru"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border border-textcolor w-full rounded-lg p-3"
        />
      </div>

      <div className="my-4">
        <label>Konfirmasi Password Baru</label>
        <input
          type="password"
          placeholder="Konfirmasi password baru"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border border-textcolor w-full rounded-lg p-3"
        />
      </div>

      <div className="w-full flex justify-end mt-6">
        <button
          onClick={handleSubmit}
          className="bg-primary text-whitebg px-6 py-2 rounded-lg hover:bg-hover"
          disabled={loading}
        >
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import axios from "axios";
import { getToken } from "@/lib/auth";

export default function ChangePasswordPsikologPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const validateField = (field) => {
    const errors = { ...fieldErrors };

    if (field === "newPassword") {
      if (newPassword.length > 0 && newPassword.length < 8) {
        errors.newPassword = "Password baru harus memiliki minimal 8 karakter.";
      } else {
        errors.newPassword = "";
      }
    }

    if (field === "confirmPassword") {
      if (confirmPassword && newPassword !== confirmPassword) {
        errors.confirmPassword =
          "Password baru dan konfirmasi password tidak cocok.";
      } else {
        errors.confirmPassword = "";
      }
    }

    setFieldErrors(errors);
  };

  const handleInputChange = (field, value) => {
    if (field === "currentPassword") setCurrentPassword(value);
    if (field === "newPassword") setNewPassword(value);
    if (field === "confirmPassword") setConfirmPassword(value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setSuccess("");
    setErrorMessage("");
    setFieldErrors({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    // Validasi jika masih ada error pada field
    if (Object.values(fieldErrors).some((error) => error)) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/profile/updatePassword`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
            "ngrok-skip-browser-warning": "69420",
          },
          body: JSON.stringify({
            current_password: currentPassword, // Perbaikan di sini
            new_password: newPassword,
            new_password_confirmation: confirmPassword,
          }),
        }
      );

      if (response.status === 200) {
        setSuccess("Password berhasil diubah.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        const data = await response.json();
        setErrorMessage(data.message || "Terjadi kesalahan.");
      }
    } catch (error) {
      setErrorMessage(error.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled =
    loading ||
    !currentPassword ||
    !newPassword ||
    !confirmPassword ||
    Object.values(fieldErrors).some((error) => error);

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-start self-stretch">
        <h3 className="text-h3 font-semibold">Ganti Password</h3>
      </div>

      {success && <p className="text-green-500">{success}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <div className="my-4">
        <label>Password Lama</label>
        <input
          type="password"
          placeholder="Masukkan password lama"
          value={currentPassword}
          onChange={(e) => handleInputChange("currentPassword", e.target.value)}
          className={`border w-full rounded-lg p-3 ${
            fieldErrors.currentPassword ? "border-red-500" : "border-textcolor"
          }`}
        />
      </div>

      <div className="my-4">
        <label>Password Baru</label>
        <input
          type="password"
          placeholder="Masukkan password baru"
          value={newPassword}
          onChange={(e) => handleInputChange("newPassword", e.target.value)}
          onBlur={() => validateField("newPassword")}
          className={`border w-full rounded-lg p-3 ${
            fieldErrors.newPassword ? "border-red-500" : "border-textcolor"
          }`}
        />
        {fieldErrors.newPassword && (
          <p className="text-red-500">{fieldErrors.newPassword}</p>
        )}
      </div>

      <div className="my-4">
        <label>Konfirmasi Password Baru</label>
        <input
          type="password"
          placeholder="Konfirmasi password baru"
          value={confirmPassword}
          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
          onBlur={() => validateField("confirmPassword")}
          className={`border w-full rounded-lg p-3 ${
            fieldErrors.confirmPassword ? "border-red-500" : "border-textcolor"
          }`}
        />
        {fieldErrors.confirmPassword && (
          <p className="text-red-500">{fieldErrors.confirmPassword}</p>
        )}
      </div>

      <div className="w-full flex justify-end mt-6">
        <button
          onClick={handleSubmit}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-hover"
          disabled={isButtonDisabled}
        >
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>
    </div>
  );
}

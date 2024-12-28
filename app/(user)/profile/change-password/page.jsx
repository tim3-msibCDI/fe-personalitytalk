"use client";

import { useState } from "react";
import { changePassword } from "@/api/user";
import Image from "next/image";

export default function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const [fieldErrors, setFieldErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [visibility, setVisibility] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const toggleVisibility = (field) => {
    setVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const validateField = (field) => {
    const errors = { ...fieldErrors };

    if (field === "newPassword") {
      if (newPassword.length > 0 && newPassword.length < 8) {
        errors.newPassword = "Password baru harus memiliki minimal 8 karakter.";
      } else if (oldPassword === newPassword) {
        errors.newPassword =
          "Password baru tidak boleh sama dengan password lama.";
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

    if (field === "oldPassword" && fieldErrors.oldPassword) {
      errors.oldPassword = "";
    }

    setFieldErrors(errors);
  };

  const handleInputChange = (field, value) => {
    if (field === "oldPassword") setOldPassword(value);
    if (field === "newPassword") setNewPassword(value);
    if (field === "confirmPassword") setConfirmPassword(value);
  };

  const handleBlur = (field) => {
    validateField(field);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setSuccess("");
    setFieldErrors({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    if (Object.values(fieldErrors).some((error) => error)) {
      setLoading(false);
      return;
    }

    try {
      await changePassword(oldPassword, newPassword, confirmPassword);
      setSuccess("Password berhasil diubah.");

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        oldPassword: err.response?.data?.message || "Password lama salah.",
      }));
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled =
    loading ||
    !oldPassword ||
    !newPassword ||
    !confirmPassword ||
    Object.values(fieldErrors).some((error) => error);

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-start self-stretch">
        <h3 className="text-h3 font-semibold">Ganti Password</h3>
      </div>

      {success && <p className="text-green-500">{success}</p>}

      <div className="my-4">
        <label>Password Lama</label>
        <div className="relative">
          <input
            type={visibility.oldPassword ? "text" : "password"}
            placeholder="Masukkan password lama"
            value={oldPassword}
            onChange={(e) => handleInputChange("oldPassword", e.target.value)}
            onBlur={() => handleBlur("oldPassword")}
            className={`border w-full rounded-lg p-3 ${
              fieldErrors.oldPassword ? "border-red-500" : "border-textcolor"
            }`}
          />
          <span
            className="absolute right-4 top-4 cursor-pointer"
            onClick={() => toggleVisibility("oldPassword")}
          >
            <Image
              src={`/image/icons/${
                visibility.oldPassword ? "eye-fill" : "eye-off-fill"
              }.svg`}
              alt={visibility.oldPassword ? "Hide Password" : "Show Password"}
              width={27}
              height={27}
            />
          </span>
        </div>
        {fieldErrors.oldPassword && (
          <p className="text-red-500">{fieldErrors.oldPassword}</p>
        )}
      </div>

      <div className="my-4">
        <label>Password Baru</label>
        <div className="relative">
          <input
            type={visibility.newPassword ? "text" : "password"}
            placeholder="Masukkan password baru"
            value={newPassword}
            onChange={(e) => handleInputChange("newPassword", e.target.value)}
            onBlur={() => handleBlur("newPassword")}
            className={`border w-full rounded-lg p-3 ${
              fieldErrors.newPassword ? "border-red-500" : "border-textcolor"
            }`}
          />
          <span
            className="absolute right-4 top-4 cursor-pointer"
            onClick={() => toggleVisibility("newPassword")}
          >
            <Image
              src={`/image/icons/${
                visibility.newPassword ? "eye-fill" : "eye-off-fill"
              }.svg`}
              alt={visibility.newPassword ? "Hide Password" : "Show Password"}
              width={27}
              height={27}
            />
          </span>
        </div>
        {fieldErrors.newPassword && (
          <p className="text-red-500">{fieldErrors.newPassword}</p>
        )}
      </div>

      <div className="my-4">
        <label>Konfirmasi Password Baru</label>
        <div className="relative">
          <input
            type={visibility.confirmPassword ? "text" : "password"}
            placeholder="Konfirmasi password baru"
            value={confirmPassword}
            onChange={(e) =>
              handleInputChange("confirmPassword", e.target.value)
            }
            onBlur={() => handleBlur("confirmPassword")}
            className={`border w-full rounded-lg p-3 ${
              fieldErrors.confirmPassword
                ? "border-red-500"
                : "border-textcolor"
            }`}
          />
          <span
            className="absolute right-4 top-4 cursor-pointer"
            onClick={() => toggleVisibility("confirmPassword")}
          >
            <Image
              src={`/image/icons/${
                visibility.confirmPassword ? "eye-fill" : "eye-off-fill"
              }.svg`}
              alt={
                visibility.confirmPassword ? "Hide Password" : "Show Password"
              }
              width={27}
              height={27}
            />
          </span>
        </div>
        {fieldErrors.confirmPassword && (
          <p className="text-red-500">{fieldErrors.confirmPassword}</p>
        )}
      </div>

      <div className="w-full flex justify-end mt-6">
        <button
          onClick={handleSubmit}
          className="bg-primary text-whitebg px-6 py-2 rounded-lg hover:bg-hover"
          disabled={isButtonDisabled}
        >
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>
    </div>
  );
}

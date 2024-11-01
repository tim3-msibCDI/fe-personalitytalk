"use client";

import { useState } from "react";
import { changePassword } from "@/api/user";

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

  const validateField = (field) => {
    const errors = { ...fieldErrors };

    if (field === "newPassword") {
      if (newPassword.length > 0 && newPassword.length < 8) {
        errors.newPassword = "Password baru harus memiliki minimal 8 karakter.";
      } else if (oldPassword === newPassword) {
        errors.newPassword = "Password baru tidak boleh sama dengan password lama.";
      } else {
        errors.newPassword = "";
      }
    }

    if (field === "confirmPassword") {
      if (confirmPassword && newPassword !== confirmPassword) {
        errors.confirmPassword = "Password baru dan konfirmasi password tidak cocok.";
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

      // Clear the input fields after successful password change
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

  // Disable the button if there are errors or any required field is empty
  const isButtonDisabled = loading || 
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
        <input
          type="password"
          placeholder="Masukkan password lama"
          value={oldPassword}
          onChange={(e) => handleInputChange("oldPassword", e.target.value)}
          onBlur={() => handleBlur("oldPassword")}
          className={`border w-full rounded-lg p-3 ${fieldErrors.oldPassword ? 'border-red-500' : 'border-textcolor'}`}
        />
        {fieldErrors.oldPassword && <p className="text-red-500">{fieldErrors.oldPassword}</p>}
      </div>

      <div className="my-4">
        <label>Password Baru</label>
        <input
          type="password"
          placeholder="Masukkan password baru"
          value={newPassword}
          onChange={(e) => handleInputChange("newPassword", e.target.value)}
          onBlur={() => handleBlur("newPassword")}
          className={`border w-full rounded-lg p-3 ${fieldErrors.newPassword ? 'border-red-500' : 'border-textcolor'}`}
        />
        {fieldErrors.newPassword && <p className="text-red-500">{fieldErrors.newPassword}</p>}
      </div>

      <div className="my-4">
        <label>Konfirmasi Password Baru</label>
        <input
          type="password"
          placeholder="Konfirmasi password baru"
          value={confirmPassword}
          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
          onBlur={() => handleBlur("confirmPassword")}
          className={`border w-full rounded-lg p-3 ${fieldErrors.confirmPassword ? 'border-red-500' : 'border-textcolor'}`}
        />
        {fieldErrors.confirmPassword && <p className="text-red-500">{fieldErrors.confirmPassword}</p>}
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

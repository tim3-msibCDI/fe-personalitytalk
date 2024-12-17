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
                        className={`border w-full rounded-lg p-3 ${fieldErrors.oldPassword ? "border-red-500" : "border-textcolor"}`}
                    />
                    <span
                        className="absolute right-3 top-3 cursor-pointer"
                        onClick={() => toggleVisibility("oldPassword")}
                    >
                        {visibility.oldPassword ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-.268.943-1.07 2.463-2.458 3.944C15.978 18.016 13.062 19 12 19c-1.062 0-3.978-.984-7.084-3.056C3.528 14.463 2.726 12.943 2.458 12z"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.98 8.223A10.451 10.451 0 012 12c.77 2.017 2.512 4.102 5.02 5.777C9.51 19.4 11.686 20 12 20c.314 0 2.49-.6 4.98-2.223C19.488 16.102 21.23 14.017 22 12a10.451 10.451 0 00-1.98-3.777m-3.197-2.232C15.88 5.272 14.016 5 12 5c-.314 0-2.49.6-4.98 2.223m9.563.554L4.22 19.778"
                                />
                            </svg>
                        )}
                    </span>
                </div>
                {fieldErrors.oldPassword && <p className="text-red-500">{fieldErrors.oldPassword}</p>}
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
                        className={`border w-full rounded-lg p-3 ${fieldErrors.newPassword ? "border-red-500" : "border-textcolor"}`}
                    />
                    <span
                        className="absolute right-3 top-3 cursor-pointer"
                        onClick={() => toggleVisibility("newPassword")}
                    >
                        {visibility.newPassword ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-.268.943-1.07 2.463-2.458 3.944C15.978 18.016 13.062 19 12 19c-1.062 0-3.978-.984-7.084-3.056C3.528 14.463 2.726 12.943 2.458 12z"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.98 8.223A10.451 10.451 0 012 12c.77 2.017 2.512 4.102 5.02 5.777C9.51 19.4 11.686 20 12 20c.314 0 2.49-.6 4.98-2.223C19.488 16.102 21.23 14.017 22 12a10.451 10.451 0 00-1.98-3.777m-3.197-2.232C15.88 5.272 14.016 5 12 5c-.314 0-2.49.6-4.98 2.223m9.563.554L4.22 19.778"
                                />
                            </svg>
                        )}
                    </span>
                </div>
                {fieldErrors.newPassword && <p className="text-red-500">{fieldErrors.newPassword}</p>}
            </div>

            <div className="my-4">
                <label>Konfirmasi Password Baru</label>
                <div className="relative">
                    <input
                        type={visibility.confirmPassword ? "text" : "password"}
                        placeholder="Konfirmasi password baru"
                        value={confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        onBlur={() => handleBlur("confirmPassword")}
                        className={`border w-full rounded-lg p-3 ${fieldErrors.confirmPassword ? "border-red-500" : "border-textcolor"}`}
                    />
                    <span
                        className="absolute right-3 top-3 cursor-pointer"
                        onClick={() => toggleVisibility("confirmPassword")}
                    >
                        {visibility.confirmPassword ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-.268.943-1.07 2.463-2.458 3.944C15.978 18.016 13.062 19 12 19c-1.062 0-3.978-.984-7.084-3.056C3.528 14.463 2.726 12.943 2.458 12z"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.98 8.223A10.451 10.451 0 012 12c.77 2.017 2.512 4.102 5.02 5.777C9.51 19.4 11.686 20 12 20c.314 0 2.49-.6 4.98-2.223C19.488 16.102 21.23 14.017 22 12a10.451 10.451 0 00-1.98-3.777m-3.197-2.232C15.88 5.272 14.016 5 12 5c-.314 0-2.49.6-4.98 2.223m9.563.554L4.22 19.778"
                                />
                            </svg>
                        )}
                    </span>
                </div>
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

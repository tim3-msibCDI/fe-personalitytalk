"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    // Get the query string from the URL
    const queryParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = queryParams.get("token"); // Get the 'token' from the URL
    setToken(tokenFromUrl);
  }, []);

  const [visibility, setVisibility] = useState({
    password: false,
    passwordConfirmation: false,
  });

  const router = useRouter();

  const toggleVisibility = (field) => {
    setVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const resetToken =
      "LrJjt95pgHl7qBAUkWuYmDrZNBUY1miap9f5BdjL0yB2KN5pzjehCMrgzkPo"; // Sesuaikan dengan token dari server

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/password/reset/change`,
        {
          reset_token: token,
          password,
          password_confirmation: passwordConfirmation,
        }
      );

      if (response.data) {
        setSuccess(
          "Password berhasil diperbarui. Silakan kembali ke halaman login."
        );
        setTimeout(() => router.push("/login"), 3000); // Redirect ke halaman login setelah 3 detik
      }
    } catch (err) {
      if (err.response && err.response.data.errors) {
        setError("Terjadi kesalahan: " + err.response.data.message);
      } else {
        setError("Terjadi kesalahan. Silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* Logo */}
      <Image
        src="/image/logo.webp" // Ganti dengan path logo Anda
        alt="Logo Personality Talk"
        className="mb-6 h-16"
        height={64}
        width={0}
      />

      {/* Judul */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Ubah Kata Sandi</h1>
      <p className="text-gray-600 text-center mb-6">
        Silahkan lakukan pengubahan kata sandi Anda. Pastikan kata sandi Anda
        tidak mudah ditebak.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6">
        {/* Input Password */}
        <div className="mb-4">
          <div className="relative">
            <input
              type={visibility.password ? "text" : "password"}
              placeholder="Masukkan password baru"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="py-2 px-4 w-full rounded-lg text-s mt-1 font-light border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-400"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => toggleVisibility("password")}
            >
              {visibility.password ? (
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
        </div>

        {/* Input Konfirmasi Password */}
        <div className="mb-4">
          <div className="relative">
            <input
              type={visibility.passwordConfirmation ? "text" : "password"}
              placeholder="Konfirmasi password baru"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="py-2 px-4 w-full rounded-lg text-s mt-1 font-light border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-400"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => toggleVisibility("passwordConfirmation")}
            >
              {visibility.passwordConfirmation ? (
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
        </div>
        <button
          type="submit"
          className="bg-primary text-whitebg text-s py-2 px-4 mt-8 rounded-lg hover:bg-hover transition-all duration-200 flex items-center justify-center mx-auto w-1/2"
          disabled={loading}
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-solid"></div>
          ) : (
            "Ubah Kata Sandi"
          )}
        </button>
      </form>

      {/* Notifikasi */}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {success && <p className="text-green-500 text-center mt-4">{success}</p>}
    </div>
  );
};

export default ChangePassword;

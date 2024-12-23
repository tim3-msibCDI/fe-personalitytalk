"use client";

import { useState } from "react";
import axios from "axios";

const PasswordResetRequest = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/password/reset/request`,
        {
          email,
        }
      );

      if (response.data.success) {
        setSuccess("Link reset kata sandi telah dikirim ke email Anda. Silahkan cek email anda.");
      }
    } catch (err) {
      if (
        err.response &&
        err.response.data.errors &&
        err.response.data.errors.email
      ) {
        setError(err.response.data.errors.email[0]);
      } else {
        setError("Terjadi kesalahan. Silakan coba lagi.");
      }
    } finally {
      setLoading(false); // Selesai loading
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* Logo */}
      <div className="mb-8">
        <img
          src="/image/logo.webp" // Ganti dengan path logo Anda
          alt="Logo Personality Talk"
          className="h-16"
        />
      </div>
      {/* Container untuk menyelaraskan semua elemen */}
      <div className="w-full max-w-md px-4">
        {/* Judul */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Ubah Kata Sandi
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Lupa kata sandi? Untuk melakukan perubahan kata sandi, silakan masukkan alamat email Anda.
        </p>
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Masukan Email Anda"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            className="py-2 px-4 w-full rounded-lg text-s mt-1 font-light border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-400"
            required
          />
          <button
            className="bg-primary text-whitebg text-s py-2 px-4 mt-8 rounded-lg hover:bg-hover transition-all duration-200 flex items-center justify-center mx-auto w-1/2"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-solid"></div>
            ) : (
              "Ubah Kata Sandi"
            )}
          </button>

        </form>
        {/* Error atau Success Message */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {success && <p className="text-green-500 text-center mt-4">{success}</p>}
      </div>
    </div>
  );
};

export default PasswordResetRequest;

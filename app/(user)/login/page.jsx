"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fungsi untuk menutup notifikasi error
  const closeErrorNotification = () => {
    setError(null);
  };

  // Fungsi untuk validasi input
  const validate = () => {
    let tempErrors = {};
    if (!email) tempErrors.email = "Email harus diisi";
    if (!password) tempErrors.password = "Password harus diisi";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  async function onSubmit(event) {
    event.preventDefault();
    if (!validate()) return; // Jika ada error validasi, tidak lanjutkan submit

    setIsLoading(true);
    setError(null);

    try {
      const formData = {
        email,
        password,
      };

      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Password yang Anda Masukkan Tidak Sesuai !");
      }

      const responseData = await response.json();
      const token = responseData.data.token;

      // Save token to sessionStorage or state
      sessionStorage.setItem("authToken", token);
      window.location.href = "/";
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="flex flex-row mt-16 mb-24 justify-center">
        <div className="mr-20">
          <Image
            src="/image/login/rafiki.png"
            alt="Login Image"
            width={475}
            height={0}
          />
        </div>
        <div className="bg-primarylight rounded-lg w-553">
          <div className="grid justify-center mt-7">
            <Image
              src="/image/logo.webp"
              alt="Logo"
              width={187.32}
              height={0}
            />
          </div>

          <div className="text-textcolor my-8">
            <div className="mx-6">
              {/* Display the error notification if exists */}
              {error && (
                <div className="mb-4 p-3 bg-[#fbfbfb8f] text-fail font-medium rounded-lg flex justify-between items-center">
                  <span>{error}</span>
                  <button onClick={closeErrorNotification} className="text-[#E74C3C] font-bold">
                    X
                  </button>
                </div>
              )}

              <form onSubmit={onSubmit}>
                <div className="">
                  <div>
                    <label className="text-m font-normal text-textcolor">
                      Email
                    </label>
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Masukan Email Anda"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`py-2 px-4 w-full rounded-lg text-s mt-1 font-light border-solid border ${
                        errors.email ? "border-red-500" : "border-text2"
                      }`}
                    />
                    {errors.email && (
                      <span className="text-red-500 text-sm">{errors.email}</span>
                    )}
                  </div>
                </div>
                <div className="pt-5">
                  <div>
                    <label className="text-m font-normal text-textcolor">
                      Password
                    </label>
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Masukan Password Anda"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`py-2 px-4 w-full rounded-lg text-s mt-1 font-light border-solid border ${
                        errors.password ? "border-red-500" : "border-text2"
                      }`}
                    />
                    {errors.password && (
                      <span className="text-red-500 text-sm">{errors.password}</span>
                    )}
                  </div>
                </div>
                <div className="text-fail text-s font-light p-1">
                  <p className="text-right">Lupa kata sandi?</p>
                </div>
                <button
                  className="bg-primary text-whitebg text-s w-full py-2 px-4 mt-8 rounded-lg"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Login"}
                </button>
                <button className="flex items-center px-4 py-2 bg-whitebg text-textcolor rounded-lg w-full justify-center text-s mt-3.5">
                  <Image
                    src="/image/icons/google.svg"
                    alt="Google Logo"
                    width={0}
                    height={30}
                    className="w-6 h-6 mr-2"
                  />
                  Lanjutkan dengan Akun Google
                </button>
              </form>

              <div className="flex flex-row justify-center mt-7 ">
                <div className="text-textcolor mr-5 py-2 ">
                  Belum punya akun?
                </div>
                <button className="rounded-lg px-4 py-2 text-s font-medium bg-whitebg border border-primary text-primary">
                  <Link href="/register">Daftar Disini</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

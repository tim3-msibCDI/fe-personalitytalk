"use client";

import { useState } from "react";
import { loginUser } from "@/api/user";
import { setToken } from "@/lib/auth";
import Modal from "@/components/modals/modal";
import Loading from "@/components/loading/loading";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await loginUser(email, password);
      const token = data.data.token; //Ambil token dari response token
      const role = data.data.role; //ambil role untuk otorisasi dari response role
      setToken(token);
      if (role === "U") {
        window.location.href = "/"; // Arahkan ke halaman utama untuk user biasa
      } else if (role === "P") {
        window.location.href = "/psikolog/dashboard"; // Arahkan ke halaman psikolog
      } else {
        window.location.href = "/"; // Jika role tidak teridentifikasi, arahkan ke halaman utama
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        setError("Server error, please try again later.");
      } else if (error.response && error.response.status === 404) {
        setError(
          error.response.data.message + " Silahkan daftar terlebih dahulu"
        );
      } else {
        setError(
          error.response.data.message + " Harap masukkan password yang benar."
        );
      }
      setIsModalOpen(true); // Open modal on error
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Loading */}
      {isLoading && <Loading />}
      {/* Modal for displaying error messages */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6">
          <div className="pb-6 flex justify-items-end">
            <button onClick={() => setIsModalOpen(false)} className="ml-auto">
              <Image
                src="/icons/close.svg"
                alt="Login Image"
                width={25}
                height={25}
                className="bg-primary rounded-md"
              />
            </button>
          </div>
          <div>
            <Image
              src="/icons/sad.png"
              alt="Icons Sad"
              width={111}
              height={111}
              className="rounded-md mx-auto"
            />
          </div>
          <p className="lg:text-h3 text-m font-medium text-center py-6 lg:pb-16 pb-10">
            {error}
          </p>
        </div>
      </Modal>

      <div className="flex flex-row mt-16 mb-24 justify-center">
        <div className="mr-20 hidden lg:flex">
          <Image
            src="/image/login/rafiki.png"
            alt="Login Image"
            width={475}
            height={0}
          />
        </div>
        <div className="bg-primarylight rounded-lg size-553">
          <div className="grid justify-center mt-7">
            <Image
              src="/image/logo.webp"
              alt="Logo"
              width={187.32}
              height={0}
            />
          </div>

          <div className="text-textcolor mt-8">
            <div className="mx-6">
              <form onSubmit={onSubmit}>
                <div>
                  <label className="text-m font-normal text-textcolor">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Masukan Email Anda"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="py-2 px-4 w-full rounded-lg text-s mt-1 font-light border-solid border focus:text-textcolor placeholder:text-textsec"
                  />
                </div>
                <div className="pt-5">
                  <label className="text-m font-normal text-textcolor">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Masukan Password Anda"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="py-2 px-4 w-full rounded-lg text-s mt-1 font-light border-solid border focus:text-textcolor placeholder:text-textsec"
                  />
                </div>
                <button
                  className="bg-primary text-whitebg text-s w-full py-2 px-4 mt-8 rounded-lg hover:bg-hover"
                  type="submit"
                >
                  Login
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

              <div className="flex flex-row justify-center mt-7">
                <div className="text-textcolor mr-5 py-2">
                  Belum punya akun?
                </div>
                <Link
                  href="/register"
                  className="rounded-lg px-4 py-2 text-s font-medium bg-whitebg border border-primary text-primary"
                >
                  Daftar Disini
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await loginUser(email, password);
      const token = data.data.token; //Ambil token dari response token
      const role = data.data.role; //ambil role untuk otorisasi dari response role
      setToken(token, role); // Simpan token dan role
      console.log(token, role);
      // Navigasi berdasarkan role
      if (["U", "M"].includes(role)) {
        router.push("/"); // Arahkan ke halaman utama untuk user biasa
      } else if (["P", "K"].includes(role)) {
        router.push("/psikolog/dashboard"); // Arahkan ke dashboard psikolog
      } else {
        router.push("/"); // Default ke halaman utama jika role tidak valid
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

  async function redirectToGoogleLogin() {
    try {
      // Cek jika API URL sudah terdefinisi dengan benar
      if (!process.env.NEXT_PUBLIC_API_URL) {
        throw new Error("API URL is not configured.");
      }
  
      // Redirect ke halaman login Google
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth/google`;
  
    } catch (error) {
      // Menangani error jika API URL tidak terdefinisi atau ada masalah lain
      console.error("Redirect to Google Login failed:", error.message);
      setError("An error occurred while trying to log in with Google. Please try again.");
      setIsModalOpen(true); // Menampilkan modal error
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
                src="/image/icons/close.svg"
                alt="Login Image"
                width={25}
                height={25}
                className="bg-primary rounded-md"
              />
            </button>
          </div>
          <div>
            <Image
              src="/image/icons/sad.png"
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
                <div className="relative pt-5">
                  <label className="text-m font-normal text-textcolor">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukan Password Anda"
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="py-2 px-4 w-full rounded-lg text-s font-light border-solid border focus:text-textcolor placeholder:text-textsec"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-4 flex items-center"
                    >
                      <Image
                        src={`/image/icons/${
                          showPassword ? "eye-fill" : "eye-off-fill"
                        }.svg`}
                        alt={showPassword ? "Hide Password" : "Show Password"}
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                  <div className="flex justify-end mt-2">
                    <Link
                      href="/lupa-password/request"
                      className="text-primary text-sm font-medium"
                    >
                      Lupa Kata Sandi?
                    </Link>
                  </div>
                </div>
                <button
                  className="bg-primary text-whitebg text-s w-full py-2 px-4 mt-8 rounded-lg hover:bg-hover"
                  type="submit"
                >
                  Login
                </button>
                <button
                  onClick={redirectToGoogleLogin}
                  className="flex items-center px-4 py-2 bg-whitebg text-textcolor rounded-lg w-full justify-center text-s mt-3.5"
                >
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

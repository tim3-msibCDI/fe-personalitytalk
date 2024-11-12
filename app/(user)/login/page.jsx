"use client";

import { useState } from "react";
import { loginUser } from "@/api/user";
import { setToken } from "@/lib/auth";
import Modal from "@/components/modals/modal"; 
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
      const token = data.data.token;
      setToken(token);
      window.location.href = "/";
    } catch (error) {
      if (error.response && error.response.status === 500) {
        setError("Server error, please try again later.");
      } else if (error.response && error.response.status === 404) {
        setError("API endpoint not found.");
      } else {
        setError("Failed to submit the data. Please check your input.");
      }
      setIsModalOpen(true); // Open modal on error
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Modal for displaying error messages */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>{error}</p>
          <button
            onClick={() => setIsModalOpen(false)}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
          >
            Close
          </button>
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
            <Image src="/image/logo.webp" alt="Logo" width={187.32} height={0} />
          </div>

          <div className="text-textcolor mt-8">
            <div className="mx-6">
              <form onSubmit={onSubmit}>
                <div>
                  <label className="text-m font-normal text-textcolor">Email</label>
                  <input
                    type="email"
                    placeholder="Masukan Email Anda"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="py-2 px-4 w-full rounded-lg text-s tracking- text-textsec mt-1 font-light"
                  />
                </div>
                <div className="pt-5">
                  <label className="text-m font-normal text-textcolor">Password</label>
                  <input
                    type="password"
                    placeholder="Masukan Password Anda"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="py-2 px-4 w-full rounded-lg text-s tracking- text-textsec mt-1 font-light"
                  />
                </div>
                <button
                  className="bg-primary text-whitebg text-s w-full py-2 px-4 mt-8 rounded-lg hover:bg-hover"
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

              <div className="flex flex-row justify-center mt-7">
                <div className="text-textcolor mr-5 py-2">Belum punya akun?</div>
                <Link href="/register" className="rounded-lg px-4 py-2 text-s font-medium bg-whitebg border border-primary text-primary">
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

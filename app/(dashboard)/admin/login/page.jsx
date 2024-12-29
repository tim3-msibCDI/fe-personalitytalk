"use client";

import { useState } from "react";
import { loginAdmin, getAdminInfo } from "@/api/user";
import { setToken } from "@/lib/auth";
import Modal from "@/components/modals/modal";
import Loading from "@/components/loading/loading";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);
    setIsModalOpen(false);

    try {
      const data = await loginAdmin(email, password);
      console.log(email)

      if (data.success) {
        const token = data.data.token;
        const role = data.data.role;
        setToken(token, role);

        // Ambil informasi admin setelah login berhasil
        try {
          const adminData = await getAdminInfo();
          if (adminData.success) {
            // Simpan data admin ke local storage
            localStorage.setItem("userName", adminData.data.data.name);
            localStorage.setItem(
              "userPhoto",
              adminData.data.data.photo_profile
            );
          }
        } catch (adminError) {
          console.error("Gagal mengambil informasi admin:", adminError.message);
        }

        // Navigasi ke halaman sesuai role
        if (role === "A") {
          router.push("/admin/dashboard");
        } else {
          router.push("/admin");
        }

        setMessage(data.message);
      } else {
        setError(data.message);
        setIsModalOpen(true);
      }
    } catch (error) {
      setIsModalOpen(true);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else if (error.response && error.response.status === 500) {
        setError("Server error, please try again later.");
      } else {
        setError("Percobaan Login Gagal.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Loading */}
      {isLoading && <Loading />}
      {/* Modal for displaying messages */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6">
          <div className="pb-6 flex justify-items-end">
            <button onClick={() => setIsModalOpen(false)} className="ml-auto">
              <Image
                src="/image/icons/close.svg"
                alt="Close Icon"
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
            {message || error}
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

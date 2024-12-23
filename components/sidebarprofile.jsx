"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/constants/useUser";
import { useRef, useState } from "react";
import Loading from "./loading/loading";
import axios from "axios";
import { getToken } from "@/lib/auth";
import SuccessUpdateProfile from "@/components/popup/update-photo-profile";
import Modal from "@/components/modals/modal";

export default function SidebarProfile() {
  const pathname = usePathname();
  const { user, mutate } = useUser();
  const fileInputRef = useRef(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // State modal success

  // Check if the current route is active
  const isActive = (href) => pathname === href;

  // Function to handle file selection
  const handlePencilClick = () => {
    fileInputRef.current.click(); // Trigger input file click
  };

  // Function to handle file upload
  const handleFileChange = async (event) => {
    const token = getToken();  
    const file = event.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("photo_profile", file);

      // Kirim API
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/profile/updatePhotoProfile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",

          },
        }
      );

      // Re-fetch user data
      mutate();
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Error updating profile photo:", error);
      alert("Gagal mengupdate foto profil");
    }
  };

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="lg:max-w-72 bg-primarylight2 rounded-lg p-9 border border-solid border-textsec flex flex-col justify-between">
      <div className="grid justify-items-center">
        <div className="relative">
          {/* Gambar Profil */}
          <Image
            src={
              user.photoProfile.startsWith("storage/")
                ? `${process.env.NEXT_PUBLIC_IMG_URL}/${user.photoProfile}` // Jika diawali dengan "storage/"
                : user.photoProfile // Jika bukan
            }
            width={120}
            height={120}
            className="rounded-full"
            alt="Foto Profil"
          />
          {/* Ikon Pensil */}
          <div
            className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow cursor-pointer"
            onClick={handlePencilClick} // Klik ikon pencil
          >
            <Image
              src="/icons/edit-pencil.svg"
              width={30}
              height={30}
              alt="Edit Icon"
            />
          </div>
          {/* Input File Tersembunyi */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange} // Ketika file dipilih
            accept="image/*" // Hanya file gambar
          />
          {/* Modal Success Update Profile */}
          <Modal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)}>
            <SuccessUpdateProfile onClose={() => setIsSuccessModalOpen(false)} />
          </Modal>
        </div>  
        <div className="mt-2 text-center">
          <h3 className="text-h3 font-semibold">{user.name}</h3>
          <p className="text-center text-vs font-normal">{user.email}</p>
          <p className="text-center text-vs font-normal">
            Gabung Sejak: {user.joined_at}
          </p>
          <hr className="border-t-1 border-text2 my-4 lg:block flex w-full" />
          <ul className="text-left text-sm flex lg:block">
            {/* Biodata Link */}
            <li
              className={`flex p-3 my-2 gap-2 rounded-lg cursor-pointer ${
                isActive("/profile")
                  ? "bg-primary font-semibold text-white"
                  : ""
              }`}
            >
              <Link href="/profile" className="flex items-center">
                <Image
                  src={
                    isActive("/profile")
                      ? "/icons/user-white.svg"
                      : "/icons/user-primary.svg"
                  }
                  height={15}
                  width={15}
                  className="mr-0 lg:mr-2"
                />
                <span className="hidden lg:inline">Biodata Diri</span>
              </Link>
            </li>

            {/* Change Password Link */}
            <li
              className={`flex p-3 my-2 gap-2 rounded-lg cursor-pointer ${
                isActive("/profile/change-password")
                  ? "bg-primary font-semibold text-whitebg"
                  : ""
              }`}
            >
              <Link
                href="/profile/change-password"
                className="flex items-center"
              >
                <Image
                  src={
                    isActive("/profile/change-password")
                      ? "/icons/key-white.svg"
                      : "/icons/key-primary.svg"
                  }
                  height={15}
                  width={15}
                  className="mr-0 lg:mr-2"
                />
                <span className="hidden lg:inline">Ganti Password</span>
              </Link>
            </li>

            {/* Konsultasi Link */}
            <li
              className={`flex p-3 my-2 gap-2 rounded-lg cursor-pointer ${
                isActive("/profile/konsultasi")
                  ? "bg-primary font-semibold text-whitebg"
                  : ""
              }`}
            >
              <Link
                href="/profile/konsultasi"
                className="flex items-center"
              >
                <Image
                  src={
                    isActive("/profile/konsultasi")
                      ? "/icons/chat-white.svg"
                      : "/icons/chat-primary.svg"
                  }
                  height={20}
                  width={20}
                  className="mr-0 lg:mr-2"
                />
                <span className="hidden lg:inline">Konsultasi Saya</span>
              </Link>
            </li>

            {/* Course Link (Visible only for 'm' role) */}
            {user.role === "M" && (
              <li
                className={`flex p-3 my-2 gap-2 rounded-lg cursor-pointer ${
                  isActive("/profile/course")
                    ? "bg-primary font-semibold text-whitebg"
                    : ""
                }`}
              >
                <Link
                  href="/profile/course"
                  className="flex items-center gap-2"
                >
                  <Image
                    src={
                      isActive("/profile/course")
                        ? "/icons/course-white.svg"
                        : "/icons/course-primary.svg"
                    }
                    height={20}
                    width={20}
                    className="mr-0 lg:mr-2"
                  />
                  <span className="hidden lg:inline">Course</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

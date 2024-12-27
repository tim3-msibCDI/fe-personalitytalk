"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/constants/useUser"; // Ganti dengan jalur yang benar ke useUser
import { useRef, useState } from "react";
import Loading from "./loading/loading";
import axios from "axios";
import { getToken } from "@/lib/auth";
import SuccessUpdateProfile from "@/components/popup/update-photo-profile";
import Modal from "@/components/modals/modal";

export default function SidebarProfilePsikolog() {
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

  // Handle loading state or user being undefined
  if (!user) {
    return <Loading />; // Or a placeholder while loading user data
  }

  return (
    <div className="lg:max-w-72 bg-primarylight2 rounded-lg p-9 border border-solid border-textsec flex flex-col justify-between">
      <div className="grid justify-items-center">
        <div className="relative">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMG_URL}/${user.photoProfile}`}
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
              src="/image/icons/edit-pencil.svg"
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
          <Modal
            isOpen={isSuccessModalOpen}
            onClose={() => setIsSuccessModalOpen(false)}
          >
            <SuccessUpdateProfile
              onClose={() => setIsSuccessModalOpen(false)}
            />
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
                isActive("/psikolog/profile")
                  ? "bg-primary font-semibold text-white"
                  : ""
              }`}
            >
              <Link href="/psikolog/profile" className="flex items-center">
                <Image
                  src={
                    isActive("/psikolog/profile")
                      ? "/image/icons/user-white.svg"
                      : "/image/icons/user-primary.svg"
                  }
                  height={15}
                  width={15}
                  className="mr-0 lg:mr-2"
                  alt="icons"
                />
                <span className="hidden lg:inline">Biodata Diri</span>
              </Link>
            </li>

            {/* Change Password Link */}
            <li
              className={`flex p-3 my-2 gap-2 rounded-lg cursor-pointer ${
                isActive("/psikolog/profile/change-password")
                  ? "bg-primary font-semibold text-whitebg"
                  : ""
              }`}
            >
              <Link
                href="/psikolog/profile/change-password"
                className="flex items-center"
              >
                <Image
                  src={
                    isActive("/psikolog/profile/change-password")
                      ? "/image/icons/key-white.svg"
                      : "/image/icons/key-primary.svg"
                  }
                  height={15}
                  width={15}
                  className="mr-0 lg:mr-2"
                  alt="icons"
                />
                <span className="hidden lg:inline">Ganti Password</span>
              </Link>
            </li>

            {/* Konsultasi Link */}
            <li
              className={`flex p-3 my-2 gap-2 rounded-lg cursor-pointer ${
                isActive("/psikolog/profile/rating")
                  ? "bg-primary font-semibold text-whitebg"
                  : ""
              }`}
            >
              <Link
                href="/psikolog/profile/rating"
                className="flex items-center"
              >
                <Image
                  src={
                    isActive("/psikolog/profile/rating")
                      ? "/image/icons/star-white.svg"
                      : "/image/icons/star.svg"
                  }
                  height={20}
                  width={20}
                  className="mr-0 lg:mr-2"
                  alt="icons"
                />
                <span className="hidden lg:inline">Rating</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

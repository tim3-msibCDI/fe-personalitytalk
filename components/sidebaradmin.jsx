"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Loading from "./loading/loading";
import { logoutAdmin } from "@/api/user";

export default function SidebarAdmin() {
  const pathname = usePathname();
  const [userName, setUserName] = useState(null); // State to store userName
  const [userPhoto, setUserPhoto] = useState(null); // State to store userPhoto
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors

  // Check if the current route is active
  const isActive = (href) => pathname === href;

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      localStorage.removeItem("userName");
      localStorage.removeItem("userPhoto"); // Hapus data dari localStorage saat logout
      window.location.href = "/admin/login"; // Redirect ke halaman login
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  useEffect(() => {
    // Retrieve userName and userPhoto from localStorage
    const storedUserName = localStorage.getItem("userName");
    const storedUserPhoto = localStorage.getItem("userPhoto");

    if (storedUserName && storedUserPhoto) {
      setUserName(storedUserName); // Set userName state
      setUserPhoto(storedUserPhoto); // Set userPhoto state
      setLoading(false); // Stop loading once data is available
    } else {
      setError("No user data found in localStorage"); // Handle missing data
      setLoading(false);
    }
  }, []); // Run the effect once when the component mounts

  // Handle loading state
  if (loading) {
    return <Loading />; // Or a placeholder while loading user data
  }

  // Handle errors
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Handle case when user data is not found
  if (!userName || !userPhoto) {
    return <p>No user data found</p>;
  }

  return (
    <div className="lg:max-w-72 bg-primarylight2 rounded-lg p-9 border border-solid border-textsec flex flex-col justify-between">
      <div className="grid justify-items-center">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMG_URL}/${userPhoto}`}
          width={120}
          height={120}
          className="rounded-full"
          alt="user"
        />
        <div className="mt-2 text-center">
          <h3 className="text-h3 font-semibold">{userName}</h3>
          <hr className="border-t-1 border-text2 my-4 lg:block flex w-full" />
          <ul className="text-left text-sm flex lg:block">
            {/* Biodata Link */}
            <li
              className={`flex p-3 my-2 gap-2 rounded-lg cursor-pointer ${
                isActive("/admin/pengaturan")
                  ? "bg-primary font-semibold text-white"
                  : ""
              }`}
            >
              <Link href="/admin/pengaturan" className="flex items-center">
                <Image
                  src={
                    isActive("/admin/pengaturan")
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
                isActive("/admin/pengaturan/change-password")
                  ? "bg-primary font-semibold text-white"
                  : ""
              }`}
            >
              <Link
                href="/admin/pengaturan/change-password"
                className="flex items-center"
              >
                <Image
                  src={
                    isActive("/admin/pengaturan/change-password")
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

            {/* Log Out Link */}
            <li
              className={`flex p-3 my-2 gap-2 rounded-lg cursor-pointer ${
                isActive("/admin/logout")
                  ? "bg-primary font-semibold text-white"
                  : ""
              }`}
            >
              <button onClick={handleLogout} className="flex items-center">
                <Image
                  src={
                    isActive("/admin/logout")
                      ? "/image/icons/logout-white.svg"
                      : "/image/icons/logout-primary.svg"
                  }
                  height={20}
                  width={20}
                  className="mr-0 lg:mr-2"
                  alt="icons"
                />
                <span className="hidden lg:inline">Log Out</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

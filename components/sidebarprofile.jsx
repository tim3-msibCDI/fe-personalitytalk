"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/constants/useUser"; // Ganti dengan jalur yang benar ke useUser

export default function SidebarProfile() {
  const pathname = usePathname();
  const { user } = useUser(); // Mengambil data pengguna dari useUser

  // Check if the current route is active
  const isActive = (href) => pathname === href;

  // Handle loading state or user being undefined
  if (!user) {
    return <div>Loading...</div>; // Or a placeholder while loading user data
  }

  return (
    <div className="max-w-72 bg-primarylight2 rounded-lg p-9 border border-solid border-textsec flex flex-col justify-between">
      <div className="grid justify-items-center">
        <Image
          src="/image/psikolog/1.png"
          width={120}
          height={120}
          className="rounded-full"
        />
        <div className="mt-2 text-center">
          <h3 className="text-h3 font-semibold">{user.nama}</h3>
          <p className="text-center text-vs font-normal">{user.email}</p>
          <p className="text-center text-vs font-normal">
            Gabung Sejak: {user.joined_at}
          </p>
          <hr className="my-6 border-textsec" />
          <ul className="text-left text-sm">
            {/* Biodata Link */}
            <li
              className={`flex p-3 my-2 gap-2 self-stretch rounded-lg cursor-pointer ${
                isActive("/profile")
                  ? "bg-primary font-semibold text-whitebg"
                  : ""
              }`}
            >
              <Link href="/profile" className="flex items-center gap-2">
                <Image
                  src={
                    isActive("/profile")
                      ? "/icons/user-white.svg"
                      : "/icons/user-primary.svg"
                  }
                  height={15}
                  width={15}
                  className="mr-2"
                />
                Biodata Diri
              </Link>
            </li>

            {/* Change Password Link */}
            <li
              className={`flex p-3 my-2 gap-2 self-stretch rounded-lg cursor-pointer ${
                isActive("/profile/change-password")
                  ? "bg-primary font-semibold text-whitebg"
                  : ""
              }`}
            >
              <Link
                href="/profile/change-password"
                className="flex items-center gap-2"
              >
                <Image
                  src={
                    isActive("/profile/change-password")
                      ? "/icons/key-white.svg"
                      : "/icons/key-primary.svg"
                  }
                  height={15}
                  width={15}
                  className="mr-2"
                />
                Ganti Password
              </Link>
            </li>

            {/* Konsultasi Link */}
            <li
              className={`flex p-3 my-2 gap-2 self-stretch rounded-lg cursor-pointer ${
                isActive("/profile/konsultasi")
                  ? "bg-primary font-semibold text-whitebg"
                  : ""
              }`}
            >
              <Link
                href="/profile/konsultasi"
                className="flex items-center gap-2"
              >
                <Image
                  src={
                    isActive("/profile/konsultasi")
                      ? "/icons/chat-white.svg"
                      : "/icons/chat-primary.svg"
                  }
                  height={15}
                  width={15}
                  className="mr-2"
                />
                Konsultasi Saya
              </Link>
            </li>

            {/* Course Link (Visible only for 'm' role) */}
            {user.role === "M" && (
              <li
                className={`flex p-3 my-2 gap-2 self-stretch rounded-lg cursor-pointer ${
                  isActive("/profile/course")
                    ? "bg-primary font-semibold text-whitebg"
                    : ""
                }`}
              >
                <Link href="/profile/course" className="flex items-center gap-2">
                  <Image
                    src={
                      isActive("/profile/course")
                        ? "/icons/course-white.svg"
                        : "/icons/course-primary.svg"
                    }
                    height={15}
                    width={15}
                    className="mr-2"
                  />
                  Course
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

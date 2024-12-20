"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/constants/useUser"; // Ganti dengan jalur yang benar ke useUser
import Loading from "./loading/loading";

export default function SidebarProfilePsikolog() {
  const pathname = usePathname();
  const { user } = useUser(); // Mengambil data pengguna dari useUser

  // Check if the current route is active
  const isActive = (href) => pathname === href;

  // Handle loading state or user being undefined
  if (!user) {
    return <Loading/>; // Or a placeholder while loading user data
  }

  return (
    <div className="lg:max-w-72 bg-primarylight2 rounded-lg p-9 border border-solid border-textsec flex flex-col justify-between">
      <div className="grid justify-items-center">
        <Image
          src= {`${process.env.NEXT_PUBLIC_IMG_URL}/${user.photoProfile}`}
          width={120}
          height={120}
          className="rounded-full"
        />
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

            {/* Rating Link */}
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
                      ? "/icons/star-white.svg"
                      : "/icons/star.svg"
                  }
                  height={20}
                  width={20}
                  className="mr-0 lg:mr-2"
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

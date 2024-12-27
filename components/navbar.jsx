"use client"; // Ensure the component runs on the client side

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUser } from "@/constants/useUser";
import { isAuthenticated } from "@/lib/auth";
import { logoutUser } from "@/api/user";
import { useState } from "react";
import Loading from "./loading/loading";

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useUser();
  const [loading, setLoading] = useState(false); // Loading state for logout

  const isActive = (href) => pathname === href;

  // Function to handle logout
  const handleLogout = async () => {
    try {
      setLoading(true); // Start loading animation
      await logoutUser();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error.message);
    } finally {
      setLoading(false); // Stop loading animation after logout process
    }
  };

  return (
    <nav className="flex justify-between items-center py-4 px-6 md:px-8 lg:px-12 bg-white shadow-lg text-m sticky top-0 z-50">
      <div className="text-m font-bold ml-4 lg:ml-8">
        <Link href="/">
          <Image
            src="/image/logo.webp"
            alt="Logo"
            width={131}
            height={50}
            className="h-auto"
          />
        </Link>
      </div>
      <ul className="hidden md:flex space-x-4 lg:space-x-6 font-light text-textcolor text-m md:text-base lg:text-m">
      <li>
          <Link
            href="/"
            className={`${
              isActive("/")
                ? "font-semibold underline underline-offset-8"
                : ""
            }`}
          >
            Beranda
          </Link>
        </li>
        <li>
          <Link
            href="/konsultasi"
            className={`${
              isActive("/konsultasi")
                ? "font-semibold underline underline-offset-8"
                : ""
            }`}
          >
            Konsultasi
          </Link>
        </li>
        <li>
          <Link
            href="/course"
            className={`${
              isActive("/course")
                ? "font-semibold underline underline-offset-8"
                : ""
            }`}
          >
            Course
          </Link>
        </li>
        <li>
          <Link
            href="/tes-mental"
            className={`${
              isActive("/tes-mental")
                ? "font-semibold underline underline-offset-8"
                : ""
            }`}
          >
            Tes Mental
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={`${
              isActive("/about")
                ? "font-semibold underline underline-offset-8"
                : ""
            }`}
          >
            About Us
          </Link>
        </li>
      </ul>

      <div className="hidden md:flex mr-4 lg:mr-8 space-x-4">
        {isAuthenticated() && user?.name ? (
          <div className="relative group text-s font-semibold">
            <button className="border border-primary bg-primary text-whitebg px-4 py-1.5 md:px-5 md:py-2 rounded-lg">
              {user.name}
            </button>
            <div className="absolute right-0 w-48 bg-primary border border-t-4 border-t-primarylight text-whitebg shadow-lg rounded-lg hidden group-hover:block">
              <Link href="/profile" className="block px-4 py-2 hover:bg-hover">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-hover"
              >
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <>
            <Link
              href="/register"
              className="border border-primary text-primary text-sm md:text-base lg:text-m px-3 py-1.5 md:px-4 md:py-2 rounded-lg"
            >
              Register
            </Link>
            <Link
              href="/login"
              className="border border-primary bg-primary text-white text-sm md:text-base lg:text-m px-4 py-1.5 md:px-5 md:py-2 rounded-lg"
            >
              Login
            </Link>
          </>
        )}
      </div>

      {loading && <Loading />}

      {/* Responsive mobile menu */}
      <div className="md:hidden flex items-center">
        <button className="text-primary focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}

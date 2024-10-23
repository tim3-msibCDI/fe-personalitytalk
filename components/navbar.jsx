"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { isAuthenticated, getUserInfo, removeToken } from "@/lib/auth";

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isActive = (href) => pathname === href;

  useEffect(() => {
    // Cek apakah user sudah login
    const checkUserStatus = async () => {
      try {
        if (isAuthenticated()) {
          const userInfo = await getUserInfo();
          setUser(userInfo); 
          console.log(userInfo)
        }
      } catch (error) {
        console.error("Failed to load user info:", error);
      } finally {
        setLoading(false); 
      }
    };

    checkUserStatus();
  }, []);

  // Fungsi untuk handle logout
  const handleLogout = () => {
    removeToken();
    setUser(null);
    window.location.href = "/"; // Redirect ke halaman utama setelah logout
  };

  return (
    <nav className="flex justify-between items-center py-4 px-6 md:px-8 lg:px-12 bg-white shadow-lg text-m sticky top-0 z-50">
      <div className="text-m font-bold">
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
            href="/konsultasi"
            className={`${
              isActive("/konsultasi") ? "font-semibold underline underline-offset-8" : ""
            }`}
          >
            Konsultasi
          </Link>
        </li>
        <li>
          <Link
            href="/course"
            className={`${
              isActive("/course") ? "font-semibold underline underline-offset-8" : ""
            }`}
          >
            Course
          </Link>
        </li>
        <li>
          <Link
            href="/tes-mental"
            className={`${
              isActive("/tes-mental") ? "font-semibold underline underline-offset-8" : ""
            }`}
          >
            Tes Mental
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={`${
              isActive("/about") ? "font-semibold underline underline-offset-8" : ""
            }`}
          >
            About Us
          </Link>
        </li>
      </ul>

      <div className="hidden md:flex mr-4 lg:mr-8 space-x-4">
        {!loading && user ? (
          <div className="relative group">
            <button className="border border-primary bg-primary text-white text-sm md:text-base lg:text-m px-4 py-1.5 md:px-5 md:py-2 rounded-lg">
              {user.data.name} 
            </button>
            <div className="absolute right-0 w-48 bg-white border border-gray-200 shadow-lg rounded-lg hidden group-hover:block">
              <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          // Jika belum login, tampilkan tombol Login dan Register
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

      {/* Responsive mobile menu */}
      <div className="md:hidden flex items-center">
        <button className="text-primary focus:outline-none">
          {/* Burger icon */}
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

"use client";

import { logoutUser } from "@/api/user";
import { useUser } from "@/constants/UserContext";
import { useState } from "react";
import { isAuthenticated } from "@/lib/auth";
import Link from "next/link";
import Loading from "@/components/loading/loading";

export default function TopbarPsikolog() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logoutUser();
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-whitebg py-4 px-6 shadow">
      <div className="w-full flex justify-end">
      {isAuthenticated() && user?.name ? (
          <div className="relative group text-sm font-semibold">
            <button className="border border-primary bg-primary text-white px-4 py-2 rounded-lg">
              {user.name}
            </button>
            <div className="absolute right-0 w-48 bg-primary border border-t-4 border-t-primarylight text-white shadow-lg rounded-lg hidden group-hover:block">
              <Link href="/profile" className="block px-4 py-2 hover:bg-hover">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-hover"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link
            href="/login"
            className="border border-primary bg-primary text-white px-4 py-2 rounded-lg"
          >
            Login
          </Link>
        )}
      </div>
      {loading && <Loading/> }
    </div>
  );
}

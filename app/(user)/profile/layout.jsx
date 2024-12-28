"use client";

import { useEffect } from "react";
import SidebarProfile from "@/components/sidebarprofile";
import { useUser } from "@/constants/useUser"; // Make sure this path is correct
import Loading from "@/components/loading/loading";

export default function ProfileUserLayout({ children }) {
  const { user, isLoading, isError } = useUser(); // Use the useUser hook

  // Handle loading and error states
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error loading user profile.</div>;
  }

  return (
    <div className="mx-4 sm:mx-20 my-9 text-textcolor">
      <div>
        <h1 className="text-h2 font-semibold">
          Selamat datang kembali {user.name}!
        </h1>
      </div>
      <div className="w-full mt-6 lg:flex gap-4">
        {/* Sidebar Here */}
        <SidebarProfile />

        <div className="flex-1 rounded-lg bg-primarylight2 py-6 px-8 grid justify-items-center border border-solid border-textsec mt-4 lg:mt-0">
          {children}
        </div>
      </div>
    </div>
  );
}

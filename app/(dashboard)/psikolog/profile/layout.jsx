"use client";

import { useEffect } from "react";
import SidebarProfilePsikolog from "@/components/sidebarprofilepsi";
import { useUser } from "@/constants/useUser"; // Make sure this path is correct
import Loading from "@/components/loading/loading";

export default function ProfilePsikologLayout({ children }) {
  const { user, isLoading, isError } = useUser(); // Use the useUser hook

  // Handle loading and error states
  if (isLoading) {
    return <Loading/>;
  }

  if (isError) {
    return <div>Error loading user profile.</div>; 
  }

  return (
    <div className="p-12 py-6 text-textcolor">
      <div className="w-full lg:flex gap-4">
        {/* Sidebar Here */}
        <SidebarProfilePsikolog />

        <div className="flex-1 rounded-lg bg-primarylight2 py-6 px-8 grid border border-solid border-textsec mt-4 lg:mt-0">
          {children}
        </div>
      </div>
    </div>
  );
}

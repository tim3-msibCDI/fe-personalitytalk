"use client";

import { useState, useEffect } from "react";
import SidebarProfile from "@/components/sidebarprofile";
import { getUserDetail } from "@/lib/auth";

export default function ProfileUserLayout({ children }) {
  const [user, setUser] = useState({
    nama: "",
    email: "",
    tanggal: "",
    role: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userDetails = await getUserDetail(); 
        
        setUser({
          nama: userDetails.name,
          email: userDetails.email,
          tanggal: userDetails.joined_at,
          role: userDetails.role,
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="mx-20 my-9 text-textcolor">
      <div>
        <h1 className="text-h2 font-semibold">
          Selamat datang kembali {user.nama}!
        </h1>
      </div>
      <div className="w-full mt-6 flex gap-4">
        {/* Sidebar Here */}
        <SidebarProfile />

        <div className="flex-1 rounded-lg bg-primarylight py-6 px-8 grid justify-items-center border border-solid border-textsec">
          {children}
        </div>
      </div>
    </div>
  );
}

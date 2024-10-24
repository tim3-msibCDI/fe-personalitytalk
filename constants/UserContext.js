"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getUserDetail } from "@/api/user";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    nama: "",
    email: "",
    joined_at: "",
    role: "",
    photoProfile: "",
    gender: "",
    dateBirth:"",
    phoneNumber: "",
    universitas: "",
    jurusan:"",

  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userDetails = await getUserDetail();
        setUser({
          nama: userDetails.name,
          email: userDetails.email,
          joined_at: userDetails.joined_at,
          role: userDetails.role,
          photoProfile: userDetails.photoProfile,
          gender: userDetails.gender,
          dateBirth: userDetails.dateBirth,
          phoneNumber: userDetails.phoneNumber,
          universitas: userDetails.universitas,
          jurusan: userDetails.jurusan,
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

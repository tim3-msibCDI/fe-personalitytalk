"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getUserDetail } from "@/api/user";
import { updateProfile } from "@/api/user"; 

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    joined_at: "",
    role: "",
    photoProfile: "",
    gender: "",
    dateBirth: "",
    phoneNumber: "",
    universitas: "",
    jurusan: "",
    psikologDetails: null, // Detail psikolog
    konselorDetails: null, // Detail konselor
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userDetails = await getUserDetail();
        console.log("Fetched User Details:", userDetails);

        // Memeriksa role dan menambahkan data spesifik berdasarkan role
        if (userDetails.role === "P") { // Jika Psikolog
          setUser({
            name: userDetails.name,
            email: userDetails.email,
            joined_at: userDetails.joined_at,
            role: userDetails.role,
            photoProfile: userDetails.photoProfile,
            gender: userDetails.gender,
            dateBirth: userDetails.dateBirth,
            phoneNumber: userDetails.phoneNumber,
            universitas: userDetails.universitas || "",
            jurusan: userDetails.jurusan || "",
            psikologDetails: userDetails.psikolog_details || null, // Menyimpan detail psikolog
            konselorDetails: null, // Konselor details kosong
          });
        } else if (userDetails.role === "K") { // Jika Konselor
          setUser({
            name: userDetails.name,
            email: userDetails.email,
            joined_at: userDetails.joined_at,
            role: userDetails.role,
            photoProfile: userDetails.photoProfile,
            gender: userDetails.gender,
            dateBirth: userDetails.dateBirth,
            phoneNumber: userDetails.phoneNumber,
            universitas: userDetails.universitas || "",
            jurusan: userDetails.jurusan || "",
            konselorDetails: userDetails.psikolog_details || null, // Menyimpan detail konselor
            psikologDetails: null, // Psikolog details kosong
          });
        } else { // Jika bukan Psikolog atau Konselor (misalnya Mahasiswa atau Umum)
          setUser({
            name: userDetails.name,
            email: userDetails.email,
            joined_at: userDetails.joined_at,
            role: userDetails.role,
            photoProfile: userDetails.photoProfile,
            gender: userDetails.gender,
            dateBirth: userDetails.dateBirth,
            phoneNumber: userDetails.phoneNumber,
            universitas: userDetails.universitas || "",
            jurusan: userDetails.jurusan || "",
            psikologDetails: null, // Tidak ada detail psikolog
            konselorDetails: null, // Tidak ada detail konselor
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []); // Hanya jalankan sekali saat mount

  // Fungsi untuk memperbarui profil pengguna
  const updateUserProfile = async (formData) => {
    try {
      const updatedUser = await updateProfile(formData); // Memanggil fungsi updateProfile
      setUser((prevUser) => ({
        ...prevUser,
        ...updatedUser,
      }));
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook untuk mengakses data user
export const useUser = () => useContext(UserContext);

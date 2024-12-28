import useSWR from "swr";
import { getUserDetail, updateProfile, upgradeMahasiswa } from "@/api/user";

// Fungsi untuk mengambil detail pengguna
const fetchUserDetail = async () => {
  try {
    const userDetails = await getUserDetail();

    const baseData = {
      name: userDetails.name,
      email: userDetails.email,
      joined_at: userDetails.joined_at,
      role: userDetails.role,
      photoProfile: userDetails.photoProfile,
      gender: userDetails.gender,
      dateBirth: userDetails.dateBirth,
      phone_number: userDetails.phone_number,
    };

    // Kondisi jika user adalah mahasiswa
    if (userDetails.role === "M") {
      return {
        ...baseData,
        universitas: userDetails.universitas || "",
        jurusan: userDetails.jurusan || "",
      };
    } 
    // Kondisi jika user adalah Psikolog (P) atau Konselor (K)
    else if (userDetails.role === "P" || userDetails.role === "K") {
      // Kondisi Psikolog
      if (userDetails.role === "P") {
        return {
          ...baseData,
          sipp: userDetails.psikologDetails?.sipp || "", // Hanya ada untuk Psikolog
          practiceStartDate: userDetails.psikologDetails?.practiceStartDate || "",
          description: userDetails.psikologDetails?.description || "",
          topics: userDetails.psikologDetails?.topics || [],
          bankName: userDetails.psikologDetails?.bankName || "",
          rekening: userDetails.psikologDetails?.rekening || "",
        };
      }
      // Kondisi Konselor
      else if (userDetails.role === "K") {
        return {
          ...baseData,
          practiceStartDate: userDetails.konselorDetails?.practiceStartDate || "",
          description: userDetails.konselorDetails?.description || "",
          topics: userDetails.konselorDetails?.topics || [],
          bankName: userDetails.psikologDetails?.bankName || "",
          rekening: userDetails.psikologDetails?.rekening || "",
        };
      }
    }
    // Jika role lainnya
    else {
      return baseData;
    }
  } catch (error) {
    throw new Error("Error fetching user profile");
  }
};

export const useUser = () => {
  const { data, error, mutate } = useSWR("/user/profile", fetchUserDetail);

  // Fungsi untuk update profile
  const updateUserProfile = async (formData) => {
    try {
      mutate(
        async (prevData) => {
          await updateProfile(formData);
          return { ...prevData, ...formData };
        },
        { revalidate: false }
      );
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Fungsi untuk upgrade ke mahasiswa
  const upgradeToMahasiswa = async (universitas, jurusan) => {
    try {
      await upgradeMahasiswa(universitas, jurusan);
      mutate(
        (prevData) => ({
          ...prevData,
          universitas,
          jurusan,
          role: "M", // Perubahan role menjadi mahasiswa
        }),
        { revalidate: true }
      );
    } catch (error) {
      console.error("Error upgrading to mahasiswa:", error);
    }
  };

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    updateUserProfile,
    upgradeToMahasiswa,
    mutate,
  };
};

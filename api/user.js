import axios from "axios";

import { getToken } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Fungsi Login user
export const loginUser = async (email, password) => {
  const response = await axios.post(
    `${API_URL}/user/login`,
    { email, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Fungsi Register User
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/user/register`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Fungsi ambil info User (nama, photo profile, role)
export const getUserInfo = async () => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.get(`${API_URL}/user/info`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
};

// Fungsi untuk mendapatkan detail user
export const getUserDetail = async () => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.get(`${API_URL}/user/profile/detail`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data.data;

    // Structure data yang digunakan pada frontend
    return {
      name: data.name,
      email: data.email,
      role: data.role,
      photoProfile: data.photo_profile,
      gender: data.gender === "M" ? "Laki-Laki" : "Perempuan",
      dateBirth: data.date_birth,
      phoneNumber: data.phone_number,
      joined_at: data.joined_since,
      universitas: data.mahasiswa_details?.universitas || "",
      jurusan: data.mahasiswa_details?.jurusan || "",
    };
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
};

// Fungsi untuk Update Profile User
export const updateProfile = async (formData) => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.put(
      `${API_URL}/user/profile/update`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update profile");
  }
};

// Fungsi untuk mengubah password
export const changePassword = async (
  oldPassword,
  newPassword,
  confirmPassword
) => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.put(
      `${API_URL}/user/profile/updatePassword`,
      {
        current_password: oldPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("Failed to change password");
  }
};

// Fungsi untuk upgrade ke mahasiswa
export const upgradeMahasiswa = async (universitas, jurusan) => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.put(
      `${API_URL}/user/profile/updateMahasiswa`,
      { universitas, jurusan },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to upgrade to mahasiswa");
  }
};

import axios from "axios";

import { getToken } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/user/login`, { email, password }, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/user/register`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

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

// Function to get detailed user profile
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

    // Structure the data for use in the frontend
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

// Function to change password
export const changePassword = async (oldPassword, newPassword, confirmPassword) => {
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
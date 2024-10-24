import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const setToken = (token) => {
  Cookies.set("authToken", token, { expires: 7 });
};

export const removeToken = () => {
  Cookies.remove("authToken");
};

export const getToken = () => {
  return Cookies.get("authToken");
};

export const isAuthenticated = () => {
  return !!getToken();
};

// Fungsi untuk mendapatkan data user
export const getUserInfo = async () => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }

  const response = await fetch(`${API_URL}/user/info`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  return response.json();
};

export const getUserDetail = async () => {
    const token = getToken();
    if (!token) {
      throw new Error("No token found");
    }
  
    const response = await fetch(`${API_URL}/user/profile/detail`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
  
    const data = await response.json();
  
    // Strukturkan data untuk penggunaan di frontend
    return {
      name: data.data.name,
      email: data.data.email,
      role: data.data.role,
      photoProfile: data.data.photo_profile,
      gender: data.data.gender === "M" ? "Laki-Laki" : "Perempuan",
      dateBirth: data.data.date_birth,
      phoneNumber: data.data.phone_number,
      universitas: data.data.mahasiswa_details?.universitas || "",
      jurusan: data.data.mahasiswa_details?.jurusan || "",
    };
  };
  
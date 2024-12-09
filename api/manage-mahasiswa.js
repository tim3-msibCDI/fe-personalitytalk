import { getToken } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const deleteMahasiswa = async (id) => {
  try {
    const response = await fetch(`${API_URL}/admin/mahasiswa/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (!response.ok) {
      throw new Error("Gagal menghapus data mahasiswa");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export async function addMahasiswa(mahasiswaData) {
  try {
    // Membuat FormData
    const formData = new FormData();
    formData.append("name", mahasiswaData.name);
    formData.append("email", mahasiswaData.email);
    formData.append("phone_number", mahasiswaData.phone_number);
    formData.append("date_birth", mahasiswaData.date_birth);
    formData.append("gender", mahasiswaData.gender);
    formData.append("universitas", mahasiswaData.universitas);
    formData.append("jurusan", mahasiswaData.jurusan);

    // Append photo_profile hanya jika ada
    if (mahasiswaData.photo_profile) {
      formData.append("photo_profile", mahasiswaData.photo_profile);
    }

    const response = await fetch(`${API_URL}/admin/mahasiswa`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "ngrok-skip-browser-warning": "69420",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add mahasiswa");
    }

    return { success: true, message: "Mahasiswa added successfully" };
  } catch (error) {
    console.error("Error in addMahasiswa:", error.message);
    return { success: false, message: error.message };
  }
}

export async function editMahasiswa(mahasiswaId, mahasiswaData) {
  try {
    const formData = new FormData();

    for (const key in mahasiswaData) {
      if (
        key === "photo_profile" &&
        (typeof mahasiswaData[key] === "string" || !mahasiswaData[key])
      ) {
        // Jangan tambahkan jika photo_profile adalah URL atau null
        continue;
      }

      if (mahasiswaData[key] !== null && mahasiswaData[key] !== undefined) {
        formData.append(key, mahasiswaData[key]);
      }
    }

    const response = await fetch(`${API_URL}/admin/mahasiswa/${mahasiswaId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "ngrok-skip-browser-warning": "69420",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Failed to edit mahasiswa");
    }

    return { success: true, message: "Mahasiswa edited successfully" };
  } catch (error) {
    console.error("Error in editMahasiswa:", error.message);
    return { success: false, message: error.message };
  }
}

export async function getMahasiswaDetail(mahasiswaId) {
  try {
    const response = await fetch(`${API_URL}/admin/mahasiswa/${mahasiswaId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch mahasiswa details");
    }

    const mahasiswaData = await response.json();
    return { success: true, data: mahasiswaData };
  } catch (error) {
    console.error("Error in getMahasiswaDetail:", error.message);
    return { success: false, message: error.message };
  }
}

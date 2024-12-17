import { getToken } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Fungsi untuk menambahkan topik
export async function addTopic(data) {
  try {
    const response = await fetch(`${API_URL}/admin/topics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
        "ngrok-skip-browser-warning": "69420",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Gagal menambahkan topik");
    }

    return { success: true, message: "Topik berhasil ditambahkan" };
  } catch (error) {
    console.error("Error in addTopic:", error.message);
    return { success: false, message: error.message };
  }
}

// Fungsi untuk mengupdate topik
export async function updateTopic(id, data) {
  try {
    const response = await fetch(`${API_URL}/admin/topics/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
        "ngrok-skip-browser-warning": "69420",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Gagal mengedit topik");
    }

    return { success: true, message: "Topik berhasil diperbarui" };
  } catch (error) {
    console.error("Error in updateTopic:", error.message);
    return { success: false, message: error.message };
  }
}

// Fungsi untuk menghapus topik
export async function deleteTopic(id) {
  try {
    const response = await fetch(`${API_URL}/admin/topics/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Gagal menghapus topik");
    }

    return { success: true, message: "Topik berhasil dihapus" };
  } catch (error) {
    console.error("Error in deleteTopic:", error.message);
    return { success: false, message: error.message };
  }
}

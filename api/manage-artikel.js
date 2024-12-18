import { getToken } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Fungsi untuk mendapatkan semua kategori
export async function getAllCategories() {
  try {
    const response = await fetch(`${API_URL}/admin/article/categories`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Gagal memuat kategori");
    }

    const data = await response.json();
    return { success: true, data: data.categories || [] };
  } catch (error) {
    console.error("Error in getAllCategories:", error.message);
    return { success: false, message: error.message, data: [] };
  }
}

// Fungsi untuk menambahkan kategori
export async function addCategory(data) {
  try {
    const response = await fetch(`${API_URL}/admin/article/categories`, {
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
      throw new Error(errorData || "Gagal menambahkan kategori");
    }

    return { success: true, message: "Kategori berhasil ditambahkan" };
  } catch (error) {
    console.error("Error in addCategory:", error.message);
    return { success: false, message: error.message };
  }
}

// Fungsi untuk menghapus kategori
export async function deleteCategory(id) {
  try {
    const response = await fetch(`${API_URL}/admin/article/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Gagal menghapus kategori");
    }

    return { success: true, message: "Kategori berhasil dihapus" };
  } catch (error) {
    console.error("Error in deleteCategory:", error.message);
    return { success: false, message: error.message };
  }
}

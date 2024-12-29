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

// Fungsi untuk menambah mitra
export async function addPartner(partnerData) {
  try {
    // Create FormData for sending data
    const formData = new FormData();
    formData.append("name", partnerData.name);
    formData.append("description", partnerData.description);

    // Append img only if it's a valid File object
    if (partnerData.img && partnerData.img instanceof File) {
      formData.append("img", partnerData.img);
    }

    const response = await fetch(`${API_URL}/admin/mitra`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "ngrok-skip-browser-warning": "69420",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add partner");
    }

    return { success: true, message: "Partner added successfully" };
  } catch (error) {
    console.error("Error in addPartner:", error.message);
    return { success: false, message: error.message };
  }
}

// Edit mitra
export async function editPartner(partnerId, partnerData) {
  try {
    const formData = new FormData();

    for (const key in partnerData) {
      // Skip appending 'img' if it's a string or null/undefined
      if (
        key === "img" &&
        (typeof partnerData[key] === "string" || !partnerData[key])
      ) {
        continue;
      }

      // Append non-null or non-undefined fields
      if (partnerData[key] !== null && partnerData[key] !== undefined) {
        formData.append(key, partnerData[key]);
      }
    }

    const response = await fetch(`${API_URL}/admin/mitra/${partnerId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "ngrok-skip-browser-warning": "69420",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Failed to edit partner");
    }

    return { success: true, message: "Partner edited successfully" };
  } catch (error) {
    console.error("Error in editPartner:", error.message);
    return { success: false, message: error.message };
  }
}

// Fungsi untuk mendapatkan semua artikel
export async function getAllArticles() {
  try {
    const response = await fetch(`${API_URL}/admin/articles`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Gagal memuat artikel");
    }

    const data = await response.json();
    return { success: true, data: data.articles || [] };
  } catch (error) {
    console.error("Error in getAllArticles:", error.message);
    return { success: false, message: error.message, data: [] };
  }
}

// Fungsi untuk menambahkan artikel
export async function addArticle(formData) {
  try {
    for (let [key, value] of formData.entries()) {
      console.log(key, value); // Debug untuk memastikan data
    }

    const response = await fetch(`${API_URL}/admin/articles`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "ngrok-skip-browser-warning": "69420",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Gagal menambahkan artikel");
    }

    return { success: true, message: "Artikel berhasil ditambahkan" };
  } catch (error) {
    console.error("Error in addArticle:", error.message);
    return { success: false, message: error.message };
  }
}

// Fungsi untuk mengedit artikel
export async function editArticle(articleId, updatedData) {
  try {
    const formData = new FormData();

    // Hanya tambahkan field yang ada dalam updatedData
    Object.entries(updatedData).forEach(([key, value]) => {
      if (key === "article_img" && value instanceof File) {
        // Jika article_img adalah file, tambahkan ke FormData
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    });

    const response = await fetch(`${API_URL}/admin/articles/${articleId}`, {
      method: "POST", // Gunakan method POST untuk edit
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "ngrok-skip-browser-warning": "69420",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Gagal mengedit artikel");
    }

    const responseData = await response.json();
    return {
      success: true,
      message: responseData.message || "Artikel berhasil diedit",
    };
  } catch (error) {
    console.error("Error in editArticle:", error.message);
    return { success: false, message: error.message };
  }
}

// Fungsi untuk menghapus artikel
export async function deleteArticle(articleId) {
  try {
    const response = await fetch(`${API_URL}/admin/articles/${articleId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Gagal menghapus artikel");
    }

    return { success: true, message: "Artikel berhasil dihapus" };
  } catch (error) {
    console.error("Error in deleteArticle:", error.message);
    return { success: false, message: error.message };
  }
}

// Fungsi untuk mendapatkan detail artikel
export async function getArticleDetail(articleId) {
  try {
    const response = await fetch(`${API_URL}/admin/articles/${articleId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Gagal memuat detail artikel");
    }

    const data = await response.json();
    return { success: true, data: data };
  } catch (error) {
    console.error("Error in getArticleDetail:", error.message);
    return { success: false, message: error.message, data: null };
  }
}

export async function addDisease(formData) {
  try {
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const response = await fetch(`${API_URL}/admin/diseases`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "ngrok-skip-browser-warning": "69420",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add disease");
    }

    return { success: true, message: "Disease added successfully" };
  } catch (error) {
    console.error("Error in addDisease:", error.message);
    return { success: false, message: error.message };
  }
}

// Fungsi untuk mengedit penyakit
export async function editDisease(diseaseId, diseaseData) {
  try {
    const formData = new FormData();
    for (const key in diseaseData) {
      if (
        key === "disease_img" &&
        (typeof diseaseData[key] === "string" || !diseaseData[key])
      ) {
        // Jangan tambahkan jika disease_img adalah URL atau null
        continue;
      }

      if (diseaseData[key] !== null && diseaseData[key] !== undefined) {
        formData.append(key, diseaseData[key]);
      }
    }

    const response = await fetch(`${API_URL}/admin/diseases/${diseaseId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "ngrok-skip-browser-warning": "69420",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Failed to edit disease");
    }

    return { success: true, message: "Disease edited successfully" };
  } catch (error) {
    console.error("Error in editDisease:", error.message);
    return { success: false, message: error.message };
  }
}

// Fungsi untuk menghapus penyakit
export async function deleteDisease(diseaseId) {
  try {
    const response = await fetch(`${API_URL}/admin/diseases/${diseaseId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete disease");
    }

    return { success: true, message: "Disease deleted successfully" };
  } catch (error) {
    console.error("Error in deleteDisease:", error.message);
    return { success: false, message: error.message };
  }
}

// Fungsi untuk mendapatkan detail penyakit
export async function getDiseaseDetail(diseaseId) {
  try {
    const response = await fetch(`${API_URL}/admin/diseases/${diseaseId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch disease details");
    }

    const diseaseData = await response.json();
    return { success: true, data: diseaseData };
  } catch (error) {
    console.error("Error in getDiseaseDetail:", error.message);
    return { success: false, message: error.message };
  }
}

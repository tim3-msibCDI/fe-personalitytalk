import { getToken } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Fungsi untuk menghapus data psikolog
export async function deletePsikolog(id) {
  try {
    const response = await fetch(`${API_URL}/admin/psikolog/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error("Gagal menghapus data psikolog");
    }

    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    console.error(error.message);
    return { success: false, message: error.message };
  }
}

// Fungsi untuk Edit data psikolog
export async function editPsikolog(psikologId, psikologData) {
  try {
    const formData = new FormData();

    for (const key in psikologData) {
      if (
        key === "photo_profile" &&
        (typeof psikologData[key] === "string" || !psikologData[key])
      ) {
        // Jangan tambahkan jika photo_profile adalah URL atau null
        continue;
      }

      if (psikologData[key] !== null && psikologData[key] !== undefined) {
        formData.append(key, psikologData[key]);
      }
    }

    const response = await fetch(`${API_URL}/admin/psikolog/${psikologId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "ngrok-skip-browser-warning": "69420",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Failed to edit psikolog");
    }

    return { success: true, message: "Psikolog edited successfully" };
  } catch (error) {
    console.error("Error in editPsikolog:", error.message);
    return { success: false, message: error.message };
  }
}

// Fungsi untuk mengambil data detail psikolog
export async function getPsikologDetail(psikologId) {
  try {
    const response = await fetch(`${API_URL}/admin/psikolog/${psikologId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch psikolog details");
    }

    const psikologData = await response.json();
    return { success: true, data: psikologData };
  } catch (error) {
    console.error("Error in getPsikologDetail:", error.message);
    return { success: false, message: error.message };
  }
}

// Fungsi untuk mengambil data detail konselor
export async function getKonselorDetail(konselorId) {
  try {
    const response = await fetch(`${API_URL}/admin/konselor/${konselorId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch konselor details");
    }

    const konselorData = await response.json();
    return { success: true, data: konselorData };
  } catch (error) {
    console.error("Error in getKonselorDetail:", error.message);
    return { success: false, message: error.message };
  }
}

// Fungsi untuk mengambil data topik konsultasi
export async function getTopics() {
  try {
    const response = await fetch(`${API_URL}/admin/topics`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch topics");
    }

    const topicsData = await response.json();
    return topicsData.data || []; // Langsung kembalikan array
  } catch (error) {
    console.error("Error in getTopics:", error.message);
    return []; // Kembalikan array kosong saat error
  }
}

// Fungsi untuk mengambil data bank yang tersedia
export async function fetchBanks() {
  try {
    const response = await fetch(`${API_URL}/admin/list-psikolog-banks`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch banks");
    }

    const banksData = await response.json();
    return banksData.data || []; // Langsung kembalikan array
  } catch (error) {
    console.error("Error in fetchBanks:", error.message);
    return []; // Kembalikan array kosong saat error
  }
}

// Fungsi untuk menghapus data harga psikolog
export async function deletePricePsikolog(id) {
  try {
    const response = await fetch(`${API_URL}/admin/psikolog-price/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error("Gagal menghapus data psikolog");
    }

    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    console.error(error.message);
    return { success: false, message: error.message };
  }
}

// Fungsi untuk mengambil data detail dari psikolog yang mendaftar
export async function getPsikologRegist(psikologId) {
  try {
    const response = await fetch(
      `${API_URL}/admin/psikolog-regis/${psikologId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch psikolog details");
    }

    const psikologData = await response.json();
    return { success: true, data: psikologData };
  } catch (error) {
    console.error("Error in getPsikologDetail:", error.message);
    return { success: false, message: error.message };
  }
}

// Fungsi untuk approved Psikolog
export async function approvedPsikolog(psikologId) {
  try {
    const response = await fetch(
      `${API_URL}/admin/psikolog-regis/${psikologId}/approve`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Gagal menambahkan Psikolog");
    }

    return { success: true, message: "Psikolog Berhasil ditambahkan" };
  } catch (error) {
    console.error("Error in aprroved Psikolog:", error.message);
    return { success: false, message: error.message };
  }
}

// Fungsi untuk menolak psikolog dengan alasan
export async function rejectedPsikolog(psikologId, reason) {
  try {
    const response = await fetch(
      `${API_URL}/admin/psikolog-regis/${psikologId}/reject`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify({ reason }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Gagal menolak Psikolog");
    }

    return { success: true, message: "Psikolog berhasil ditolak" };
  } catch (error) {
    console.error("Error in rejectedPsikolog:", error.message);
    return { success: false, message: error.message };
  }
}

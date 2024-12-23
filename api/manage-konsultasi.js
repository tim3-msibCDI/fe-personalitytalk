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

// Fungsi untuk melihat jadwal psikolog
export async function getPsychologistSchedule(id, date = null) {
  try {
    // Tambahkan tanggal sebagai query parameter jika ada
    const url = new URL(`${API_URL}/admin/consul-schedules/psikolog/${id}`);
    if (date) {
      url.searchParams.append("date", date);
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Gagal mengambil jadwal psikolog");
    }

    const data = await response.json();
    console.log("Response data:", data);
    return { success: true, message: "Jadwal berhasil diambil", data };
  } catch (error) {
    console.error("Error in getPsychologistSchedule:", error.message);
    return { success: false, message: error.message };
  }
}

// Fungsi untuk memperbarui ketersediaan jadwal psikolog
export async function updateScheduleAvailability(id, isAvailable) {
  try {
    const url = `${API_URL}/admin/consul-schedules/${id}/update-availability`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
      body: JSON.stringify({
        is_available: isAvailable, // Kirim status is_available
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Gagal memperbarui ketersediaan jadwal");
    }

    const data = await response.json();
    console.log("Update response data:", data);
    return {
      success: true,
      message: "Ketersediaan jadwal berhasil diperbarui",
      data,
    };
  } catch (error) {
    console.error("Error in updateScheduleAvailability:", error.message);
    return { success: false, message: error.message };
  }
}

// Fungsi untuk melihat rating dari user
export async function getConsultationRating(consul_id, psch_id) {
  try {
    // Append psch_id as a query parameter in the URL
    const url = new URL(`${API_URL}/admin/consultation/${consul_id}/rating`);
    url.searchParams.append("psch_id", psch_id); // Add psch_id as query parameter

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Gagal mengambil rating konsultasi");
    }

    const data = await response.json();
    console.log("Response data:", data);
    return { success: true, message: "Rating berhasil diambil", data };
  } catch (error) {
    console.error("Error in getConsultationRating:", error.message);
    return { success: false, message: error.message };
  }
}

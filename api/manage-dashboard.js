import { getToken } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Fungsi untuk mendapatkan data dashboard
export async function getDashboardData() {
  try {
    const response = await fetch(`${API_URL}/admin/dashboard`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Failed to load dashboard data");
    }

    const data = await response.json();
    return { success: true, data: data.data || {} };
  } catch (error) {
    console.error("Error in getDashboardData:", error.message);
    return { success: false, message: error.message, data: {} };
  }
}


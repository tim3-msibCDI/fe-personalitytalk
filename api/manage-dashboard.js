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

// Fungsi untuk menghapus mitra
export async function deletePartner(partnerId) {
    try {
      const response = await fetch(`${API_URL}/admin/mitra/${partnerId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete partner");
      }
  
      return { success: true, message: "Partner deleted successfully" };
    } catch (error) {
      console.error(error.message);
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
        if (key === "img" && (typeof partnerData[key] === "string" || !partnerData[key])) {
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

  // Fungsi untuk mendapatkan detail mitra
  export async function getPartnerDetail(partnerId) {
    try {
      const response = await fetch(`${API_URL}/admin/mitra/${partnerId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch partner details");
      }
  
      const partnerData = await response.json();
      return { success: true, data: partnerData };
    } catch (error) {
      console.error("Error in getPartnerDetail:", error.message);
      return { success: false, message: error.message };
    }
  }
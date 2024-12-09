import { getToken } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function deleteUser(userId) {
  try {
    const response = await fetch(`${API_URL}/admin/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete user");
    }

    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    console.error(error.message);
    return { success: false, message: error.message };
  }
}

export async function addUser(userData) {
  try {
    // Membuat FormData
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("phone_number", userData.phone_number);
    formData.append("date_birth", userData.date_birth);
    formData.append("gender", userData.gender);

    // Append photo_profile hanya jika ada
    if (userData.photo_profile) {
      formData.append("photo_profile", userData.photo_profile);
    }

    const response = await fetch(`${API_URL}/admin/users`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "ngrok-skip-browser-warning": "69420",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add user");
    }

    return { success: true, message: "User added successfully" };
  } catch (error) {
    console.error("Error in addUser:", error.message);
    return { success: false, message: error.message };
  }
}

export async function editUser(userId, userData) {
  try {
    const formData = new FormData();
    for (const key in userData) {
      if (
        key === "photo_profile" &&
        (typeof userData[key] === "string" || !userData[key])
      ) {
        // Jangan tambahkan jika photo_profile adalah URL atau null
        continue;
      }

      if (userData[key] !== null && userData[key] !== undefined) {
        formData.append(key, userData[key]);
      }
    }

    const response = await fetch(`${API_URL}/admin/users/${userId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "ngrok-skip-browser-warning": "69420",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Failed to edit user");
    }

    return { success: true, message: "User edited successfully" };
  } catch (error) {
    console.error("Error in editUser:", error.message);
    return { success: false, message: error.message };
  }
}

export async function getUserDetail(userId) {
  try {
    const response = await fetch(`${API_URL}/admin/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch user details");
    }

    const userData = await response.json();
    return { success: true, data: userData };
  } catch (error) {
    console.error("Error in getUserDetail:", error.message);
    return { success: false, message: error.message };
  }
}

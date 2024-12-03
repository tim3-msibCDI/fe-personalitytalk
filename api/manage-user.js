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

export async function editUser(userId, userData) {
  try {
    const response = await fetch(`${API_URL}/admin/users/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to edit user");
    }

    return { success: true, message: "User edited successfully" };
  } catch (error) {
    console.error(error.message);
    return { success: false, message: error.message };
  }
}

export async function addUser(userData) {
  try {
    const response = await fetch(`${API_URL}/admin/users`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add user");
    }

    return { success: true, message: "User added successfully" };
  } catch (error) {
    console.error(error.message);
    return { success: false, message: error.message };
  }
}

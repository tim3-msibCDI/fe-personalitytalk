import axios from "axios";
import { getToken } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Fetches chat messages for a given chat session.
 * 
 * @param {string} chatSessionId - The ID of the chat session to fetch messages for.
 * @returns {Promise<Object>} The data containing the chat messages.
 * @throws {Error} If the token is not found or the request fails.
 */
export const fetchChatMessages = async (chatSessionId) => {
  try {
    const token = getToken();
    if (!token) throw new Error("Token tidak ditemukan!");

    const response = await axios.get(
      `${API_URL}/chat/${chatSessionId}/messages`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    throw error;
  }
};

export async function sendChatMessage(message) {
    try {
      const token = getToken();
      if (!token) throw new Error("Token tidak ditemukan!");
  
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/chat/send`,
        message,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      return response.data; 
    } catch (error) {
      console.error("Error sending message:", error);
      throw error; 
    }
  };

export async function getPsikologInfo(consul_id) {
    try {
      const token = getToken();
      if (!token) throw new Error("Token tidak ditemukan!");
  
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/chat/psikolog-info`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
          },
          params: { consul_id },
        }
      );
      return response.data; 
    } catch (error) {
      console.error("Error fetching user info:", error);
      throw error; 
    }
  };

import axios from "axios";
import { getToken } from "@/lib/auth";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

/**
 * Fetch riwayat konsultasi/transaksi
 * @returns {Promise<Object>} Data riwayat dari API
 */
export const getConsultationHistory = async () => {
    const token = getToken();
    if (!token) {
        throw new Error("No token found");
    }

    try {
        const response = await axios.get(`${API_URL}/history/consultation`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420",
            },
        });
        return response;
    } catch (error) {
        throw new Error("Failed to fetch consultation history");
    }
};


/**
 * Fetch riwayat konsultasi/transaksi
 * @returns {Promise<Object>} Data riwayat dari API
 */
export const getTransactionHistory = async () => {
    const token = getToken();
    if (!token) {
        throw new Error("No token found");
    }

    try {
        const response = await axios.get(`${API_URL}/history/consultation/transaction`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420",
            },
        });
        return response;
    } catch (error) {
        throw new Error("Failed to fetch consultation history");
    }
 }

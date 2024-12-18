import { getToken } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Fungsi untuk menambah data rekening
export async function addPaymentMethod(paymentData) {
  try {
    const formData = new FormData();
    formData.append("name", paymentData.name); // Nama bank
    formData.append("type", paymentData.type); // Jenis pembayaran
    formData.append("bank_code", paymentData.bank_code); // Kode bank
    formData.append("no_rek", paymentData.no_rek); // Nomor rekening
    formData.append("owner", paymentData.owner); // Nama pemilik rekening

    if (paymentData.logo) {
      formData.append("logo", paymentData.logo); // File logo
    }

    const response = await fetch(`${API_URL}/admin/payment-methods`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add payment method");
    }

    return { success: true, message: "Payment method added successfully" };
  } catch (error) {
    console.error("Error in addPaymentMethod:", error.message);
    return { success: false, message: error.message };
  }
}

// Fungsi untuk mengedit data rekening
export async function editPaymentMethod(paymentId, paymentData) {
  try {
    const formData = new FormData();

    // Hanya tambahkan field yang ada
    for (const key in paymentData) {
      if (
        key === "logo" &&
        (typeof paymentData[key] === "string" || !paymentData[key])
      ) {
        continue; // Jangan tambahkan jika logo adalah URL atau null
      }

      if (paymentData[key] !== null && paymentData[key] !== undefined) {
        formData.append(key, paymentData[key]);
      }
    }

    const response = await fetch(
      `${API_URL}/admin/payment-methods/${paymentId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to edit payment method");
    }

    return { success: true, message: "Payment method edited successfully" };
  } catch (error) {
    console.error("Error in editPaymentMethod:", error.message);
    return { success: false, message: error.message };
  }
}

// Fungsi untuk menghapus data rekening
export async function deletePaymentMethod(paymentId) {
  try {
    const response = await fetch(
      `${API_URL}/admin/payment-methods/${paymentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete payment method");
    }

    return { success: true, message: "Payment method deleted successfully" };
  } catch (error) {
    console.error("Error in deletePaymentMethod:", error.message);
    return { success: false, message: error.message };
  }
}

// Fungsi untuk melihat detail data rekening
export async function getPaymentMethodDetails(paymentId) {
  try {
    const response = await fetch(
      `${API_URL}/admin/payment-methods/${paymentId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Failed to fetch payment method details"
      );
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error in getPaymentMethodDetails:", error.message);
    return { success: false, message: error.message };
  }
}

// Fungsi untuk menambah voucher
export async function addVoucher(data) {
  const response = await fetch(`${API_URL}/admin/vouchers`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Gagal menambahkan voucher");
  }

  return await response.json();
}

// Fungsi untuk menghapus voucher
export async function deleteVoucher(id) {
  const response = await fetch(`${API_URL}/admin/vouchers/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Gagal menghapus voucher");
  }

  return await response.json();
}

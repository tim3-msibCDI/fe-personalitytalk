import { useState } from "react";
import { getToken } from "@/lib/auth";

export default function TerimaPembayaran({ onClose, transactionId, onReload }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleApprove = async () => {
        setIsLoading(true);
        try {
            const token = getToken();
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/psikolog/transactions/${transactionId}/approve-commission`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "69420",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to approve commission: ${response.statusText}`);
            }

            // Jika berhasil, tutup modal dan reload halaman
            onClose();
            onReload();
        } catch (error) {
            console.error("Error approving commission:", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="px-6 py-10">
            <h3 className="px-10 mb-2 text-h3 text-center font-semibold">
                Apakah Kamu sudah menerima komisi yang kami kirimkan?
            </h3>
            <div className="flex flex-row justify-center items-center gap-4 mt-7">
                <button
                    className="px-6 py-2 border border-primary text-primary text-center rounded-lg font-semibold"
                    onClick={onClose}
                    disabled={isLoading}
                >
                    Belum
                </button>
                <button
                    className="px-6 py-2 bg-primary text-white text-center rounded-lg font-semibold"
                    onClick={handleApprove}
                    disabled={isLoading}
                >
                    {isLoading ? "Mengirim..." : "Sudah"}
                </button>
            </div>
        </div>
    );
}

import Image from "next/image";
import { useState } from "react";
import { getToken } from "@/lib/auth";
import { mutate } from "swr";

export default function SubmitPsikologNotes({ onClose, notes, consul_id, onNotesUpdate }) {
    const [psikologNotes, setPsikologNotes] = useState(notes || "");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!consul_id) {
            alert("ID konsultasi tidak ditemukan!");
            return;
        }

        setIsSubmitting(true);

        try {
            const token = getToken();
            if (!token) {
                alert("Anda perlu login untuk mengakses halaman ini.");
                router.push("/login");
                return;
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/submit-notes`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "69420",
                },
                body: JSON.stringify({
                    consul_id,
                    notes: psikologNotes,
                }),
            });

            const responseData = await response.json();
            if (response.ok) {
                alert("Catatan berhasil disimpan.");
                const updatedNotes = responseData.data.psikolog_note || psikologNotes;
                setPsikologNotes(updatedNotes);

                // Panggil callback untuk memperbarui parent
                if (onNotesUpdate) {
                    onNotesUpdate(updatedNotes);
                }
            } else {
                alert(`Gagal menyimpan catatan: ${responseData.message || "Terjadi kesalahan."}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Terjadi kesalahan saat menyimpan catatan.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal-container">
            <div className="bg-primary text-whitebg px-6 py-4 rounded-t-lg flex justify-between items-center">
                <div className="flex flex-col">
                    <p className="text-m font-semibold">Tambah Catatan Psikolog</p>
                    <p className="text-s font-light">
                        Berikan catatan konsultasi kepada client.
                    </p>
                </div>
                <Image
                    src="/icons/close.png"
                    alt="Tutup"
                    width={26}
                    height={26}
                    className="cursor-pointer"
                    onClick={onClose}
                />
            </div>
            <div className="p-6">
                <textarea
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Masukkan catatan"
                    value={psikologNotes}
                    onChange={(e) => setPsikologNotes(e.target.value)}
                ></textarea>
                <div className="flex justify-end mt-2">
                    <button
                        onClick={handleSubmit}
                        className={`px-4 py-2 rounded-md ${
                            isSubmitting ? "bg-disable cursor-not-allowed" : "bg-primary text-white"
                        }`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Menyimpan..." : "Simpan"}
                    </button>
                </div>
            </div>
        </div>
    );
}

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth"; // Import getToken dari lib/auth.js

export default function Topik({ onClose }) {
    const router = useRouter();
    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    // Redirect to login if not authenticated
    useEffect(() => {
        const token = getToken(); // Mengambil token menggunakan fungsi getToken
        if (!token) {
            router.push("/login");
        }
    }, [router]);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const token = getToken(); // Ambil token dari cookies menggunakan getToken

                if (!token) throw new Error("No authentication token available");

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/consultation/psikolog/topics`,
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json",
                            "ngrok-skip-browser-warning": "69420",
                        },
                    }
                );

                if (!response.ok) throw new Error("Failed to fetch topics");

                const data = await response.json();
                if (data.success && Array.isArray(data.data)) {
                    setTopics(data.data);
                } else {
                    throw new Error("Unexpected data format");
                }
            } catch (error) {
                console.error("Error fetching topics:", error);
            } finally {
                setIsLoading(false); // Stop loading once data is fetched or error occurs
            }
        };

        fetchTopics();
    }, []);

    if (isLoading) return null; // Show loading state or empty until data is fetched

    return (
        <div className="modal-container">
            <div className="bg-primary text-whitebg p-6 rounded-t-lg">
                <h1 className="text-m font-semibold">Apa yang ingin kamu bicarakan?</h1>
                <p className="text-s font-light">Pilih salah satu topik masalah yang ingin kamu bahas:</p>
            </div>
            <div className="grid grid-cols-2 gap-4 p-6 overflow-y-auto max-h-72">
                {topics.map((topic) => (
                    <div key={topic.id} className="flex items-center space-x-2">
                        <input
                            type="radio"
                            id={topic.id}
                            name="topik"
                            value={topic.topic_name}
                            className="radio-custom"
                        />
                        <label htmlFor={topic.id} className="text-s">{topic.topic_name}</label>
                    </div>
                ))}
            </div>
            <div className="flex justify-between space-x-4 p-6">
                <button
                    className="px-20 py-2 rounded-lg text-primary border border-primary"
                    onClick={onClose}
                >
                    Batal
                </button>
                <button
                    className="bg-primary text-whitebg px-16 py-2 rounded-lg"
                    onClick={() => router.push("/konsultasi/form")}
                >
                    Pilih Topik
                </button>
            </div>
        </div>
    );
}

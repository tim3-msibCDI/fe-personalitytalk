import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";

export default function Topik({ onClose }) {
    const router = useRouter();
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(null); // State untuk menyimpan topik yang dipilih
    const [isLoading, setIsLoading] = useState(true);

    // Redirect ke login jika tidak ada token
    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.push("/login");
        }
    }, [router]);

    // Mengambil data topik dari API
    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const token = getToken();
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
                setIsLoading(false);
            }
        };

        fetchTopics();
    }, []);

    // Fungsi untuk menangani pilihan topik
    const handleSelectTopic = (topic) => {
        setSelectedTopic(topic); // Set selected topic state

        // Menyimpan ID topik yang dipilih ke localStorage
        localStorage.setItem("selectedTopic", topic.id); // Simpan topic.id
    };

    // Fungsi untuk mengarahkan ke form jika topik sudah dipilih
    const handleProceed = () => {
        if (selectedTopic) {
            // Pastikan topik sudah disimpan di localStorage sebelum mengarahkan
            router.push("/konsultasi/form");
        } else {
            alert("Silakan pilih salah satu topik sebelum melanjutkan.");
        }
    };

    if (isLoading) return null;

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
                            onChange={() => handleSelectTopic(topic)} // Memanggil handleSelectTopic untuk menyimpan ID topik
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
                    onClick={handleProceed} // Mengarahkan ke form setelah topik dipilih
                >
                    Pilih Topik
                </button>
            </div>
        </div>
    );
}

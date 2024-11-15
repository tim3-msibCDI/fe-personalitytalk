import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getToken } from "@/lib/auth";

export default function FormPilihPsikolog({ onSelectPsikolog }) {
    const router = useRouter();
    const [dataPsikolog, setDataPsikolog] = useState([]);
    const [weekDates, setWeekDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedProfessional, setSelectedProfessional] = useState("Psikolog");
    const [loading, setLoading] = useState(true);
    const [selectedTopic, setSelectedTopic] = useState(null);

    useEffect(() => {
        const storedTopic = localStorage.getItem("selectedTopic");

        if (storedTopic) {
            setSelectedTopic(storedTopic);
        } else {
            console.warn("Topik belum dipilih.");
            router.push("/konsultasi");
        }
    }, [router]);

    useEffect(() => {
        const fetchDates = async () => {
            try {
                const token = getToken();
                if (!token) {
                    router.push("/login");
                    return;
                }

                if (!selectedTopic) {
                    console.error("Topik tidak tersedia di localStorage atau tidak valid:", selectedTopic);
                    return;
                }

                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/consultation/psikolog/available`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "ngrok-skip-browser-warning": "69420",
                            "Content-Type": "application/json",
                        },
                        params: {
                            topic_id: selectedTopic,
                        },
                    }
                );

                const data = response.data;

                if (data && data.data) {
                    const formattedDates = Object.entries(data.data).map(([date, professionals]) => ({
                        dayMonth: date,
                        dayName: new Date(date).toLocaleDateString("id-ID", { weekday: 'long' }),
                        psikologData: professionals.Psikolog || [],
                        konselorData: professionals.Konselor || [],
                    }));

                    //set tanggal pertama secara otomatis
                    if (formattedDates.length > 0 && !selectedDate) {
                        setSelectedDate(formattedDates[0].dayMonth);
                    }

                    setWeekDates(formattedDates);

                } else {
                    console.warn("Format respons API tidak terduga:", data);
                }
            } catch (error) {
                console.error("Error fetching available dates:", error);
            } finally {
                setLoading(false);
            }
        };

        if (selectedTopic) {
            fetchDates();
        }
    }, [router, selectedTopic]);

    if (loading) return <div>Loading...</div>;

    // Fungsi untuk memisahkan hari dan tanggal
    const splitDate = (dateString) => {
        const [day, ...dateParts] = dateString.split(" ");
        const date = dateParts.join(" ");
        return { day, date };
    };

    // Filter data berdasarkan tanggal dan pilihan profesional
    const filteredData = weekDates
        .filter((date) => date.dayMonth === selectedDate)
        .map((date) => selectedProfessional === "Psikolog" ? date.psikologData : date.konselorData)
        .flat(); // Flat untuk menggabungkan array konselor dan psikolog yang ada

    // Pastikan onSelectPsikolog adalah fungsi yang valid
    if (typeof onSelectPsikolog !== "function") {
        console.error("onSelectPsikolog harus berupa fungsi.");
    }

    //Simpan id psikolog di localstorage
    const handleSelectPsikolog = (item) => {
        localStorage.setItem("selectedPsikologId", item.id);
        onSelectPsikolog(item);
    }

    return (
        <div className="flex justify-between gap-8 py-6">
            <div className="w-2/5">
                <h1 className="text-h3 font-semibold text-textcolor mb-2">Jenis Profesional</h1>
                <p className="text-s mb-6">Terdapat 2 Jenis profesional yang disediakan oleh PersonalityTalk</p>

                {/* Kartu Konselor */}
                <div className="bg-primarylight rounded-lg p-4 mb-6">
                    <h2 className="font-semibold text-m mb-2">Konselor</h2>
                    <hr className="mb-4 border-t-1 border-black" />
                    <ul className="list-disc list-inside text-s">
                        <li>Lulusan <b>S1 Psikologi</b> atau <b>Bimbingan Konseling</b></li>
                        <li>Memiliki <b>Sertifikat Pelatihan</b></li>
                        <li>Pendekatan terapi berbasis <b>konseling psikologi</b></li>
                        <li>Harga mulai dari <b>Rp.XXX.XXX</b></li>
                    </ul>
                </div>

                {/* Kartu Psikolog */}
                <div className="bg-primarylight rounded-lg p-4 mb-6">
                    <h2 className="font-semibold text-m mb-2">Psikolog</h2>
                    <hr className="mb-4 border-t-1 border-black" />
                    <ul className="list-disc list-inside text-s">
                        <li>Lulusan <b>Profesi Psikologi</b></li>
                        <li>Memiliki <b>Surat Ijin Praktik Psikologi</b></li>
                        <li>Mampu melakukan <b>Asesmen Psikologi</b></li>
                        <li>Pendekatan terapi dengan beragam <b>teknik psikoterapi</b></li>
                        <li>Harga mulai dari <b>Rp.XXX.XXX</b></li>
                    </ul>
                </div>
            </div>

            <div className="w-3/5">
                <div className="border bg-primarylight2 rounded-lg p-4 mb-6 shadow">
                    <div className="flex gap-4 overflow-x-scroll overflow-hidden w-full mb-5"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {Array.isArray(weekDates) && weekDates.map((date, index) => {
                            const { day, date: dateOnly } = splitDate(date.dayMonth);
                            return (
                                <div
                                    key={index}
                                    onClick={() => setSelectedDate(date.dayMonth)}
                                    className={`flex flex-col items-center justify-center rounded py-2 px-4 w-24 cursor-pointer ${selectedDate === date.dayMonth ? 'bg-primary text-white' : 'bg-primarylight text-black'}`}
                                >
                                    <p className="text-s px-2 whitespace-nowrap text-center">{dateOnly}</p>
                                    <p className="text-m font-semibold text-center">{day}</p>
                                </div>
                            );
                        })}
                    </div>
                    <h1 className="text-h font-semibold">Pilih Jenis Profesional</h1>
                    <p className="mb-6 text-s">Kamu dapat memilih Psikolog / Konselor sesuai dengan yang kamu inginkan</p>

                    {/* Tombol Psikolog dan Konselor */}
                    <div className="flex justify-between gap-4 text-h3 font-semibold mb-4">
                        <button
                            onClick={() => setSelectedProfessional("Psikolog")}
                            className={`py-2 w-full rounded 
                                ${selectedProfessional === "Psikolog" ? 'bg-primary text-white' : 'border border-primary text-primary'}`}
                        >
                            Psikolog
                        </button>
                        <button
                            onClick={() => setSelectedProfessional("Konselor")}
                            className={`py-2 w-full rounded 
                                ${selectedProfessional === "Konselor" ? 'bg-primary text-white' : 'border border-primary text-primary'}`}
                        >
                            Konselor
                        </button>
                    </div>

                    {/* Daftar Psikolog/Konselor */}
                    <div className="mt-6 max-h-[400px] overflow-y-auto pr-4">
                        {filteredData.map((item, index) => (
                            <div key={index} className="flex gap-3 mb-4 border-b border-textcolor pb-4">
                                <div className="w-24 h-24 rounded overflow-hidden">
                                    <Image
                                        src={`https://3616-114-10-44-25.ngrok-free.app/${item.photo_profile}`}
                                        alt={`Foto ${item.name}`}
                                        width={100}
                                        height={100}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-sm text-primary">
                                            {item.available_schedule_count} jadwal tersedia
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3 mt-1">
                                        <div className="flex items-center">
                                            <Image
                                                src="/icons/bintang.png"
                                                alt="Icon Star"
                                                width={18}
                                                height={18}
                                            />
                                            <span className="ml-1 text-s">4.5</span>
                                        </div>
                                        <span className="text-gray-400">|</span>
                                        <div className="flex items-center">
                                            <Image
                                                src="/icons/i-konsultasi.png"
                                                alt="Icon Konsultasi"
                                                width={18}
                                                height={18}
                                            />
                                            <p className="ml-1 text-s">{item.years_of_experience} tahun</p>
                                        </div>
                                        <span className="text-gray-400">|</span>
                                        <div className="flex items-center">
                                            <Image
                                                src="/icons/role.png"
                                                alt="Icon Role"
                                                width={18}
                                                height={18}
                                            />
                                            <p className="ml-1 text-s">{item.category}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-5">
                                            {item.topics.map((topic, index) => (
                                                <span key={index} className="text-s">{topic}</span>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => handleSelectPsikolog(item)}
                                            className="bg-primary text-white py-2 px-4 rounded"
                                        >
                                            Pilih {selectedProfessional}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

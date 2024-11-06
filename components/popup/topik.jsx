import { psikolog } from "@/constants";

function getUniqueTopics(psikologs) {
    const allTopics = psikologs.flatMap((psikolog) => psikolog.topik);
    return [...new Set(allTopics)];
}

export default function Topik({ onClose }) { // Menerima prop onClose
    const uniqueTopics = getUniqueTopics(psikolog);

    return (
        <div className="modal-container">
            <div className="bg-primary text-whitebg p-6 rounded-t-lg">
                <h1 className="text-m font-semibold">Apa yang ingin kamu bicarakan?</h1>
                <p className="text-s font-light">Pilih salah satu topik masalah yang ingin kamu bahas:</p>
            </div>
            <div className="grid grid-cols-2 gap-4 p-6 overflow-y-auto max-h-72">
                {uniqueTopics.map((topic, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <input
                            type="radio"
                            id={topic}
                            name="topik"
                            value={topic}
                            className="radio-custom"
                        />
                        <label htmlFor={topic} className="text-s">{topic}</label>
                    </div>
                ))}
            </div>
            <div className="flex justify-between space-x-4 p-6">
                <button className="px-20 py-2 rounded-lg text-primary border border-primary" onClick={onClose}>Batal</button> {/* Memanggil onClose */}
                <button className="bg-primary text-whitebg px-16 py-2 rounded-lg" onClick={() => console.log("Pilih Topik")}>Pilih Topik</button>
            </div>
        </div>
    );
}

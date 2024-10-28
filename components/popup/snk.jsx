import { snk } from "@/constants";
import Image from "next/image";

export default function SyaratKetentuan({ onClose }) {
    return (
        <div className="modal-container">
            <div className="bg-primary text-whitebg px-6 py-4 rounded-t-lg flex justify-between items-center">
                <p className="text-m font-semibold">Syarat & Ketentuan</p>
                <Image
                    src="/icons/close.png"
                    alt="Tutup"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                    onClick={onClose}
                />
            </div>
            <div className="px-6 py-3">
                <p className="text-s font-semibold mb-2">Syarat Konsultasi</p>
                <ul className="list-disc list-inside text-s font-light">
                    {snk.map((item) => (
                        <li key={item.id}>{item.desc}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

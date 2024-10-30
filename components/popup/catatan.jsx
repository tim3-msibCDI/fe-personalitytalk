import Image from "next/image";

export default function Catatan({ onClose }) {
    return (
        <div className="modal-container">
            <div className="bg-primary text-whitebg px-6 py-4 rounded-t-lg flex justify-between items-center">
                <div className="flex flex-col">
                    <p className="text-m font-semibold">Tambah Catatan</p>
                    <p className="text-s font-light">Berikan catatan keluhan kepada psikolog untuk 
                    dibaca sebelum memulai Konsultasi</p>
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
                ></textarea>
                <div className="flex justify-end mt-2">
                    <button
                        onClick={onClose}
                        className="bg-primary text-white px-4 py-2 rounded-md"
                    >
                        Tambah
                    </button>
                </div>
            </div>
        </div>
    );
}
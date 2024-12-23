import Image from "next/image";

export default function CatatanPsikolog({ onClose, notes }) {
    return (
        <div className="modal-container">
            {/* Header Modal */}
            <div className="bg-primary text-whitebg px-6 py-4 rounded-t-lg flex justify-between items-center">
                <div className="flex flex-col">
                    <p className="text-m font-semibold">Catatan Psikolog</p>
                    <p className="text-s font-light">
                        Catatan ini merupakan catatan dari psikolog
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

            {/* Body Modal */}
            <div className="p-6">
                <textarea
                    className="w-full h-48 p-3 border border-gray-300 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-primary resize-none overflow-y-auto"
                    value={notes || "Belum ada catatan dari psikolog :)"}
                    disabled={true}
                ></textarea>
            </div>
        </div>
    );
}

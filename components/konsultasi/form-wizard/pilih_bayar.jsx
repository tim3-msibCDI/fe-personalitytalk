import { useState } from "react";
import SyaratKetentuan from "@/components/popup/snk";
import Modal from "@/components/modals/modal";

export default function PilihPembayaran() {
    //State untuk modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    //State untuk mengubah warna button ketika sudah menginput
    const [inputValue, setInputValue] = useState("");
    return (
        <div>
            <div className="bg-primarylight2 rounded-lg p-4 mb-6">
                <h3 className="text-h3 font-semibold mb-4">Pembayaran</h3>
                {/* Dropdown pembayaran */}
                <div>
                    <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5">
                        <option selected>Pilih Metode Pembayaran</option>
                        <option value="BRI">Bank BRI</option>
                        <option value="BNI">Bank BNI</option>
                        <option value="BSI">Bank BSI</option>
                        <option value="Mandiri">Bank Mandiri</option>
                    </select>
                </div>
                <hr className="border-1 border-black mb-4 mt-2" />
                {/* Voucher */}
                <div>
                    <label htmlFor="voucher" className="block mb-2 text-m font-semibold text-textcolor">
                        Voucher
                    </label>
                    <div className="flex flex-1 gap-2">
                        <input
                            type="text"
                            id="voucher"
                            aria-describedby="voucher-text-explanation"
                            className="bg-gray-50 border border-gray-300 text-text2 text-s rounded-lg block w-full p-2.5"
                            placeholder="Masukkan Voucher Anda"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button
                            className={`rounded-lg text-whitebg text-s px-4 ${inputValue ? "bg-primary" : "bg-disable"}`}
                        >
                            Reedem
                        </button>
                    </div>
                </div>
                {/* Harga */}
                <div className="text-m mt-3 space-y-2">
                    <div className="flex justify-between">
                        <p>Total Harga Konsultasi</p>
                        <p><b>Rp 50.000</b></p>
                    </div>
                    <div className="flex justify-between">
                        <p>Total Diskon Voucher</p>
                        <p><b>Rp 50.000</b></p>
                    </div>
                </div>
                <hr className="border-1 border-black mb-4 mt-2" />
                <div className="text-h3 font-semibold flex justify-between">
                    <p>Total Biaya</p>
                    <p>Rp 50.000</p>
                </div>
                {/* SNK */}
                <div className="mt-4">
                    <div className="flex items-center mb-4">
                        <input
                            id="checkbox"
                            type="checkbox"
                            className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
                        />
                        <label htmlFor="checkbox" className="ml-2 text-sm font-medium text-gray-900">
                            Saya telah membaca dan menyetujui{" "}
                            <span
                                className="text-primary cursor-pointer underline"
                                onClick={openModal}
                            >
                                Syarat & Ketentuan
                            </span>
                        </label>
                    </div>
                </div>
                {/* Button bayar */}
                <button
                    className={`text-m w-full py-2 rounded-md font-semibold text-whitebg ${inputValue ? "bg-primary" : "bg-disable"}`}
                >
                    Bayar
                </button>
            </div>
            {/* Modal component */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <SyaratKetentuan onClose={closeModal} /> {/* Mengirim fungsi closeModal sebagai prop */}
            </Modal>
        </div>
    );
}
import Image from "next/image";
import Modal from "@/components/modals/modal";
import Catatan from "@/components/popup/catatan";
import { useState } from "react";

export default function Pembayaran({ statusPembayaran }) {

    const [isCatatanModalOpen, setCatatanModalOpen] = useState(false);

    const openCatatanModal = () => setCatatanModalOpen(true);
    const closeCatatanModal = () => setCatatanModalOpen(false);

    return (
        <div className="flex flex-row gap-8">
            {/* Rincian */}
            <div className="w-3/5">
                {/* Detail Pemesanan */}
                <div className="bg-primarylight2 p-4 rounded-lg h-[205px] w-full max-w-[500px] flex flex-col justify-center">
                    <p className="text-m font-semibold text-left mb-4">Detail Pemesanan</p>
                    <div className="grid grid-cols-2 gap-y-2 text-m text-textcolor">
                        <p>No. Pemesanan</p>
                        <p>: 1222332545</p>

                        <p>Metode Pembayaran</p>
                        <p>: QRIS</p>

                        {statusPembayaran === 2 && (
                            <>
                                <p>Waktu Pemesanan</p>
                                <p>: 01-10-2024 12.00</p>

                                <p>Waktu Pembayaran</p>
                                <p>: 01-10-2024 12.30</p>
                            </>
                        )}
                    </div>
                </div>
                {/* Rincian nota */}
                <div className="bg-primarylight2 justify-start p-4 rounded-lg mt-4 h-[205px] w-full max-w-[500px] flex flex-col justify-center">
                    <p className="text-m font-semibold text-left mb-4">Rincian Nota</p>
                    <div className="grid grid-cols-2 gap-y-2 text-m text-textcolor">
                        <p>Total Harga Konsultasi</p>
                        <p>: Rp 100.000</p>

                        <p>Diskon Voucher</p>
                        <p>: Rp 20.000</p>

                        <p className="font-semibold">Total Pembayaran</p>
                        <p className="font-semibold">: Rp 80.000</p>
                    </div>
                </div>
            </div>
            {/* Batas Waktu */}
            <div className="w-2/5">
                {statusPembayaran === 1 ? (
                    <>
                        <div className="bg-primary p-4 rounded-t-lg text-m text-whitebg flex justify-center">
                            <p className="font-semibold">Pembayaran</p>
                        </div>
                        <div className="bg-primarylight2 rounded-b-lg text-s text-textcolor">
                            <div className="p-4 flex flex-col items-center text-center">
                                <p>Selesaikan Pembayaran sebelum waktu habis</p>
                                <p className="font-semibold">04.00</p>
                            </div>
                        </div>
                    </>
                ) : statusPembayaran === 2 ? (
                    <>
                        <div className="flex flex-col space-y-4">
                            {/* Button tambah catatan */}
                            <button
                                onClick={openCatatanModal}
                                className="flex items-center justify-center space-x-2 p-3 border border-primary text-primary rounded-lg text-m font-semibold">
                                <Image
                                    src="/icons/catatan.png"
                                    alt="Icon Catatan"
                                    width={24}
                                    height={24}
                                />
                                <span>Tambah Catatan</span>
                            </button>
                            {/* Button Chat Psikolog */}
                            <button
                                className="flex items-center justify-center space-x-2 p-3 bg-disable text-whitebg text-m font-semibold rounded-lg hover:bg-primary"
                            >
                                <Image
                                    src="/icons/konsultasi.png"
                                    alt="Chat Psikolog Icon"
                                    width={24}
                                    height={24}
                                />
                                <span>Chat Psikolog</span>
                            </button>
                        </div>
                    </>
                ) : statusPembayaran === 3 ? (
                    <></>
                ) : null}
            </div>
            {/* Modal untuk Tambah Catatan */}
            <Modal isOpen={isCatatanModalOpen} onClose={closeCatatanModal}>
                <Catatan onClose={closeCatatanModal} />
            </Modal>
        </div>
    );
}
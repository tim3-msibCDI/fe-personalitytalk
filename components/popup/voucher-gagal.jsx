import Image from "next/image"

export default function VoucherGagal({ onClose, message }) {
    return (
        <div className="px-6 py-4">
            <div className="flex justify-end">
                <Image
                    src="/icons/close-orange.svg"
                    alt="Tutup"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                    onClick={onClose}
                />
            </div>
            <div className="flex flex-col justify-center items-center mt-10">
                <Image src="/icons/sad.png" alt="Sedih" width={100} height={100} />
                <h3 className="text-h3 mt-5 font-semibold mb-10 text-center">
                    Maaf, {message || "Terjadi kesalahan saat redeem voucher"}
                </h3>
            </div>
        </div>
    );
}

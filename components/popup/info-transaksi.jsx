import Image from "next/image";

export default function InformasiTransaksi({ onClose }) {
    return (
        <div className="px-6 py-4">
            <div className="flex justify-end">
                <Image
                    src="/icons/close-orange.svg"
                    alt="Tutup"
                    width={24}
                    height={24}
                    className="cursor-pointer"
                    onClick={onClose}
                />
            </div>
            <div className="flex flex-col justify-center items-center mt-6">
                <Image
                    src="/icons/psikolog/information.svg"
                    alt="Icon Informasi"
                    width={120}
                    height={120}
                />
                <h3 className="text-h3 font-semibold mt-5 mb-2">Komisi Belum Terkirim?</h3>
                <p className="text-s text-center mb-4 px-6">Jika komisi kamu belum terkirim, jangan khawatir! Kamu bisa langsung menghubungi tim kami dengan menyertakan 
                id-konsultasi untuk bantuan lebih lanjut.</p>
                <div className="flex gap-2 px-6 py-2 mb-6 bg-iconcheck rounded-lg">
                    <Image
                        src="/icons/psikolog/whatapps.svg"
                        alt="Icon WhatsApp"
                        width={20}
                        height={20}
                    />
                    <p className="text-success font-medium text-s">Hubungi Admin</p>
                </div>
            </div>
        </div>
    );
}
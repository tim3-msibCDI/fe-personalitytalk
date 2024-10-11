import Image from 'next/image';
import { layanan } from '@/constants';

export default function Keunggulan() {
    return (
        <section id="keunggulan" className="flex flex-col md:flex-row items-center py-12 px-6 md:px-12 gap-20">
            <div className="md:w-2/3 ml-20">
                <h2 className="text-4xl font-bold mb-4">
                    Selesaikan masalah kamu bersama PersonalityTalk
                </h2>
                <h6 className="text-lg text-gray-600 mb-6">
                    Layanan terlengkap & terpercaya seputar Konsultasi, Informasi Penyakit Mental dan Online Course psikologi.
                </h6>
                <div className="grid grid-cols-4 gap-4">
                    {layanan.map((item, index) => (
                        <a key={item.id} href={`#${item.slug}`} className="flex flex-col items-center justify-center space-y-2 p-4 border border-gray-300 rounded-lg hover:shadow-lg transition duration-300 text-center scroll-smooth">
                            <Image
                                src={item.iconkeunggulan}
                                alt={item.iconalt}
                                width={50}
                                height={50}
                            />
                            <span>{item.name}</span>
                        </a>
                    ))}
                </div>
            </div>
            <div className="flex justify-center mr-20">
                <Image
                    src="/image/Rectangle_2.png"
                    alt="Gambar Konten Kanan"
                    width={400}
                    height={400}
                    className="rounded-lg"
                />
            </div>
        </section>
    );
}

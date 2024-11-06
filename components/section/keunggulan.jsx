import Image from 'next/image';
import { layanan } from '@/constants';

export default function Keunggulan() {
    return (
        <section id="keunggulan" className="flex flex-col md:flex-row items-center py-12 px-6 md:px-12 gap-20 ml-4 lg:ml-8">
            {/* Konten Kiri */}
            <div className="md:w-2/3">
                <h1 className="text-h1 font-bold mb-4">
                    Selesaikan masalah kamu bersama PersonalityTalk
                </h1>
                <p className="text-m text-textcolor mb-6">
                    Layanan terlengkap & terpercaya seputar Konsultasi, Informasi Penyakit Mental dan Online Course psikologi.
                </p>
                <div className="grid grid-cols-4 gap-5">
                    {layanan.map((item, index) => (
                        <a key={item.id} href={`#${item.slug}`} className="flex flex-col items-center space-y-2 p-5 bg-primary border border-gray-300 rounded-lg hover:shadow-lg transition duration-300 text-center scroll-smooth">
                            <Image className="mb-3"
                                src={item.icon_white}
                                alt={item.iconalt}
                                width={50}
                                height={50}
                            />
                            <span className="flex justify-center items-center h-full text-whitebg">{item.name}</span>
                        </a>
                    ))}
                </div>
            </div>
            {/* Konten Kanan */}
            <div className="flex justify-center mr-4 lg:mr-8">
                <Image
                    src="/image/ilustrasi/1-homepage.svg"
                    alt="Icon Dokter"
                    width={640}
                    height={404}
                    className="rounded-lg"
                />
            </div>
        </section>
    );
}

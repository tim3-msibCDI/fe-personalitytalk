import Image from 'next/image';
import { layanan } from '@/constants';

export default function Keunggulan() {
    return (
        <section id="keunggulan" className="flex flex-col md:flex-row items-center py-12 px-6 md:px-12 gap-20">
            <div className="md:w-2/3 ml-20">
                <h1 className="text-h1 font-bold mb-4">
                    Selesaikan masalah kamu bersama PersonalityTalk
                </h1>
                <p className="text-m text-textcolor mb-6">
                    Layanan terlengkap & terpercaya seputar Konsultasi, Informasi Penyakit Mental dan Online Course psikologi.
                </p>
                <div className="grid grid-cols-4 gap-5">
                    {layanan.map((item, index) => (
                        <a key={item.id} href={`#${item.slug}`} className="flex flex-col items-center space-y-2 p-5 bg-primary border border-gray-300 rounded-lg hover:shadow-lg transition duration-300 text-center scroll-smooth">
                            <Image className="mb-5"
                                src={item.icons}
                                alt={item.iconalt}
                                width={50}
                                height={50}
                            />
                            <span className="text-whitebg">{item.name}</span>
                        </a>
                    ))}
                </div>
            </div>
            <div className="flex justify-center mr-20">
                <Image
                    src="/image/doctors.png"
                    alt="Icon Dokter"
                    width={403.34}
                    height={258}
                    className="rounded-lg"
                />
            </div>
        </section>
    );
}

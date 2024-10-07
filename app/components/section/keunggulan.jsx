import Image from 'next/image';

export default function Keunggulan() {
    return (
        <section className="flex flex-col md:flex-row items-center py-12 px-6 md:px-12 gap-20">
            <div className="md:w-2/3 ml-20">
                <h2 className="text-4xl font-bold mb-4">
                    Selesaikan masalah kamu bersama PersonalityTalk
                </h2>
                <h6 className="text-lg text-gray-600 mb-6">
                    Layanan terlengkap & terpercaya seputar Konsultasi, Informasi Penyakit Mental dan Online Course psikologi.
                </h6>
                <div className="grid grid-cols-4 gap-4">
                    <div className="flex flex-col items-center justify-center space-y-2 p-4 border border-gray-300 rounded-lg hover:shadow-lg transition duration-300 text-center">
                        <Image
                            src="/image/group_7.png"
                            alt="Icon 1"
                            width={50}
                            height={50}
                        />
                        <span>Konsultasi</span>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-2 p-4 border border-gray-300 rounded-lg hover:shadow-lg transition duration-300 text-center">
                        <Image
                            src="/image/group_7.png"
                            alt="Icon 2"
                            width={50}
                            height={50}
                        />
                        <span>Course</span>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-2 p-4 border border-gray-300 rounded-lg hover:shadow-lg transition duration-300 text-center">
                        <Image
                            src="/image/group_7.png"
                            alt="Icon 3"
                            width={50}
                            height={50}
                        />
                        <span>Tes Mental</span>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-2 p-4 border border-gray-300 rounded-lg hover:shadow-lg transition duration-300 text-center">
                        <Image
                            src="/image/group_7.png"
                            alt="Icon 4"
                            width={50}
                            height={50}
                        />
                        <span>Informasi Penyakit</span>
                    </div>
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

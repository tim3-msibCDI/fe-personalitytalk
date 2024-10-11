import Image from 'next/image';

export default function Alasan() {
    return(
        <section className="bg-slate-600 p-2">
            <div className="mb-8 mt-20 flex flex-col">
                <h2 className="text-3xl font-bold text-center">Kenapa Harus PersonalityTalk</h2>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-20 ml-72 w-3/5 justify-center items-center">
                    <div className="flex flex-col items-center justify-center space-y-1 p-4  rounded-lg hover:shadow-lg transition duration-300 text-center">
                        <Image className="mb-4"
                            src="/image/group_7.png"
                            alt="Icon 1"
                            width={80}
                            height={80}
                        />
                        <span>Privasi Terjamin</span>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-1 p-4 rounded-lg hover:shadow-lg transition duration-300 text-center">
                        <Image className="mb-4"
                            src="/image/group_7.png"
                            alt="Icon 2"
                            width={80}
                            height={80}
                        />
                        <span>Beragam Pilihan Topik</span>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-1 p-4 rounded-lg hover:shadow-lg transition duration-300 text-center">
                        <Image className="mb-4"
                            src="/image/group_7.png"
                            alt="Icon 3"
                            width={80}
                            height={80}
                        />
                        <span>Konsultasi Mudah
                        & Realtime</span>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-1 p-4 rounded-lg hover:shadow-lg transition duration-300 text-center">
                        <Image className="mb-4"
                            src="/image/group_7.png"
                            alt="Icon 4"
                            width={80}
                            height={80}
                        />
                        <span>Layanan Lengkap</span>
                    </div>
            </div>
        </section>
    );
}
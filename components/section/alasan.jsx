import Image from 'next/image';
<<<<<<< HEAD

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
=======
import { alasan } from '@/constants';

export default function Alasan() {
    return (
        <section className="bg-primary mb-20">
            {/* Header */}
            <div className="mb-8 mt-20 flex items-center">
                <div className="flex-grow flex justify-start">
                    <Image
                        src="/image/left.png"
                        alt="Background Left"
                        width={165}
                        height={87}
                        className="w-auto h-auto"
                    />
                </div>
                <h1 className="text-h1 font-bold self-end text-whitebg mx-2 whitespace-nowrap">Kenapa Harus PersonalityTalk</h1>
                <div className="flex-grow flex justify-end">
                    <Image
                        src="/image/right.png"
                        alt="Background Right"
                        width={165}
                        height={87}
                        className="w-auto h-auto"
                    />
                </div>
            </div>
            {/* Konten */}
            <div className="grid grid-cols-4 gap-8 ml-20 mr-20 justify-center items-center">
                {alasan.map((item, index) => (
                    <div key={item.id} className="flex flex-col items-center justify-center space-y-2 p-4 rounded-lg text-center mb-8">
                        <Image className="mb-4"
                            src={item.images}
                            alt={item.alt}
                            width={200}
                            height={200}
                        />
                        <span className="flex justify-center items-center text-whitebg text-h3 h-full">{item.name}</span>
                    </div>
                ))}
            </div>
        </section >
>>>>>>> 926c9f023eeda8154a13ecf050549d71138c07bc
    );
}
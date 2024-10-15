import Image from 'next/image';
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
    );
}
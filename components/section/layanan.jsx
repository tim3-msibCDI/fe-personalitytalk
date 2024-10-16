import { layanan } from "@/constants";
import Image from "next/image";

export default function Layanan() {
    return (
        <section id="layanan" className="flex flex-col items-center ml-20 mr-20 scroll-mt-20 mb-20">
            {/* Header */}
            <div className="text-center">
                <h2 className="font-bold text-black text-3xl">Layanan PersonalityTalk</h2>
                <p className="text-black mt-2 mb-10">Dapatkan berbagai layanan untuk mengatasi masalah yang kamu hadapi</p>
            </div>
            {/* Konten */}
            <div className="mt-8 w-full">
                {layanan.map((item, index) => (
                    <div key={item.id} id={item.slug} className="scroll-mt-28">
                        {item.id % 2 !== 0 ? (
                            <div className="flex flex-row justify-between items-center p-4 gap-16 p-10">
                                <div className="w-1/3">
                                    <Image
                                        src={item.images}
                                        alt={item.imagealt}
                                        width={1920}
                                        height={1080}
                                        className="object-contain"
                                    />
                                </div>
                                <div className="w-2/3 pl-4">
                                    <div className="flex items-center mb-2">
                                        <Image
                                            src={item.icon_orange}
                                            alt={item.iconalt}
                                            width={30}
                                            height={30}
                                        />
                                        <span className="ml-2 text-primary font-bold text-h2">{item.name}</span>
                                    </div>
                                    <div className="mb-4">
                                        {/* Render description dengan tag <b> */}
                                        <p
                                            className="text-m text-bold"
                                            dangerouslySetInnerHTML={{ __html: item.description }}
                                        />
                                    </div>
                                    <div className="inline-flex flex items-center bg-primary py-2 px-4 rounded-md cursor-pointer">
                                        <p className="text-white font-bold mr-2">{item.buttonname}</p>
                                        <Image
                                            src="/icons/arrow.png"
                                            alt="Arrow"
                                            width={15}
                                            height={15}
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-row-reverse justify-between items-center p-4 gap-16 p-10">
                                <div className="w-1/3">
                                    <Image
                                        src={item.images}
                                        alt={item.imagealt}
                                        width={1920}
                                        height={1080}
                                        className="object-contain"
                                    />
                                </div>
                                <div className="w-2/3 text-right pr-4">
                                    <div className="flex items-center justify-end mb-2">
                                        <Image
                                            src={item.icon_orange}
                                            alt={item.iconalt}
                                            width={30}
                                            height={30}
                                        />
                                        <span className="ml-2 text-primary font-bold text-h2">{item.name}</span>
                                    </div>
                                    <div className="mb-4">
                                        {/* Render description dengan tag <b> */}
                                        <p
                                            className="text-m text-bold"
                                            dangerouslySetInnerHTML={{ __html: item.description }}
                                        />
                                    </div>
                                    <div className="inline-flex flex items-center justify-end bg-primary py-2 px-4 rounded-md cursor-pointer">
                                        <p className="text-white font-bold mr-2">{item.buttonname}</p>
                                        <Image
                                            src="/icons/arrow.png"
                                            alt="Arrow"
                                            width={15}
                                            height={15}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* Border diantara layanan */}
                        {index < layanan.length - 1 && (
                            <hr className="my-8 border-t border-gray-400" />
                        )}
                    </div>
                ))}
                {/* Border setelah layanan */}
                <hr className="my-8 border-t border-gray-400" />
            </div>
        </section>
    );
}

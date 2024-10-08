import { layanan } from "@/app/constants";
import Image from "next/image";

export default function Layanan() {
    return (
        <section className="flex flex-col items-center ml-20 mr-20">
            <div className="text-center mt-20">
                <h2 className="font-bold text-black text-3xl">Layanan PersonalityTalk</h2>
                <p className="text-black mt-2 mb-10">Dapatkan berbagai layanan untuk mengatasi masalah yang kamu hadapi</p>
            </div>
            <div className="mt-8 w-full mb-20">
                {layanan.map((item, index) => (
                    <div key={item.id}>
                        {item.id % 2 !== 0 ? (
                            <div className="flex flex-row justify-between items-center p-4 gap-16">
                                <div className="w-1/3">
                                    <Image
                                        src={item.images}
                                        alt={item.imagealt}
                                        width={350}
                                        height={350}
                                        className="object-contain"
                                    />
                                </div>
                                <div className="w-2/3 pl-4">
                                    <div className="flex items-center mb-2">
                                        <Image
                                            src={item.icons}
                                            alt={item.iconalt}
                                            width={30}
                                            height={30}
                                        />
                                        <span className="ml-2 text-black font-bold text-lg">{item.name}</span>
                                    </div>
                                    <div className="mb-4">
                                        <p className="text-gray-700">{item.description}</p>
                                    </div>
                                    <div className="inline-flex flex items-center bg-slate-500 p-2 rounded-md cursor-pointer">
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
                            <div className="flex flex-row-reverse justify-between items-center p-4 gap-16">
                                <div className="w-1/3">
                                    <Image
                                        src={item.images}
                                        alt={item.imagealt}
                                        width={350}
                                        height={350}
                                        className="object-contain"
                                    />
                                </div>
                                <div className="w-2/3 text-right pr-4">
                                    <div className="flex items-center justify-end mb-2">
                                        <span className="mr-2 text-black font-bold text-lg">{item.name}</span>
                                        <Image
                                            src={item.icons}
                                            alt={item.iconalt}
                                            width={30}
                                            height={30}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <p className="text-gray-700">{item.description}</p>
                                    </div>
                                    <div className="inline-flex flex items-center justify-end bg-slate-500 p-2 rounded-md cursor-pointer">
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
                        {index < layanan.length - 1 && (
                            <hr className="my-8 border-t border-gray-400" />
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

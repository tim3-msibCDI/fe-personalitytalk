import { layanan } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export default function Layanan() {
  return (
    <section
      id="layanan"
      className="flex flex-col items-center py-12 px-6 mr-4 lg:mr-8 ml-4 lg:ml-8 scroll-mt-20"
    >
      {/* Header */}
      <div className="text-center">
        <h2 className="font-bold text-black text-3xl">
          Layanan PersonalityTalk
        </h2>
        <p className="text-black mt-2 mb-10">
          Dapatkan berbagai layanan untuk mengatasi masalah yang kamu hadapi
        </p>
      </div>
      {/* Konten */}
      <div className="w-full">
        {layanan.map((item, index) => (
          <div key={item.id} id={item.slug} className="scroll-mt-28">
            {/* Gunakan Link untuk navigasi */}
            <Link href={`/${item.slug}`}>
              <div
                className={`flex flex-row ${
                  item.id % 2 === 0 ? "flex-row-reverse" : ""
                } justify-between items-center p-4 gap-16 p-10 cursor-pointer`}
              >
                <div className="w-1/3">
                  <Image
                    src={item.images}
                    alt={item.imagealt}
                    width={1920}
                    height={1080}
                    className="object-contain"
                  />
                </div>
                <div
                  className={`${
                    item.id % 2 === 0 ? "text-right" : "text-left"
                  } w-2/3 ${item.id % 2 === 0 ? "pr-4" : "pl-4"}`}
                >
                  <div
                    className={`flex items-center mb-2 ${
                      item.id % 2 === 0 ? "justify-end" : ""
                    }`}
                  >
                    <Image
                      src={item.icon_orange}
                      alt={item.iconalt}
                      width={30}
                      height={30}
                    />
                    <span className="ml-2 text-primary font-semibold text-h2">
                      {item.name}
                    </span>
                  </div>
                  <div className="mb-4">
                    {/* Render description dengan tag <b> */}
                    <p
                      className="text-m text-bold"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </div>
                  <div
                    className={`inline-flex flex items-center ${
                      item.id % 2 === 0 ? "justify-end" : ""
                    } bg-primary py-2 px-4 rounded-md cursor-pointer`}
                  >
                    <p className="text-white text-h3 mr-2">{item.buttonname}</p>
                    <Image
                      src="/image/icons/arrow.png"
                      alt="Arrow"
                      width={15}
                      height={15}
                    />
                  </div>
                </div>
              </div>
            </Link>
            {/* Border diantara layanan */}
            {index < layanan.length - 1 && (
              <hr className="my-8 border-t border-gray-400 ml-4 lg:ml-8 mr-4 lg:mr-8" />
            )}
          </div>
        ))}
        {/* Border setelah layanan */}
        <hr className="my-8 border-t border-gray-400" />
      </div>
    </section>
  );
}

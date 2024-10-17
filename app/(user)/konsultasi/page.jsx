import ButtonPrimary from "@/components/button/buttonprimary";
import CardUnggulList from "@/components/card/cardunggullist";
import Image from "next/image";

export default function Konsultasi() {
  const ajakan =
    "Tuangkanlah Semua Masalah Kamu Melalui Konsultasi PersonalityTalk";

  return (
    <>
      <div className="px-20 py-9 flex">
        <div className="w-3/5">
          <h1 className="text-h1 font-bold text-textcolor py-4 pr-16">
            {ajakan}
          </h1>
          <div className="w-full">
            <ButtonPrimary className="flex">
              Mulai Konsultasi
              <Image
                src="/icons/arrow.png"
                alt="Arrow"
                width={15}
                height={15}
                className="ml-2"
              />
            </ButtonPrimary>
          </div>
          <div className="w-full py-4">
            <hr />
          </div>
          <div>
            <CardUnggulList />
          </div>
        </div>
        <div className="w-2/5">
          <Image
            src="/image/img-content/hero1.png"
            alt="foto"
            className="w-full h-auto"
            objectFit="contain"
            width={560}
            height={900} 
          />
        </div>
      </div>
    </>
  );
}

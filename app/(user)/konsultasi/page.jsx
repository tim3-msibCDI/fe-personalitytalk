import ButtonPrimary from "@/components/button/buttonprimary";
import Image from "next/image";

export default function Konsultasi() {
  const ajakan =
    "Luangkanlah Semua Masalah Kamu Melalui Konsultasi PersonalityTalk";

  return (
    <>
      <div>
        <h1>{ajakan}</h1>
        <ButtonPrimary className="flex">
          Mulai Konsultasi
          <Image src="/icons/arrow.png" alt="Arrow" width={15} height={15} className="ml-2"/>
        </ButtonPrimary>
      </div>
    </>
  );
}

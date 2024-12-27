import Image from "next/image";
import Link from "next/link";

export default function Footerrmhs() {
  return (
    <>
      <div className="bg-primary w-full text-whitebg relative rounded-t-2xl shadow-bottom py-6 px-20">
        <div className="flex items-center justify-between">
          <div className="absolute bottom-0 left-24">
            <Image
              src="/image/footer/img.png"
              width={160}
              height={160}
              className=""
              alt="Image"
            />
          </div>
          <div className="inline-block ml-60 mr-20">
            <h2 className="text-h2 font-semibold">
              Apakah Anda Mahasiswa Psikologi?
            </h2>
            <p className="text-m font-[300]">
              PersonalityTalk adalah solusi alternatif pembelajaran praktis
              seputar ilmu psikologi <br />dan terapannya.
            </p>
          </div>
          <div className="inline-block rounded-lg px-8 py-2 bg-whitebg text-primary text-h3 font-normal">
            <Link href="/register">Register</Link> 
          </div>
        </div>
      </div>
    </>
  );
}

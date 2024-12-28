import Image from "next/image";
import Link from "next/link";

export default function Footerrmhs() {
  return (
    <>
      <div className="bg-primary w-full text-white relative rounded-t-2xl shadow-bottom py-6 px-6 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">
          <div className="absolute lg:bottom-0 lg:left-24 mb-4 lg:mb-0">
            <Image
              src="/image/footer/img.png"
              width={160}
              height={160}
              className="mx-auto lg:mx-0 lg:grid hidden"
              alt="Image"
            />
          </div>
          <div className="text-center lg:text-left lg:ml-60 lg:mr-20">
            <h2 className="lg:text-h2 text-m font-semibold lg:text-lg">
              Apakah Anda Mahasiswa Psikologi?
            </h2>
            <p className="lg:text-m text-xs font-[300]">
              PersonalityTalk adalah solusi alternatif pembelajaran praktis
              seputar ilmu psikologi <br className="hidden lg:block" />
              dan terapannya.
            </p>
          </div>
          <div className="mt-4 lg:mt-0 inline-block rounded-lg px-8 py-2 bg-white text-primary lg:text-h3 text-s font-normal">
            <Link href="/register">Register</Link>
          </div>
        </div>
      </div>
    </>
  );
}

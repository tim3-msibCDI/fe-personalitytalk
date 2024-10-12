import Image from "next/image";

export default function Footerrmhs() {
  return (
    <>
      <div className="bg-primary w-full text-whitebg relative rounded-t-2xl shadow-bottom z-50 py-6 px-20">
        <div className="flex items-center justify-between">
          <div className="absolute bottom-0 left-24">
            <Image
              src="/image/footer/img.png"
              width={160}
              height={160}
              className=""
            />
          </div>
          <div className="inline-block ml-60 mr-20">
            <h2 className="text-h2 font-medium">
              Apakah Anda Mahasiswa Psikologi?
            </h2>
            <p className="text-m font-light">
              PersonalityTalk adalah solusi alternatif pembelajaran praktis
              seputar ilmu psikologi <br />dan terapannya.
            </p>
          </div>
          <div className=" inline-block rounded-lg px-8 py-2 bg-whitebg text-primary text-h3 font-normal">
            Register
          </div>
        </div>
      </div>
    </>
  );
}

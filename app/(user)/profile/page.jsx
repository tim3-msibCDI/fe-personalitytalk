import Image from "next/image";

const data = {
  nama: "Raka Wijaya Saleh",
  email: "raka@gmail.com",
  tanggal: "14/09/2023"
};

export default function Profile() {
  return (
    <div className="mx-20 my-9 text-textcolor ">
      <div>
        <h1 className="text-h2 font-semibold">
          Selamat datang kembali {data.nama}!
        </h1>
      </div>
      <div className="w-full mt-6">
        <div className="rounded-lg bg-primarylight w-1/4 p-9 grid justify-items-center border border-solid border-textsec">
          <Image
            src="/image/psikolog/1.png"
            width={120}
            height={120}
            className="rounded-full"
          />
          <div className="mt-2">
            <h3 className="text-h3 font-semibold">{data.nama}</h3>
            <p className="text-center text-vs font-normal">{data.email}</p>
            <p className="text-center text-vs font-normal">Gabung Sejak : {data.tanggal}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

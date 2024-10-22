import Image from "next/image";

export default function Biodata() {
  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-start self-stretch">
        <h3 className="text-h3 font-semibold">Biodata Diri</h3>
        <div className="inline-flex bg-primary text-whitebg px-6 py-2 rounded-lg flex-start">
          <Image src="/icons/pencil-white.svg" width={20} height={20} />
          Edit Biodata
        </div>
      </div>
      <div className="my-2">
        <label>Nama Lengkap</label>
      </div>
      <div>
        <input
          type="text"
          value="Nama Lengkap"
          className="border border-textcolor w-full rounded-lg p-3 "
          disabled
        />
      </div>
      <div className="my-2">
        <label>Email</label>
      </div>
      <div>
        <input
          type="text"
          value="Email"
          className="border border-textcolor w-full rounded-lg p-3 "
          disabled
        />
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="my-2">
            <label className="block">Gender</label>
          </div>
          <div>
            <input
              type="text"
              value="Laki-Laki"
              className="border border-textcolor rounded-lg p-3 w-full"
              disabled
            />
          </div>
        </div>

        <div className="flex-1">
          <div className="my-2">
            <label className="block">Tanggal Lahir</label>
          </div>
          <div>
            <input
              type="text"
              value="28 Februari 2004"
              className="border border-textcolor rounded-lg p-3 w-full"
              disabled
            />
          </div>
        </div>

        <div className="flex-1">
          <div className="my-2">
            <label className="block ">Nomor Telepon</label>
          </div>
          <div>
            <input
              type="text"
              value="+62 813742427891"
              className="border border-textcolor rounded-lg p-3 w-full"
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
}

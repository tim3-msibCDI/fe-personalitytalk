import Image from "next/image";
import Link from "next/link";

export default function Registermhs() {
  return (
    <>
      <div className="flex flex-row mt-16 mb-24 justify-center">
        <div className="mr-20 my-auto">
          <Image
            src="/image/login/rafiki.png"
            alt="Login Image"
            width={475}
            height={0}
          />
        </div>
        <div className="bg-primarylight rounded-lg w-553 pb-8">
          <div className="grid justify-center mt-7">
            <Image
              src="/image/logo.webp"
              alt="Logo"
              width={187.32}
              height={0}
            />
          </div>

          <div className="text-textcolor mt-8">
            <div className="mx-6">
              <form action="">
                <div className="">
                  <div>
                    <label className="text-m font-normal text-textcolor">
                      Nama Lengkap
                    </label>
                  </div>
                  <div>
                    <input
                      type="name"
                      placeholder="Masukan Nama Lengkap Anda"
                      id="name"
                      className="py-2 px-4 w-full rounded-lg text-s   text-textsec mt-1 font-light"
                      required
                    />
                  </div>
                </div>

                <div className="pt-5">
                  <div>
                    <label className="text-m font-normal text-textcolor">
                      Email
                    </label>
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Masukan Email Anda"
                      id="email"
                      className="py-2 px-4 w-full rounded-lg text-s   text-textsec mt-1 font-light"
                    />
                  </div>
                </div>

                <div className="pt-5">
                  <div>
                    <label className="text-m font-normal text-textcolor">
                      Password
                    </label>
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Masukan Password Anda"
                      id="password"
                      className="py-2 px-4 w-full rounded-lg text-s   text-textsec mt-1 font-light"
                    />
                  </div>
                </div>

                <div className="pt-5">
                  <div>
                    <label className="text-m font-normal text-textcolor">
                      Confirm Password
                    </label>
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Ulangi Password Anda"
                      id="password"
                      className="py-2 px-4 w-full rounded-lg text-s   text-textsec mt-1 font-light"
                    />
                  </div>
                </div>

                <div className="pt-5">
                  <div>
                    <label className="text-m font-normal text-textcolor">
                      Nomor Telepon
                    </label>
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Masukan nomor telepon anda"
                      id="no_telp"
                      className="py-2 px-4 w-full rounded-lg text-s   text-textsec mt-1 font-light"
                    />
                  </div>
                </div>

                <div className="pt-5 flex w-full">
                  <div className="w-1/2">
                    <div>
                      <label className="text-m font-normal text-textcolor">
                        Tanggal Lahir
                      </label>
                    </div>
                    <div>
                      <input
                        type="date"
                        placeholder="Masukan nomor telepon anda"
                        id="no_telp"
                        className="py-2 px-4 w-full rounded-lg text-s text-textsec mt-1 font-light"
                      />
                    </div>
                  </div>

                  <div className="ml-4 w-1/2">
                    <div>
                      <label className="text-m font-normal text-textcolor">
                        Jenis Kelamin
                      </label>
                    </div>
                    <div>
                      <select className="py-2 px-4 w-full rounded-lg text-s text-textsec mt-1 font-light">
                        <option>Jenis Kelamin Anda</option>
                        <option>Laki-laki</option>
                        <option>Perempuan</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-5 flex w-full">
                  <div className="w-1/2">
                    <div>
                      <label className="text-m font-normal text-textcolor">
                        NIM
                      </label>
                    </div>
                    <div>
                      <input
                        type="number"
                        placeholder="Masukan NIM anda"
                        id="no_telp"
                        className="py-2 px-4 w-full rounded-lg text-s text-textsec mt-1 font-light"
                      />
                    </div>
                  </div>

                  <div className="ml-4 w-1/2">
                    <div>
                      <label className="text-m font-normal text-textcolor">
                        Prodi
                      </label>
                    </div>
                    <div>
                      <select className="py-2 px-4 w-full rounded-lg text-s text-textsec mt-1 font-light">
                        <option>Prodi</option>
                        <option>Kedokteran</option>
                        <option>Kedokteran Jiwa</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-5 flex">
                  <div className="my-auto mr-4">
                    <input
                      type="checkbox"
                      id="sdk"
                      name="sdk"
                      value="sdk"
                      className="w-5 h-5 border-2 border-primary bg-primary text-primary"
                    />
                  </div>
                  <div>
                    <label for="sdk" className="text-m font-light underline decoration-solid">
                      <Link href="#">
                        Dengan ini, Saya telah membaca dan menyetujui Syarat dan
                        Ketentuan yang berlaku.
                      </Link>
                    </label>
                  </div>
                </div>

                <button className="bg-primary text-whitebg text-s w-full py-2 px-4 mt-8 rounded-lg">
                  Daftar
                </button>
                <button className="flex items-center px-4 py-2 bg-whitebg text-textcolor rounded-lg w-full justify-center text-s mt-3.5">
                  <Image
                    src="/image/icons/google.svg"
                    alt="Google Logo"
                    width={0}
                    height={30}
                    className="w-6 h-6 mr-2"
                  />
                  Lanjutkan dengan Akun Google
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import Image from "next/image";

export default function Register() {
  return (
    <>
      <div className="flex flex-row mt-16 mb-24 justify-center">
        <div className="mr-20">
          <Image
            src="/image/login/rafiki.png"
            alt="Login Image"
            width={475}
            height={0}
          />
        </div>
        <div className="bg-primarylight rounded-lg size-553">
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
                      Email
                    </label>
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Masukan Email Anda"
                      id="email"
                      className="py-2 px-4 w-full rounded-lg text-s tracking- text-textsec mt-1 font-light"
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
                      className="py-2 px-4 w-full rounded-lg text-s tracking- text-textsec mt-1 font-light"
                    />
                  </div>
                </div>
                <div className="text-fail text-s font-light p-1">
                  <p className="text-right">lupa kata sandi?</p>
                </div>
                <button className="bg-primary text-whitebg text-s w-full py-2 px-4 mt-8 rounded-lg">
                  Login
                </button>
                <button className="flex items-center px-4 py-2 bg-whitebg text-textcolor rounded-lg w-full justify-center text-s mt-3.5">
                  <Image
                    src="/image/icons/google.svg"
                    alt="Google Logo" width={0} height={30}
                    className="w-6 h-6 mr-2"
                  />
                  Lanjutkan dengan Akun Google
                </button>
              </form>

              <div className="flex flex-row justify-center mt-7 ">
                <div className="text-textcolor mr-5 py-2 ">
                  Belum punya akun?
                </div>
                <button className="rounded-lg px-4 py-2 text-s font-medium bg-whitebg border border-primary text-primary">
                  Daftar Disini
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import Image from "next/image";

export default function Login() {
  return (
    <>
      <div className="flex flex-row mt-16">
        <div className="ml-20 mr-20">
          <Image
            src="/image/login/rafiki.png"
            alt="Login Image"
            width={475}
            height={0}
          />
        </div>
        <div className="bg-primarylight rounded-lg size-553">
          <div className="grid justify-center mt-7">
            <Image src="/image/logo.webp" alt="Logo" width={187.32} height={0} />
          </div>
          <div className="text-h1 font-semibold text-center mt-5">Selamat Datang</div>

          <div className="mt-7 text-textcolor">
            <form action="">
              <div>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Masukan Email Anda"
                  id="email"
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Masukan Password Anda"
                  id="password"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

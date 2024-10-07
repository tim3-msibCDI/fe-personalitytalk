import Image from "next/image";

export default function Login() {
  return (
    <>
      <div>
        <Image
          src="/image/login/rafiki.png"
          alt="Login Image"
          width={475}
          height={0}
        />
      </div>
      <div>
        <div>
          <Image src="/image/logo.webp" alt="Logo" height={70} width={0} />
          <div>Selamat Datang</div>
        </div>
        <div>
          <form action="">
            <div>
              <label>Email</label>
              <input type="email" placeholder="Masukan Email Anda" id="email"/>
            </div>
            <div>
              <label>Password</label>
              <input type="password" placeholder="Masukan Password Anda" id="password"/>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

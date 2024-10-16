import Image from "next/image";
import RegisterForm from "@/components/form/registerform";

export default function Register() {
  return (
    <>
      <div className="flex flex-row pt-16 pb-24 justify-center bg-whitebg">
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

          <div className="mt-8 mx-6">
            <RegisterForm />
          </div>
        </div>
      </div>
    </>
  );
}

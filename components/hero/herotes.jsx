import Image from "next/image";

export default function Herotes() {
  return (
    <div
      className="bg-primary flex items-center bg-cover bg-center"
      style={{ backgroundImage: "url('/image/bg_tes.svg')" }}
    >
      <div className="mx-20 flex">
        <div className="w-1/2 flex justify-center p-14">
          <Image src="/image/ilustrasi/tes.png" width={314} height={308} alt="Ilustrasi Tes" />
        </div>
        <div className="w-1/2 flex flex-col justify-center items-center text-center p-8 rounded-lg text-whitebg">
          <h1 className="text-h1 font-semibold mb-8">
            Tes Mental
          </h1>
          <p>
            Tes ini dirancang untuk membantu kamu mengenali aspek-aspek penting
            dari kesehatan mentalmu, sehingga kamu bisa lebih memahami dirimu
            sendiri dan mengambil langkah yang tepat menuju kesejahteraan
            emosional. Jangan lewatkan kesempatan untuk lebih mengenal dirimu
            melalui asesmen ini tanpa biaya.
          </p>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";

export default function Herotes() {
  return (
    <>
      <div className="mx-20 my-8 flex">
        <div className="w-1/2 flex justify-center p-14">
          <Image src="/image/ilustrasi/tes.png" width={448} height={440} />
        </div>
        <div className="w-1/2 flex flex-col justify-center items-center text-center">
          <h1 className="text-h1 font-semibold text-primary mb-8">
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
    </>
  );
}

import Cardtes from "./cardtes";

const cardData = [
  {
    imageSrc: "/image/ilustrasi/tesimg.png",
    title: "Personality",
    description:
      "Tes kepribadian (personality test) adalah alat atau metode yang digunakan untuk mengukur dan menilai aspek-aspek kepribadian seseorang.",
    buttonText: "Mulai Tes",
  },
  {
    imageSrc: "/image/ilustrasi/tesimg.png",
    title: "Personality",
    description:
      "Tes kepribadian (personality test) adalah alat atau metode yang digunakan untuk mengukur dan menilai aspek-aspek kepribadian seseorang.",
    buttonText: "Mulai Tes",
  },
  {
    imageSrc: "/image/ilustrasi/tesimg.png",
    title: "Personality",
    description:
      "Tes kepribadian (personality test) adalah alat atau metode yang digunakan untuk mengukur dan menilai aspek-aspek kepribadian seseorang.",
    buttonText: "Mulai Tes",
  },
  {
    imageSrc: "/image/ilustrasi/tesimg.png",
    title: "Personality",
    description:
      "Tes kepribadian (personality test) adalah alat atau metode yang digunakan untuk mengukur dan menilai aspek-aspek kepribadian seseorang.",
    buttonText: "Mulai Tes",
  },
];

export default function Cardteslist() {
  return (
    <div>
      <div className="flex flex-col justify-center items-center text-textcolor mt-6">
        <h1 className="text-h1 font-semibold text-center">
          Pilihan Tes Mental
        </h1>
        <p className="text-m text-center">Pahami Kondisi Mentalmu, Ambil Kendali</p>
      </div>
      <div className="mx-20 my-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardData.map((card, index) => (
            <Cardtes
              key={index}
              imageSrc={card.imageSrc}
              title={card.title}
              description={card.description}
              buttonText={card.buttonText}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

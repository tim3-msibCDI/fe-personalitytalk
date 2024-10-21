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
      <div className="flex my-8">
        <div className="bg-primary flex flex-col justify-center items-center h-24 rounded-r-full px-20">
          <h1 className="text-white text-h1 font-semibold text-center">
            Pilihlah Tes Mental Yang Ingin Kamu Ketahui
          </h1>
        </div>
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

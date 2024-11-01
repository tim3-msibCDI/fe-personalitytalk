import Image from "next/image";

const CardCourse = ({ name, description, rating, price, imageUrl }) => {
  return (
    <div className="rounded-md shadow-xl w-fit">
      <Image
        src={imageUrl}
        alt={name}
        width={330}
        height={330}
        className="rounded-t-md"
      />
      <div className="w-72 p-7">
        <h3 className="text-h3 font-semibold mb-2">{name}</h3>
        <p className="overflow-hidden h-36 line-clamp-6">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <Image
              src="/icons/star-black.svg"
              alt="Star"
              width={15}
              height={15}
            />
            <p className="ml-1">{rating}</p>
          </div>
          <p className="font-semibold">{price}</p>
        </div>
      </div>
      <div className="mx-7 pb-5">
        <button className="rounded-lg bg-primary text-white text-h3 font-semibold py-2 px-6 w-full">
          Daftar
        </button>
      </div>
    </div>
  );
};

export default CardCourse;

import Image from "next/image";
import Link from "next/link";

const CourseSummary = ({ imageUrl, name, description, rating, price, id }) => {
  return (
    <div className="flex gap-[20px] mt-6 p-4">
      {/* Image Section */}
      <div className="w-[252px]">
        <Image
          src={imageUrl}
          alt="course image"
          width={252}
          height={252}
          className="rounded-lg"
        />
      </div>

      {/* Course Details Section */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h1 className="text-h2 font-bold">{name}</h1>
          <p className="py-3">{description}</p>
          <div className="flex items-center">
            <Image
              src="/icons/star-black.svg"
              alt="Star"
              width={15}
              height={15}
            />
            <p className="ml-2 text-h3">{rating}/5.0</p>
          </div>
        </div>

        {/* Price and Button Section */}
        <div className="w-full flex flex-col items-end mt-4">
          <p className="text-h2">
            {Number(price).toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </p>
          <Link
            href={`/course/${id}/payment?id=${id}`}
            className="rounded-lg bg-primary text-white text-h3 font-medium py-2 px-6 mt-2"
          >
            + Ikuti Kelas
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseSummary;

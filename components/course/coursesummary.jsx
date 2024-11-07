import Image from "next/image";

const CourseSummary = ({ imageUrl, name, description, rating }) => {
  return (
    <div className="flex gap-[20px] mt-6 p-4">
      <div className="w-[252px]">
        <Image
          src={imageUrl}
          alt="course image"
          width={252}
          height={252}
          className="rounded-lg"
        />
      </div>
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
      </div>
    </div>
  );
};

export default CourseSummary;

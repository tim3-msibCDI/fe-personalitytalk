import Image from "next/image";

const CourseBox = ({ id, name, description, rating, price, imageUrl }) => {
  return (
    <div className="w-full max-w-[912px] h-[332px] p-6 bg-neutral-50 rounded-lg border-4 border-primary flex gap-6 items-center">
      <div>
        <Image
          className="rounded-lg p-6"
          src={imageUrl}
          alt={name}
          width={300}
          height={300}
        />
      </div>

      {/* Right section with fixed width */}
      <div className="flex flex-col gap-4 w-[500px]">
        {/* Badge Icon */}
        <div className="flex justify-end items-center w-full">
          <Image
            src="/icons/favorite-course.svg"
            width={72}
            height={72}
            alt="favorite icon"
            className="origin-top-left rotate-[-23deg]"
          />
        </div>

        {/* Course Title */}
        <h2 className="text-primary text-2xl font-bold text-center truncate">
          {name}
        </h2>

        {/* Course Description */}
        <p className="text-[#242424] text-base text-center overflow-hidden h-12 line-clamp-2">
          {description}
        </p>

        {/* Button */}
        <div className="flex justify-center">
          <button className="bg-primary text-neutral-50 text-lg font-semibold px-6 py-2 rounded-lg">
            Lihat Kelas
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseBox;

import Image from "next/image";

export default function Cardpsikologi({ name, image, title, tags }) {
  return (
    <div className="bg-whitebg rounded-lg p-4 shadow-lg flex flex-col items-center justify-center text-center">
      <div className="w-24 h-24 rounded-full overflow-hidden">
        <Image src={image} width={100} height={100} className="w-full h-full object-cover" alt="Image" />
      </div>
      <div className="mt-4">
        <h3 className="sm:text-h3 text-s font-semibold mt-2">{name}</h3>
        <p className="sm:text-m text-xs text-textcolor">{title}</p>
      </div>
      <div className=" mt-2 flex flex-wrap justify-center">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-primary text-whitebg sm:text-s text-vs font-medium mr-2 px-2.5 py-0.5 my-0.5 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

import Image from "next/image";

export default function Cardpsikologi({ name, image, title, tags }) {
  return (
    <div className="bg-whitebg rounded-lg p-4 shadow-md flex flex-col items-center justify-center text-center">
      <Image src={image} width={100} height={100} className="rounded-full mt-6" alt="Image" />
      <div className="mt-4">
        <h3 className="text-h3 font-medium mt-2">{name}</h3>
        <p className="text-m text-textcolor">{title}</p>
      </div>
      <div className=" mt-2 flex flex-wrap justify-center">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-primary text-whitebg text-s font-medium mr-2 px-2.5 py-0.5 my-0.5 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

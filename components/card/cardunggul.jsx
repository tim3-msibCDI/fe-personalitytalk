import Image from "next/image";

export default function CardUnggul({ path, text }) {
  return (
    <div className="flex items-center space-x-3 p-2 bg-primarylight rounded-lg shadow-top mt-4 mr-2">
      <div className="bg-primary p-1 rounded-lg">
        <Image
          src={path}
          alt="Icon"
          width={58}
          height={52}
          className="object-contain"
        />
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-800">{text}</p>
      </div>
    </div>
  );
}

import Image from "next/image";

export default function CardUnggul({path, text}) {
  return (
    <>
      <div className="rounded-lg px-2 py-4 inline-flex h-24 w-45 bg-primarylight mt-4 space-x-3 shadow-top mr-2">
        <div className="bg-primary p-1 rounded-lg">
        <Image
          src={path}
          alt="Icon"
          width={64}
          height={64}
        />
        </div>
        <div className="py-auto">
            <p>{text}</p>
        </div>
      </div>
    </>
  );
}

import Link from "next/link";

export default function Cardtes({ id, imageSrc, title, description, buttonText, arrowSrc }) {
  return (
    <div className="shadow-md rounded-lg overflow-hidden text-center p-4 w-full">
      <div className="w-full aspect-video overflow-hidden">
        <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="px-4 py-2 flex flex-col items-center">
        <h2 className="text-h2 font-bold mb-2 text-center">{title}</h2>
        <p className="text-m text-color text-justify mb-4 h-26 overflow-hidden text-ellipsis" title={description}>{description}</p>
        <Link href={`/tes-mental/${encodeURIComponent(title.replace(/\s+/g, '-').toLowerCase())}`}>
          <button className="bg-primary text-white font-bold py-2 px-4 rounded flex items-center justify-center">
            {buttonText}
            <img src={arrowSrc} alt="Arrow Right" className="ml-2" />
          </button>
        </Link>
      </div>
    </div>
  );
}

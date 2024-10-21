export default function Cardtes({ imageSrc, title, description, buttonText }) {
  return (
    <div className="shadow-md rounded-lg overflow-hidden text-center p-4">
      <img src={imageSrc} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">[ {title} ]</h2>
        <p className="text-color mb-4">{description}</p>
        <button className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded">
          {buttonText}
        </button>
      </div>
    </div>
  );
}

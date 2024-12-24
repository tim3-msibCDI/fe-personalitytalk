import Image from "next/image";
// components/AddButton.jsx
export default function CategoryButton({ onClick, text = "Tambah Data" }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 text-white bg-primary rounded-lg flex items-center space-x-2 hover:bg-primarydark"
    >
      <Image
        src="/icons/dashboard/kategori.svg"
        alt="Tambah"
        width={16}
        height={16}
      />
      <span>{text}</span>
    </button>
  );
}

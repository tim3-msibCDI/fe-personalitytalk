// components/AddButton.jsx
export default function AddButton({ onClick, text = "Tambah Data" }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 text-white bg-primary rounded-lg flex items-center space-x-2 hover:bg-primarydark"
    >
      <img
        src="/icons/dashboard/add-data.svg"
        alt="Tambah"
        className="w-4 h-4"
      />
      <span>{text}</span>
    </button>
  );
}

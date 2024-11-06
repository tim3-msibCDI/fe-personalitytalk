export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null; // Modal tidak ditampilkan jika isOpen false

  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[480px] h-auto max-h-[90vh] overflow-y-auto">
              {children} {/* Konten modal akan di sini */}
          </div>
      </div>
  );
}

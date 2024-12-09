import { useEffect, useState } from "react";

export default function Modal({ isOpen, onClose, children }) {
  const [isVisible, setIsVisible] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setAnimationClass("zoom-fade-in"); // Animasi masuk
    } else {
      setAnimationClass("zoom-fade-out"); // Animasi keluar
      const timer = setTimeout(() => setIsVisible(false), 300); // Timer untuk menyembunyikan modal
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-lg shadow-lg lg:w-[480px] w-96 h-auto max-h-[90vh] overflow-y-auto ${animationClass}`}
        onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat diklik di dalam
      >
        {children}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';

export default function Modal({ isOpen, onClose, children }) {
  const [isVisible, setIsVisible] = useState(false);
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setAnimationClass('zoom-fade-in'); // Tambahkan animasi masuk
    } else {
      setAnimationClass('zoom-fade-out'); // Tambahkan animasi keluar
      const timer = setTimeout(() => setIsVisible(false), 300); // Sembunyikan setelah animasi keluar selesai
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        className={`bg-white rounded-lg shadow-lg lg:w-[480px] w-96 h-auto max-h-[90vh] overflow-y-auto ${animationClass}`}
      >
        {children}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";

const SearchBar = ({ value, onChange, placeholder }) => {
  const [internalValue, setInternalValue] = useState(value);

  // Debounce perubahan input
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(internalValue);
    }, 500); // 500ms delay untuk debounce

    return () => clearTimeout(timer); // Bersihkan timer jika komponen di-unmount atau input berubah
  }, [internalValue, onChange]);

  return (
    <div className="flex items-center w-full p-2 border border-gray-300 rounded-lg bg-white shadow-sm">
      <img
        src="/icons/dashboard/search.svg"
        alt="Search Icon"
        className="w-5 h-5 ml-2 text-gray-500"
      />
      <input
        type="text"
        placeholder={placeholder}
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        className="w-full pl-3 border-none focus:outline-none focus:ring-0"
      />
    </div>
  );
};

export default SearchBar;

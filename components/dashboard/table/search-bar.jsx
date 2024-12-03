import React from "react";

const SearchBar = ({ value, onChange, placeholder }) => {
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-3 border-none focus:outline-none focus:ring-0"
      />
    </div>
  );
};

export default SearchBar;

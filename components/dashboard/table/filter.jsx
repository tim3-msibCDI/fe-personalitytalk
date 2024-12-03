import React from "react";

const Filter = ({ options, selectedOption, onChange }) => {
  return (
    <div className="relative w-72 p-2 border border-textcolor rounded-lg bg-white shadow-sm">
      <img
        src="/icons/dashboard/filter.svg" // Ganti dengan path ikon filter Anda
        alt="Filter Icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
      />
      <select
        value={selectedOption}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 border-none focus:outline-none focus:ring-0 appearance-none"
      >
        <option value="">Filter</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;

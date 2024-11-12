import { useState, useEffect } from "react";

export default function ModuleList() {
  const modules = [
    "Pendahuluan",
    "Nama Modul 1",
    "Nama Modul 2",
    "Nama Modul 3",
    "Nama Modul 4",
    "Nama Modul 5",
    "Nama Modul 6",
    "Nama Modul 7",
  ]; // Replace with actual module names if available

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    // Handle keydown events for arrow up and arrow down
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp") {
        setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : modules.length - 1));
      } else if (event.key === "ArrowDown") {
        setSelectedIndex((prevIndex) => (prevIndex < modules.length - 1 ? prevIndex + 1 : 0));
      }
    };

    // Attach event listener
    window.addEventListener("keydown", handleKeyDown);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modules.length]);

  return (
    <div className="space-y-2">
      {modules.map((module, index) => (
        <div
          key={index}
          className={`p-6 cursor-pointer rounded-md space-y-4 border border-text2 ${
            index === selectedIndex
              ? "bg-primarylight text-textcolor font-semibold"
              : "bg-orange-100"
          }`}
        >
          {module}
        </div>
      ))}
    </div>
  );
}

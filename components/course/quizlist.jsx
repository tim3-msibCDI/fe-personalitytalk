import { useState, useEffect } from "react";

export default function QuizList() {
  const quizzes = [
    "Quiz 1",
    "Quiz 2",
    "Quiz 3"
  ]; 

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    // Handle keydown events for arrow up and arrow down
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp") {
        setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : quizzes.length - 1));
      } else if (event.key === "ArrowDown") {
        setSelectedIndex((prevIndex) => (prevIndex < quizzes.length - 1 ? prevIndex + 1 : 0));
      }
    };

    // Attach event listener
    window.addEventListener("keydown", handleKeyDown);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [quizzes.length]);

  return (
    <div className="space-y-2">
      {quizzes.map((quiz, index) => (
        <div
          key={index}
          className={`p-6 cursor-pointer rounded-md space-y-4 border border-text2 ${
            index === selectedIndex
              ? "bg-primarylight text-textcolor font-semibold"
              : "bg-orange-100"
          }`}
        >
          {quiz}
        </div>
      ))}
    </div>
  );
}

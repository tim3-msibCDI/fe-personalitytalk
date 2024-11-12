"use client";
import { useState } from "react";
import ModuleList from "./modulelist";
import QuizList from "./quizlist"; 

const CourseClass = () => {
  const [activeTab, setActiveTab] = useState("module"); // State for the active tab

  return (
    <div className="w-full p-4 bg-primarylight2 rounded-lg shadow-md border border-text2">
      <div className="w-full flex flex-col mb-4">
        <ul className="flex space-x-4">
          <li
            className={`py-2 px-6 cursor-pointer text-white rounded-lg ${
              activeTab === "module" ? "bg-primary font-semibold" : "bg-disable"
            }`}
            onClick={() => setActiveTab("module")}
          >
            Modul
          </li>
          <li
            className={`py-2 px-6 cursor-pointer text-white rounded-lg ${
              activeTab === "quiz" ? "bg-primary font-semibold" : "bg-disable"
            }`}
            onClick={() => setActiveTab("quiz")}
          >
            Quiz
          </li>
          <li
            className={`py-2 px-6 cursor-pointer text-white rounded-lg ${
              activeTab === "certificate" ? "bg-primary font-semibold" : "bg-disable"
            }`}
            onClick={() => setActiveTab("certificate")}
          >
            Sertifikat
          </li>
        </ul>
      </div>
      
      <div className={`max-h-[26rem] overflow-y-auto ${activeTab === "module" ? "" : "hidden"}`}>
        <ModuleList /> 
      </div>
      
      {activeTab === "quiz" && (
        <div className="max-h-[26rem] overflow-y-auto">
          <QuizList /> {/* Render the quiz list when "Quiz" is active */}
        </div>
      )}
      
      {activeTab === "certificate" && (
        <div className="bg-gray-200 p-4 rounded-lg mt-4">
          {/* Content for Certificate Tab */}
          <p>Certificate content will appear here.</p>
        </div>
      )}
    </div>
  );
};

export default CourseClass;

import React from "react";
import CourseBox from "./coursebox";

const CourseList = ({ courses }) => {
  return (
    <div className="w-full overscroll-none overflow-x-scroll scrollbar-hidden py-4">
      <div className="flex space-x-6">
        {courses.map((course) => (
          <div key={course.id} className="flex-shrink-0">
            <CourseBox {...course} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;

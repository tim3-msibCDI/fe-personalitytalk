import React from "react";
import CourseBox from "./CourseBox";

const CourseList = () => {
  const courses = [
    {
      id: 1,
      name: "Introduction to Psychology",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at sapien a odio gravida lobortis. Proin venenatis, sem a gravida tristique, leo erat tristique.",
      imageSrc: "/image/psikolog/1.png",
    },
    {
      id: 2,
      name: "Advanced Counseling Skills",
      description:
        "Profiling calon karyawan dilakukan untuk mengungkap karakter asli, nilai-nilai, cara berpikir, tipe kepemimpinan, sikap kerja dalam tim, serta mengukur intelegensi, dan psikogram psikologi.",
      imageSrc: "/image/psikolog/2.png",
    },
    {
      id: 3,
      name: "Mindfulness Techniques",
      description: "Learn techniques for managing stress and anxiety.",
      imageSrc: "/image/psikolog/3.png",
    },
    {
      id: 4,
      name: "Cognitive Behavioral Therapy",
      description: "Introduction to CBT principles and applications.",
      imageSrc: "/image/psikolog/4.png",
    },
    // Tambahkan kursus lain sesuai kebutuhan
  ];

  return (
    <div className="w-full overscroll-none overflow-x-scroll scrollbar-hidden py-4">
      <div className="flex space-x-6">
        {courses.map((course) => (
          <div className="flex-shrink-0">
            <CourseBox key={course.id} course={course} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;

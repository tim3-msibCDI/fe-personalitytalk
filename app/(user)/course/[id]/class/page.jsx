"use client"

import CourseSummary from "@/components/course/coursesummary";
import CourseDetails from "@/components/course/coursedetails";
import { coursesData } from "@/constants";
import Image from "next/image";
import CourseClass from "@/components/course/courseclass";
import Link from "next/link";

export default function DetailCoursePage({ params }) {
  const course = coursesData.find(
    (course) => course.id.toString() === params.id
  );

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="py-9 px-20">
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-4"
      >
        <Image
          src="/icons/arrow_back.png"
          alt="icon kembali"
          width={9}
          height={14}
        />
        <p className="text-m font-bold">Kembali</p>
      </button>

      {/* Course Summary Section */}
      <CourseSummary
        imageUrl={course.imageUrl}
        name={course.name}
        description={course.description}
        rating={course.rating}
        price={course.price}
        showPrice={false} // Pass false to hide price
      >
      </CourseSummary>

      {/* Divider */}
      <div className="py-9">
        <hr className="border-t-1 border-text2" />
      </div>

      {/* Course Class*/}
      <CourseClass />
    </div>
  );
}

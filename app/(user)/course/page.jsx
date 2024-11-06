// DetailCoursePage.js

import { coursesData } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import CourseSummary from "@/components/course/coursesummary";
import CourseDetails from "@/components/course/coursedetails";

export async function generateStaticParams() {
  return coursesData.map((course) => ({
    id: course.id.toString(),
  }));
}

export default async function DetailCoursePage({ params }) {
  const course = coursesData.find(
    (course) => course.id.toString() === params.id
  );

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="py-9 px-20">
      <Link href="/course" className="flex items-center gap-4">
        <Image
          src="/icons/arrow_back.png"
          alt="icon kembali"
          width={9}
          height={14}
        />
        <p className="text-m font-bold">Kembali</p>
      </Link>

      {/* Course Summary Section */}
      <CourseSummary
        imageUrl={course.imageUrl}
        name={course.name}
        description={course.description}
        rating={course.rating}
      />

      {/* Price and Enroll Button */}
      <div className="w-full flex flex-col items-end mt-4">
        <p className="text-h2">
          Rp. {Number(course.price).toLocaleString("id-ID")}
        </p>
        <Link
          href={`/course/${course.id}/payment?id=${course.id}`}
          className="rounded-lg bg-primary text-white text-h3 font-medium py-2 px-6 mt-2"
        >
          + Ikuti Kelas
        </Link>
      </div>

      {/* Divider */}
      <div className="py-9">
        <hr className="border-t-1 border-text2" />
      </div>

      {/* Course Details Section */}
      <CourseDetails />
    </div>
  );
}

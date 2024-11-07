import { coursesData } from "@/constants";
import Image from "next/image";
import Link from "next/link";

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
      <div className="flex gap-[20px] mt-6 p-4">
        {/* Fixed width for image container */}
        <div className="w-[252px]">
          <Image
            src={course.imageUrl}
            alt="course image"
            width={252}
            height={252}
            className="rounded-lg"
          />
        </div>

        {/* Flexible width for details container */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-h2 font-bold">{course.name}</h1>
            <p className="py-3">{course.description}</p>
            <div className="flex items-center">
              <Image
                src="/icons/star-black.svg"
                alt="Star"
                width={15}
                height={15}
              />
              <p className="ml-2 text-h3">{course.rating}/5.0</p>
            </div>
          </div>

          <div className="w-full flex flex-col items-end">
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
        </div>
      </div>

      <div className="py-9">
        <hr className="border-t-1 border-text2" />
      </div>
      <div className="rounded-lg bg-primarylight2 border border-text2 p-6">
        <div className="mb-9">
          <h3 className="text-m font-semibold mb-5">Informasi</h3>
          <p className="pl-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at
            sapien a odio gravida lobortis. Proin venenatis, sem a gravida
            tristique, leo erat tristique.
          </p>
        </div>
        <div className="mb-9">
          <h3 className="text-m font-semibold mb-5">Target Pembalajaran</h3>
          <ul className="pl-6">
            <li>Menguasai diri.</li>
            <li>Menguasai audiens.</li>
            <li>Menguasai materi.</li>
          </ul>
        </div>
        <div className="mb-9">
          <h3 className="text-m font-semibold mb-5">Penilaian</h3>
          <p className="pl-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at
            sapien a odio gravida lobortis. Proin venenatis, sem a gravida
            tristique, leo erat tristique.
          </p>
        </div>
        <div className="mb-9">
          <h3 className="text-m font-semibold mb-5">Syarat dan Ketentuan</h3>
          <p className="pl-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at
            sapien a odio gravida lobortis. Proin venenatis, sem a gravida
            tristique, leo erat tristique.
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { coursesData } from "@/constants";
import Loading from "@/components/loading/loading";

export default function PaymentDetail() {
  const [course, setCourse] = useState(null);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const paymentData = JSON.parse(localStorage.getItem("paymentData"));

    if (paymentData) {
      const foundCourse = coursesData.find(
        (course) => course.id.toString() === paymentData.courseId
      );
      setCourse(foundCourse);
      setTotalCost(paymentData.totalCost);
    }
  }, []);

  if (!course) {
    return <Loading />;
  }

  return (
    <div className="py-9 px-20 flex-col gap-8">
      <div className="pb-9">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-4"
        >
          <Image
            src="/image/icons/arrow_back.png"
            alt="icon kembali"
            width={9}
            height={14}
          />
          <p className="text-m font-bold">Kembali</p>
        </button>
      </div>

      {/* body */}
      <div className="flex space-x-4">
        <div className="bg-primarylight2 p-4 rounded-lg w-[469px] border border-text2">
          <Image
            src={course.imageUrl}
            alt="Course Image"
            width={437}
            height={354}
            className="rounded-lg mb-4"
          />
          <div className="rounded-lg bg-wait font-semibold text-whitebg py-2 px-4 text-center w-fit">
            Menunggu Pembayaran
          </div>
          <hr className="border-t-1 border-text2 my-4" />
          <h2 className="text-h3 font-semibold">Detail Course</h2>
          <p className="text-textcolor text-m mb-4">
            Nama : <span className="font-semibold">{course.name}</span>
          </p>
          <p className="text-textcolor text-m">
            Rating: <span className="font-semibold">{course.rating}</span>
          </p>
        </div>

        <div className="flex-col w-1/3 space-y-4">
          <div className="bg-primarylight2 rounded-lg border border-text2 p-4 flex flex-col justify-center h-[200px] space-y-2">
            <h2 className="text-h3 font-semibold mb-3 text-left">
              Detail Pemesanan
            </h2>
            <div className="flex justify-between w-full">
              <p className="text-left">No. Pemesanan :</p>
              <p className="font-medium text-right">XXXX,XXXX,XXXX</p>
            </div>
            <div className="flex justify-between w-full mt-1">
              <p className="text-left">Metode Pembayaran :</p>
              <p className="font-medium text-right">QRIS</p>
            </div>
          </div>

          <div className="bg-primarylight2 rounded-lg border border-text2 p-4 flex flex-col justify-center h-[200px] space-y-2">
            <div className="flex justify-between w-full">
              <p className="text-left">Total Harga Course :</p>
              <p className="font-medium text-right">
                Rp. {Number(course.price).toLocaleString("id-ID")}
              </p>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-left">Diskon Voucher :</p>
              <p className="font-medium text-right">
                - Rp. {Number(course.price - totalCost).toLocaleString("id-ID")}
              </p>
            </div>
            <div className="flex justify-between w-full font-semibold">
              <p className="text-left">Total Pembayaran :</p>
              <p className="text-right">
                Rp. {Number(totalCost).toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-primarylight2 p-6 rounded-lg w-1/4 border border-text2 flex flex-col items-center h-fit">
          <h2 className="text-h3 font-semibold">Pembayaran</h2>
          <p className="text-center mt-2">
            Selesaikan pembayaran sebelum waktu habis
          </p>
          <div className="text-h1 font-bold mt-4">04:30</div>
        </div>
      </div>
    </div>
  );
}

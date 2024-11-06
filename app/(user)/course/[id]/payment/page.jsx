"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { coursesData } from "@/constants";
import { useState } from "react";

export default function PaymentCourse() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("id");
  const router = useRouter();

  // Sample vouchers data
  const vouchers = [
    { code: "DISCOUNT50", amount: 50000 },
    { code: "SAVE20", amount: 20000 },
  ];

  const course = coursesData.find((course) => course.id.toString() === courseId);
  const [voucherCode, setVoucherCode] = useState("");
  const [discount, setDiscount] = useState(0);

  if (!course) {
    return <div>Course not found</div>;
  }

  const { name, description, rating, price, imageUrl } = course;

  // Handle voucher redemption
  const handleRedeem = () => {
    const foundVoucher = vouchers.find((v) => v.code === voucherCode.trim());
    if (foundVoucher) {
      setDiscount(foundVoucher.amount);
    } else {
      alert("Voucher tidak valid.");
      setDiscount(0);
    }
  };

  // Calculate total cost after discount
  const totalCost = (price - discount) || 0;

  // Redirect to summary page with total cost
  const handlePayment = () => {
    router.push({
      pathname: "/payment-summary",
      query: {
        courseId,
        totalCost,
      },
    });
  };

  return (
    <div className="py-9 px-20 flex flex-col space-y-5">
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

      <h1 className="text-h3 font-bold mt-6 text-color mb-0 pb-0">Pemesanan</h1>
      <p className="text-textcolor text-s mb-9">
        Lakukan pembayaran agar Course dapat dibuka dan dikerjakan
      </p>

      <div className="flex gap-8">
        <div className="bg-primarylight2 p-6 rounded-lg w-1/2 border border-text2">
          <Image
            src={imageUrl}
            alt="Course Image"
            width={400}
            height={300}
            className="rounded-lg mb-4 mx-auto"
          />
          <p className="text-textcolor text-m mb-4">{description}</p>
          <hr className="border-t-1 border-text2 my-4" />
          <div>
            <p className="font-semibold text-m mb-2">Detail Course</p>
            <p>
              Course : <span className="font-medium mb-1">{name}</span>
            </p>
            <p>
              Rating : <span className="font-medium mb-1">{rating}</span>
            </p>
          </div>
        </div>

        <div className="bg-primarylight2 p-6 rounded-lg w-1/2 border border-text2 space-y-4 h-fit">
          <p className="text-h3 font-semibold px-3">Pembayaran</p>
          <select className="w-full p-2 border border-text2 rounded-md">
            <option>Pilih Metode Pembayaran</option>
          </select>
          <hr className="border-t-1 border-text2" />
          <p className="text-h3 font-semibold px-3">Voucher</p>
          <div className="flex space-x-2">
            <input
              type="text"
              className="p-2 border border-text2 rounded-md flex-grow"
              placeholder="Masukan Voucher Anda"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
            />
            <button
              onClick={handleRedeem}
              disabled={!voucherCode.trim()}
              className="bg-primary text-white font-semibold py-2 px-6 rounded-lg disabled:bg-gray-400"
            >
              Redeem
            </button>
          </div>
          <div className="flex w-full justify-between px-3">
            <p>Total Harga Konsultasi</p>
            <p className="font-semibold">
              {Number(price).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
            </p>
          </div>

          {discount > 0 && (
            <div className="flex w-full justify-between px-3">
              <p>Diskon Voucher</p>
              <p className="font-semibold">
                - {Number(discount).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
              </p>
            </div>
          )}

          <hr className="border-t-1 border-text2" />
          <div className="flex w-full justify-between px-3">
            <p className="font-semibold">Total Biaya</p>
            <p className="font-semibold">
              {totalCost.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
            </p>
          </div>
          <div className="px-3">
            <input
              type="checkbox"
              name="snk"
              id="snk"
              className="checked:bg-primary checked:border-primary focus:ring-primary focus:ring-1 border border-primary rounded-sm"
            />{" "}
            <span className="text-xs">
              Saya telah membaca dan menyetujui Syarat & Ketentuan
            </span>
          </div>
          <button
            onClick={handlePayment}
            className="w-full bg-primary text-white font-semibold py-2 rounded-lg mt-4"
          >
            Bayar
          </button>
        </div>
      </div>
    </div>
  );
}
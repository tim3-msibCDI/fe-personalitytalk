"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CardCourse = ({ id, name, description, rating, price, imageUrl }) => {
  const [formattedPrice, setFormattedPrice] = useState("");

  useEffect(() => {
    // Format price only on the client
    setFormattedPrice(
      Number(price).toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      })
    );
  }, [price]);

  return (
    <div className="rounded-md shadow-xl w-fit flex flex-col h-full">
      <Image
        src={imageUrl}
        alt={name}
        width={330}
        height={330}
        className="rounded-t-md"
      />
      <div className="px-7 pt-7 w-[330px] flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-h3 font-semibold mb-2">{name}</h3>
          <p className="overflow-hidden h-36 line-clamp-6">{description}</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <Image
              src="/image/icons/star-black.svg"
              alt="Star"
              width={15}
              height={15}
            />
            <p className="ml-1">{rating}</p>
          </div>
          <p className="font-semibold">{formattedPrice}</p>
        </div>
      </div>
      <div className="mt-auto p-7 w-full">
        <Link
          href={`/course/${encodeURIComponent(id)}`}
          className="block text-center rounded-lg bg-primary text-white text-h3 font-semibold py-2 px-6 w-full"
        >
          Daftar
        </Link>
      </div>
    </div>
  );
};

export default CardCourse;

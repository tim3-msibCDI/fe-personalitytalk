"use client";

import { useState } from "react";
import Biodata from "@/components/profile/biodata";
import ChangePassword from "@/components/profile/changepassword";
import Image from "next/image";

const data = {
  nama: "Raka Wijaya Saleh",
  email: "raka@gmail.com",
  tanggal: "14 September 2023",
  role: "m",
};

export default function Profile() {
  const [activeComponent, setActiveComponent] = useState("biodata");

  return (
    <div className="mx-20 my-9 text-textcolor ">
      <div>
        <h1 className="text-h2 font-semibold">
          Selamat datang kembali {data.nama}!
        </h1>
      </div>
      <div className="w-full mt-6 flex gap-4">
        <div className="inline-flex rounded-lg bg-primarylight p-9 grid justify-items-center border border-solid border-textsec">
          <Image
            src="/image/psikolog/1.png"
            width={120}
            height={120}
            className="rounded-full"
          />
          <div className="mt-2 text-center">
            <h3 className="text-h3 font-semibold">{data.nama}</h3>
            <p className="text-center text-vs font-normal">{data.email}</p>
            <p className="text-center text-vs font-normal">
              Gabung Sejak : {data.tanggal}
            </p>
            <hr className="my-6 border-textsec" />
            <ul className="text-left text-sm">
              <li
                className={`flex p-3 my-2 gap-2 self-stretch rounded-lg cursor-pointer ${
                  activeComponent === "biodata"
                    ? "bg-primary font-semibold text-whitebg"
                    : ""
                }`}
                onClick={() => setActiveComponent("biodata")}
              >
                <Image
                  src={
                    activeComponent === "biodata"
                      ? "/icons/user-white.svg"
                      : "/icons/user-primary.svg"
                  }
                  height={15}
                  width={15}
                  className="mr-2"
                />
                Biodata Diri
              </li>
              <li
                className={`flex p-3 my-2 gap-2 self-stretch rounded-lg cursor-pointer ${
                  activeComponent === "changepassword"
                    ? "bg-primary font-semibold text-whitebg"
                    : ""
                }`}
                onClick={() => setActiveComponent("changepassword")}
              >
                <Image
                 src={
                  activeComponent === "changepassword"
                    ? "/icons/key-white.svg"
                    : "/icons/key-primary.svg"
                }
                  height={15}
                  width={15}
                  className="mr-2"
                />
                Ganti Password
              </li>
              <li className="flex p-3 my-2 gap-2 self-stretch rounded-lg cursor-pointer">
                <Image
                  src="/icons/chat-primary.svg"
                  height={15}
                  width={15}
                  className="mr-2"
                />
                Konsultasi Saya
              </li>
              {data.role === "m" && (
                <li className="flex p-3 my-2 gap-2 self-stretch rounded-lg cursor-pointer">
                  <Image
                    src="/icons/course-primary.svg" // Change to the course icon
                    height={15}
                    width={15}
                    className="mr-2"
                  />
                  Course
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Conditional rendering of components */}
        <div className="flex-1 rounded-lg bg-primarylight py-6 px-8 grid justify-items-center border border-solid border-textsec">
          {activeComponent === "biodata" && <Biodata />}
          {activeComponent === "changepassword" && <ChangePassword />}
          {data.role !== "m" && activeComponent === "biodata" && (
            <div className="flex justify-end w-full">
              <div className="text-right">
                <p>Apakah Kamu seorang mahasiswa?</p>
                <div className="w-full inline-flex justify-center items-center bg-primary text-whitebg px-6 py-2 rounded-lg ml-auto">
                  <Image
                    src="/icons/arrow.png"
                    width={15}
                    height={15}
                    className="mr-2"
                  />
                  <span>Klik disini</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

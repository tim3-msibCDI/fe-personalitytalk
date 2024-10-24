"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useUser } from "@/constants/UserContext";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("id-ID", options);
};

export default function Profile() {
  const { user } = useUser();

  const formattedDate = user.dateBirth ? formatDate(user.dateBirth) : "";

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-start self-stretch">
        <h3 className="text-h3 font-semibold">Biodata Diri</h3>
        <button className="inline-flex bg-primary text-whitebg px-6 py-2 rounded-lg flex-start hover:bg-hover">
          <Image
            src="/icons/pencil-white.svg"
            width={20}
            height={20}
            alt="Edit Icon"
          />
          Edit Biodata
        </button>
      </div>

      {/* Nama Lengkap */}
      <div className="my-2">
        <label>Nama Lengkap</label>
      </div>
      <div>
        <input
          type="text"
          value={user.nama}
          className="border border-textcolor bg-whitebg w-full rounded-lg p-3"
          disabled
        />
      </div>

      {/* Email */}
      <div className="my-2">
        <label>Email</label>
      </div>
      <div>
        <input
          type="text"
          value={user.email}
          className="border border-textcolor bg-whitebg w-full rounded-lg p-3"
          disabled
        />
      </div>

      <div className="flex gap-4">
        {/* Gender */}
        <div className="flex-1">
          <div className="my-2">
            <label className="block">Gender</label>
          </div>
          <div>
            <input
              type="text"
              value={user.gender}
              className="border border-textcolor bg-whitebg rounded-lg p-3 w-full"
              disabled
            />
          </div>
        </div>

        {/* Tanggal Lahir */}
        <div className="flex-1">
          <div className="my-2">
            <label className="block">Tanggal Lahir</label>
          </div>
          <div>
            <input
              type="text"
              value={user.dateBirth}
              className="border border-textcolor bg-whitebg rounded-lg p-3 w-full"
              disabled
            />
          </div>
        </div>

        {/* Nomor Telepon */}
        <div className="flex-1">
          <div className="my-2">
            <label className="block">Nomor Telepon</label>
          </div>
          <div>
            <input
              type="text"
              value={user.phoneNumber}
              className="border border-textcolor bg-whitebg rounded-lg p-3 w-full"
              disabled
            />
          </div>
        </div>
      </div>

      {user.role === "M" && (
        <div className="flex gap-4">
          {/* Universitas */}
          <div className="flex-1">
            <div className="my-2">
              <label>Universitas</label>
            </div>
            <div>
              <input
                type="text"
                value={user.universitas}
                className="border border-textcolor bg-whitebg w-full rounded-lg p-3"
                disabled
              />
            </div>
          </div>

          {/* Jurusan */}
          <div className="flex-1">
            <div className="my-2">
              <label>Jurusan</label>
            </div>
            <div>
              <input
                type="text"
                value={user.jurusan}
                className="border border-textcolor bg-whitebg w-full rounded-lg p-3"
                disabled
              />
            </div>
          </div>
        </div>
      )}
      {user.role ===
        "U" && (
          <div className="mt-4 flex justify-end w-full">
            <div className="text-right">
              <p>Apakah Kamu seorang mahasiswa?</p>
              <button className="w-full inline-flex justify-center items-center bg-primary text-whitebg px-6 py-2 rounded-lg ml-auto hover:bg-hover">
                <Image
                  src="/icons/arrow.png"
                  width={15}
                  height={15}
                  className="mr-2"
                />
                <span>Klik disini</span>
              </button>
            </div>
          </div>
        )}
    </div>
  );
}

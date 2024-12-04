"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { setToken } from "@/lib/auth"; // Fungsi yang Anda miliki untuk menyimpan token

export default function GoogleCallback() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const role = params.get("role");

    if (!token || !role) {
      console.error("Invalid callback parameters");
      router.push("/login");
      return;
    }

    // Simpan token di cookie
    setToken(token);

    // Arahkan ke halaman berdasarkan role
    if (role === "U") {
      router.push("/"); // Halaman utama untuk pengguna biasa
    } else if (role === "P") {
      router.push("/psikolog/dashboard"); // Halaman utama untuk psikolog
    } else {
      router.push("/login"); // Fallback jika role tidak dikenali
    }
  }, [router]);

  return <p>Processing your login...</p>;
}
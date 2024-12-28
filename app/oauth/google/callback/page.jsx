"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { setToken } from "@/lib/auth"; // Fungsi untuk menyimpan token
import Loading from "@/components/loading/loading";
export default function GoogleCallback() {
  const router = useRouter();

  useEffect(() => {
    const fetchCallbackData = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const role = params.get("role");

        if (!token || !role) {
          throw new Error("Invalid callback parameters");
        }

        // Simpan token di cookie atau localStorage
        setToken(token, role);

        // Navigasi berdasarkan role
        if (["U", "M"].includes(role)) {
          router.push("/"); // Halaman utama untuk user biasa atau manager
        } else if (["P", "K"].includes(role)) {
          router.push("/psikolog/dashboard"); // Halaman utama untuk psikolog atau konsultan
        } else {
          router.push("/login"); // Fallback jika role tidak valid
        }
      } catch (error) {
        console.error(error.message);
        router.push("/login");
      }
    };

    fetchCallbackData();
  }, [router]);

  return <Loading />; // Menggunakan komponen Loading untuk menampilkan loading spinner
}

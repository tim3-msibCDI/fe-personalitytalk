import { NextResponse } from "next/server";

export function middleware(req) {
    const pathname = req.nextUrl.pathname;

    // Abaikan file statis berdasarkan ekstensi
    const isStaticFile = pathname.match(/\.(png|jpg|jpeg|svg|webp|ico|js|css|woff|woff2|ttf|otf)$/i);
    if (isStaticFile) {
        return NextResponse.next();
    }
    const token = req.cookies.get("authToken")?.value; // Ambil token dari cookie
    const url = req.nextUrl.clone();
    const role = req.cookies.get("role")?.value; // Ambil role dari cookie

    if (!token) {
        // Redirect jika tidak ada token
        if (url.pathname.startsWith("/psikolog")) {
            return NextResponse.redirect(new URL("/", req.url));
        }
        return NextResponse.next();
    }

    if (role === "U" || role === "M") {
        // Hanya izinkan akses ke halaman non-psikolog
        if (url.pathname.startsWith("/psikolog")) {
            return NextResponse.redirect(new URL("/", req.url));
        }
    } else if (role === "P" || role === "K") {
        // Hanya izinkan akses ke halaman psikolog
        if (!url.pathname.startsWith("/psikolog")) {
            return NextResponse.redirect(new URL("/psikolog/dashboard", req.url));
        }
    }

    return NextResponse.next(); // Lanjutkan jika tidak ada pembatasan
}

export const config = {
    matcher: ["/((?!_next|api).*)"], // Middleware dijalankan untuk halaman tertentu saja
};

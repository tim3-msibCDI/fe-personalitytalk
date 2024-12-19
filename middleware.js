import { NextResponse } from "next/server";

export function middleware(req) {
    const pathname = req.nextUrl.pathname;

    // Abaikan file statis berdasarkan ekstensi
    const isStaticFile = pathname.match(/\.(png|jpg|jpeg|svg|webp|ico|js|css|woff|woff2|ttf|otf)$/i);
    if (isStaticFile) {
        return NextResponse.next();
    }

    // Ambil token dan role dari cookies
    const token = req.cookies.get("authToken")?.value;
    const role = req.cookies.get("role")?.value;
    const url = req.nextUrl.clone();

    if (!token) {
        // Redirect jika token tidak ada
        if (url.pathname.startsWith("/psikolog")) {
            return NextResponse.redirect(new URL("/", req.url));
        }
        return NextResponse.next();
    }

    if (role === "U" || role === "M") {
        if (url.pathname.startsWith("/psikolog")) {
            return NextResponse.redirect(new URL("/", req.url));
        }
    } else if (role === "P" || role === "K") {
        if (!url.pathname.startsWith("/psikolog")) {
            return NextResponse.redirect(new URL("/psikolog/dashboard", req.url));
        }
    } else if (role === "A") {
        if (!url.pathname.startsWith("/admin")) {
            return NextResponse.redirect(new URL("/admin/dashboard", req.url));
        }
    } else {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next(); // Lanjutkan jika tidak ada pembatasan
}

export const config = {
    matcher: ["/((?!_next|api|admin/login).*)"], // Middleware dijalankan untuk halaman tertentu saja
};

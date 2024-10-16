import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center py-4 px-8 bg-white shadow-lg text-lg sticky top-0 z-50">
            <div className="text-lg font-bold ml-20">
                <Link href="/">
                    <Image src="/image/logo_biro_new.png" alt="Logo" width={131} height={50} />
                </Link>
            </div>
            <ul className="flex space-x-6 font-light text-textcolor text-h3">
                <li>
                    <Link href="/konsultasi">Konsultasi</Link>
                </li>
                <li>
                    <Link href="/course">Course</Link>
                </li>
                <li>
                    <Link href="/tes-mental">Tes Mental</Link>
                </li>
                <li>
                    <Link href="/about">About Us</Link>
                </li>
            </ul>
            <div className="mr-20">
                <Link href="/register" className="border border-primary text-primary text-m px-4 py-2 rounded mr-5 mt-5 mb-5">
                    Register
                </Link>
                <Link href="/login" className="border border-primary bg-primary text-white text-m px-5 py-2 rounded mt-5 mb-5">
                    Login
                </Link>
            </div>
        </nav>
    );
}

import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center py-4 px-8 bg-blue-300 text-white">
            <div className="text-lg font-bold">
                <Link href="/">
                    <Image src="/image/logo_biro_new.png" alt="Logo" width={150} height={50} />
                </Link>
            </div>
            <ul className="flex space-x-6">
                <li>
                    <Link href="/konsultasi">Konsultasi</Link>
                </li>
                <li>
                    <Link href="/course">Course</Link>
                </li>
                <li>
                    <Link href="/about">About Us</Link>
                </li>
            </ul>
            <div>
                <Link href="/login" className="bg-gray-700 px-4 py-2 rounded hover:bg-black">
                    Login
                </Link>
            </div>
        </nav>
    );
}

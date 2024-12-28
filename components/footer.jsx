import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-whitebg py-10 sm:text-base text-s font-light text-textcolor shadow-bottom">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between items-start">
        <div className="lg:w-1/2 ml-6">
          <div className="lg:w-1/2">
            <div className="mb-4">
              <Image
                src="/image/logo.webp"
                alt="Address Icon"
                width={150}
                height={0}
              />
            </div>
            <address className="not-italic text-gray-700 mb-4">
              Tamansari Hills Residence Blok B01 No.10, RT.02/RW.10,
              Mangunharjo, Kec. Banyumanik, Kota Semarang, Jawa Tengah 50272
            </address>
          </div>
        </div>

        <div className="lg:w-1/2 flex sm:ml-6 mx-auto sm:mb-4 mb-2">
          <div className="lg:w-1/2 text-gray-700 mt-6 lg:mt-0 sm:pr-20">
            <h5 className="font-semibold mb-3">Tentang</h5>
            <ul className="sm:text-base text-s pr-2 sm:pr-0">
              <li>
                <Link href="/about" className="hover:underline">
                  Tentang PersonalityTalk
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Kontak Kami
                </Link>
              </li>
              <li>
                <Link href="/konsultasi" className="hover:underline">
                  Konsultasi
                </Link>
              </li>
              <li>
                <Link href="/course" className="hover:underline">
                  Course
                </Link>
              </li>
              <li>
                <Link href="/tes-mental" className="hover:underline">
                  Tes Mental
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:w-1/2 text-gray-700 mt-6 lg:mt-0">
            <h5 className="font-semibold mb-3">Lainnya</h5>
            <ul className="sm:text-base text-s">
              <li>
                <Link href="/syarat-dan-ketentuan" className="hover:underline">
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="/article" className="hover:underline">
                  Artikel
                </Link>
              </li>
              <li>
                <Link href="/informasi-kesehatan" className="hover:underline">
                  Informasi Kesehatan
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="border-textcolor max-w-[1200px] mx-auto" />
      <div className="max-w-[1200px] mx-auto text-center text-textcolor mt-2">
        PersonalityTalk © 2024. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-whitebg py-10 text-base font-light text-textcolor">
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

        <div className="lg:w-1/2 flex sm:ml-6 sm:mb-4">
          <div className="lg:w-1/2 text-gray-700 mt-6 lg:mt-0 sm:pr-20">
            <h5 className="font-semibold mb-3">Tentang</h5>
            <ul>
              <li>
                <a href="#" className="hover:underline">
                  Tentang PersonalityTalk
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Kontak Kami
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Konseling
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Course
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:w-1/2 text-gray-700 mt-6 lg:mt-0">
            <h5 className="font-semibold mb-3">Lainnya</h5>
            <ul>
              <li>
                <a href="#" className="hover:underline">
                  Syarat & Ketentuan
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Kebijakan Privasi
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Gabung sebagai Konselor
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Artikel
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Forum
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="border-textcolor max-w-[1200px] mx-auto" />
      <div className="max-w-[1200px] mx-auto text-center text-gray-600 mt-2">
        PersonalityTalk © 2024. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

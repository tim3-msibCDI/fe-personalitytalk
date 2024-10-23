import SidebarProfile from "@/components/sidebarprofile";

const data = {
    nama: "Raka Wijaya Saleh",
    email: "raka@gmail.com",
    tanggal: "14 September 2023",
    role: "u",
  };


export default function ProfileUserLayout({ children }) {
  return (
    <div className="mx-20 my-9 text-textcolor ">
    <div>
      <h1 className="text-h2 font-semibold">
        Selamat datang kembali {data.nama}!
      </h1>
    </div>
    <div className="w-full mt-6 flex gap-4">
    {/* Sidebar Here */}
    <SidebarProfile nama={data.nama} email={data.email} tanggal={data.tanggal} role={data.role} />

      <div className="flex-1 rounded-lg bg-primarylight py-6 px-8 grid justify-items-center border border-solid border-textsec">
        {children}
      </div>
    </div>
  </div>
  );
}

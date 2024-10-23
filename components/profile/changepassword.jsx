import Image from "next/image";

export default function Changepassword() {
  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-start self-stretch">
        <h3 className="text-h3 font-semibold">Ganti Password</h3>
      </div>

      <div className="my-4">
        <label>Password Lama</label>
        <input
          type="password"
          placeholder="Masukkan password lama"
          className="border border-textcolor w-full rounded-lg p-3"
        />
      </div>

      <div className="my-4">
        <label>Password Baru</label>
        <input
          type="password"
          placeholder="Masukkan password baru"
          className="border border-textcolor w-full rounded-lg p-3"
        />
      </div>

      <div className="my-4">
        <label>Konfirmasi Password Baru</label>
        <input
          type="password"
          placeholder="Konfirmasi password baru"
          className="border border-textcolor w-full rounded-lg p-3"
        />
      </div>

      <div className="w-full flex justify-end mt-6">
        <button className="bg-primary text-whitebg px-6 py-2 rounded-lg">
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}

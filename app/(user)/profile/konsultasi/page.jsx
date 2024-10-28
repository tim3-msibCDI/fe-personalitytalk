import AktivitasCard from "@/components/card/activitas";

export default function KonsultasiUserPage() {
  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-start self-stretch">
        <h3 className="text-h3 font-semibold">Aktivitas</h3>
      </div>
      <AktivitasCard />

    </div>
  )
}

export default function AktivitasCard() {
  return (
    <div className="w-[746px] h-[124px] p-4 bg-[#fdcea2] rounded-lg border border-[#fb8312] justify-between items-center inline-flex">
      <div className="justify-start items-center gap-3 flex">
        <div className="h-20 bg-[#fddfc3] rounded-lg border border-[#a2a2a2] justify-start items-center gap-2.5 flex">
          <img
            className="grow shrink basis-0 h-20 rounded-lg"
            src="https://via.placeholder.com/80x80"
          />
        </div>
        <div className="w-[242px] self-stretch flex-col justify-center items-start gap-2 inline-flex">
          <div className="text-[#242424] text-base font-semibold font-['Poppins']">
            Taufik Alif Shalahuddin, M.Psi.
          </div>
          <div className="w-40 h-5 px-4 py-2 bg-[#e8aa0b] rounded-lg justify-center items-center gap-2.5 inline-flex">
            <div className="text-neutral-50 text-xs font-semibold font-['Poppins']">
              Sedang Berlangsung
            </div>
          </div>
        </div>
      </div>
      <div className="h-11 justify-end items-center gap-6 flex">
        <div className="flex-col justify-center items-start gap-2 inline-flex">
          <div className="justify-start items-center gap-2 inline-flex">
            <div className="w-4 h-4 relative" />
            <div className="text-[#242424] text-xs font-semibold font-['Poppins']">
              1 Okt 2024
            </div>
          </div>
          <div className="justify-start items-center gap-2 inline-flex">
            <div className="w-4 h-[14.30px] relative" />
            <div className="text-[#242424] text-xs font-semibold font-['Poppins']">
              13:00 - 14:00
            </div>
          </div>
        </div>
        <div className="w-4 h-[26px] relative" />
      </div>
    </div>
  );
}

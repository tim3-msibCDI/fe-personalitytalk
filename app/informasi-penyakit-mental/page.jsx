export default function Informasi() {
    return (
        <section>
            <div clasName="px-8 py-4">
                <div className="relative flex ml-52 mr-52 mt-10 mb-20">
                    <input
                        type="search"
                        class="relative m-0 -me-0.5 block flex-auto rounded-s-md border border-solid border-primary bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-surface outline-none placeholder:textsec"
                        placeholder="Cari Informasi Penyakit"
                        aria-label="Search"
                        id="exampleFormControlInput3"
                        aria-describedby="button-addon3" />
                    <button
                        className="z-[2] inline-block rounded-e-md border-2 bg-primary border-primary px-6 pb-[6px] pt-2 font-medium text-white"
                        data-twe-ripple-init
                        data-twe-ripple-color="white"
                        type="button"
                        id="button-addon3">
                        Cari
                    </button>
                </div>
            </div>
        </section>
    )
}
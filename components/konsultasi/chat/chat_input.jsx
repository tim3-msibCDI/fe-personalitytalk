import Image from "next/image";

export default function ChatInput() {
    return (
        <div className="bg-primarylight2">
            <div className="px-6 md:px-8 lg:px-12 ml-12 py-5 mr-4 md:mr-8 flex gap-2">
                <input
                    type="text"
                    placeholder="Ketik Disini"
                    className="flex-1 p-2 rounded-lg border border-gray-300"
                />
                <Image
                src="/icons/send.svg"
                alt="Icon Send"
                width={48}
                height={43}
                />
            </div>
        </div>
    );
}
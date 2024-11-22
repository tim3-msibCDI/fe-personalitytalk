import HeaderPsikolog from "@/components/dashboard/section/header-psikolog";

export default function PsikologLayout({ children }) {
    return (
        <div>
            <HeaderPsikolog />
            <div>{children}</div>
        </div>
    );
}
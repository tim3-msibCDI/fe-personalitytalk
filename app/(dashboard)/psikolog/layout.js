import Header from "@/components/psikolog/header";

export default function PsikologLayout({ children }) {
    return (
        <div>
            <Header />
            <div>{children}</div>
        </div>
    );
}
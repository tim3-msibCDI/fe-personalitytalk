import Header from "@/components/psikolog/header";

export default function AdminLayout({ children }) {
    return (
        <div>
            <Header />
            <div>{children}</div>
        </div>
    );
}
import ArticleForm from "@/components/dashboard/form/artikelform";
import HeaderAdmin from "@/components/dashboard/section/header-admin";

export default function AddArtikelPage() {
  return (
    <>
      <HeaderAdmin />
      <div className="p-6">
        <div className="bg-primarylight2 p-6 rounded-lg">
          <ArticleForm isAddMode={true} />
        </div>
      </div>
    </>
  );
}

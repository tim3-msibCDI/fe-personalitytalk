import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MhsForm from "@/components/dashboard/form/mhsform";
import { getMhsById } from "@/api/manage-mahasiswa";

export default function DetailMahasiswa() {
  const router = useRouter();
  const { id } = router.query;
  const [mhsData, setMhsData] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const response = await getMhsById(id);
        setMhsData(response.data);
      };
      fetchData();
    }
  }, [id]);

  return mhsData ? <MhsForm isViewMode={true} mhsData={mhsData} /> : null;
}

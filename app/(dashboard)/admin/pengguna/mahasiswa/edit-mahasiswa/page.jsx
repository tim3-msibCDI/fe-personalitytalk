import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MhsForm from "@/components/dashboard/form/mhsform";
import { getMhsById } from "@/api/manage-mahasiswa"; // Fungsi untuk mendapatkan data mahasiswa

export default function EditMahasiswa() {
  const router = useRouter();
  const { id } = router.query;
  const [mhsData, setMhsData] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const response = await getMhsById(id); // Mengambil data berdasarkan ID mahasiswa
        setMhsData(response.data);
      };
      fetchData();
    }
  }, [id]);

  return mhsData ? <MhsForm isEditMode={true} mhsData={mhsData} /> : null;
}

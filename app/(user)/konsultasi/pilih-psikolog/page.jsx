import StepNavigation from "@/components/konsultasi/form-wizard/step_nav";
import FormPilihPsikolog from "@/components/konsultasi/form-wizard/pilih_psikolog";

export default function PilihPsikolog() {
    return (
        <div className="px-6 md:px-8 lg:px-12 ml-12 py-9">
            <StepNavigation/>
            <FormPilihPsikolog/>
        </div>
    );
}
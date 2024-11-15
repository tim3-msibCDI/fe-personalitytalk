"use client";

import { useState } from "react";
import StepNavigation from "@/components/konsultasi/form-wizard/step_nav";
import FormPilihPsikolog from "@/components/konsultasi/form-wizard/StepForm/pilih_psikolog";
import FormPilihJadwal from "@/components/konsultasi/form-wizard/StepForm/pilih_jadwal";
import FormBayar from "@/components/konsultasi/form-wizard/StepForm/bayar";
import { steps } from "@/constants";

export default function FormPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPsikolog, setSelectedPsikolog] = useState(null);

  // Fungsi untuk menghandle perubahan langkah
  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  // Fungsi untuk menangani pemilihan psikolog
  const handleSelectPsikolog = (psikolog) => {
    setSelectedPsikolog(psikolog);
    // Simpan id psikolog di localStorage
    localStorage.setItem("selectedPsikologId", psikolog.id);
    
    // Setelah memilih psikolog, lanjutkan ke langkah berikutnya
    nextStep();
  };

  // Render komponen form berdasarkan langkah saat ini
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <FormPilihPsikolog onSelectPsikolog={handleSelectPsikolog}/>;
      case 2:
        return <FormPilihJadwal onBack={prevStep}/>;
      case 3:
        return <FormBayar/>;
      default:
        return null;
    }
  };

  return (
    <div className="px-6 md:px-8 lg:px-12 py-9 ml-4 lg:ml-8 mr-4 lg:mr-8">
      {/* Step Navigation */}
      <StepNavigation currentStep={currentStep} />

      {/* Form Step */}
      <div className="mt-6">
        {renderStepContent()}
      </div>
    </div>
  );
}

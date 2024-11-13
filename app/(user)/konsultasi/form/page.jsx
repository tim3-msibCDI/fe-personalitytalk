"use client";

import { useState } from "react";
import StepNavigation from "@/components/konsultasi/form-wizard/step_nav";
import FormPilihPsikolog from "@/components/konsultasi/form-wizard/StepForm/pilih_psikolog";
import FormPilihJadwal from "@/components/konsultasi/form-wizard/StepForm/pilih_jadwal";
import FormBayar from "@/components/konsultasi/form-wizard/StepForm/bayar";
import { steps } from "@/constants";

export default function FormPage() {
  const [currentStep, setCurrentStep] = useState(1);

  // Fungsi untuk menghandle perubahan langkah
  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  // Render komponen form berdasarkan langkah saat ini
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <FormPilihPsikolog />;
      case 2:
        return <FormPilihJadwal />;
      case 3:
        return <FormBayar />;
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

      {/* Tombol Next & Previous */}
      <div className="flex justify-between mt-4">
        <button 
          onClick={prevStep} 
          disabled={currentStep === 1} 
          className="btn btn-outline"
        >
          Sebelumnya
        </button>
        <button 
          onClick={nextStep} 
          disabled={currentStep === steps.length} 
          className="btn btn-primary"
        >
          Selanjutnya
        </button>
      </div>
    </div>
  );
}

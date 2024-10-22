import { steps } from "@/constants"; // Import langkah dari konstanta

export default function StepNavigation({ currentStep }) {
  return (
    <ul className="relative flex flex-row gap-x-2">
      {steps.map((step, index) => (
        <li
          key={step.number}
          className={index === steps.length - 1
            ? ""
            : "shrink basis-0 flex-1 group"
          }
        >
          <div className="w-full inline-flex items-center">
            {/* Lingkaran Step */}
            <span
              className={`size-7 flex justify-center items-center shrink-0 
              ${step.number === currentStep ? 'bg-primary text-whitebg' : 'bg-disable text-textcolor'} 
              font-bold text-h3 rounded-full w-10 h-10`}
            >
              {step.number}
            </span>

            {/* Garis potong-potong, tidak muncul pada step terakhir */}
            {index < steps.length - 1 && (
              <div className="ms-2 w-full h-px flex-1 border-t-2 border-dashed border-gray-300"></div>
            )}
          </div>
          {/* Label Step */}
          <div className="mt-3">
            <span className="block text-h3 font-semibold text-textcolor">
              {step.label}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

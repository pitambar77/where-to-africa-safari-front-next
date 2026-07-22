"use client";

import Image from "next/image";

const ProgressBar = ({ currentStep, totalSteps }) => {
  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="flex items-start gap-4">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const step = index + 1;

          return (
            <div key={step} className="flex-1 relative">
              {/* Logo */}

              {step === currentStep && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20">
                  <Image
                    src="/animal-1.png"
                    alt="Rhino"
                    width={80}
                    height={50}
                    className="object-contain"
                  />
                </div>
              )}

              {/* Progress Segment */}

              <div
                className={`h-[5px] rounded-full transition-all duration-300 ${
                  step <= currentStep ? "bg-[#aa8b51]" : "bg-gray-200"
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;

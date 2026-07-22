"use client";

import { useState } from "react";

const useMultiStep = (totalSteps) => {
  const [step, setStep] = useState(1);

  const next = () => {
    if (step < totalSteps) {
      setStep((prev) => prev + 1);
    }
  };

  const previous = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const goTo = (value) => {
    if (value >= 1 && value <= totalSteps) {
      setStep(value);
    }
  };

  return {
    step,
    next,
    previous,
    goTo,
    isFirstStep: step === 1,
    isLastStep: step === totalSteps,
  };
};

export default useMultiStep;

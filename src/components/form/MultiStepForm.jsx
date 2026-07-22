"use client";

import { FormProvider, useForm } from "react-hook-form";

import useMultiStep from "@/hooks/useMultiStep";

import ProgressBar from "./ProgressBar";
import Navigation from "./Navigation";


import Step2Destination from "./Step2Destination";
import Step3Purpose from "./Step3Purpose";
import Step4TravelDate from "./Step4TravelDate";
import Step5Travellers from "./Step5Travellers";
import Step6Budget from "./Step6Budget";
import Step7Referral from "./Step7Referral";
import Step8Contact from "./Step8Contact";
import Step1TravelDecision from "./Step1TravelDecision";

const TOTAL_STEPS = 8;

const MultiStepForm = () => {
  const methods = useForm({
    defaultValues: {
      travelDecision: "",

      destination: [],

      purpose: [],

      month: "",

      dateRange: null,

      adults: 2,

      children: 0,

      currency: "USD",

      budget: 4000,

      travelledBefore: "",

      referred: "",

      referralName: "",

      firstName: "",

      lastName: "",

      email: "",

      phone: "",

      message: "",

      privacy: false,
    },
  });

  const { step, next, previous, isFirstStep, isLastStep } =
    useMultiStep(TOTAL_STEPS);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1TravelDecision />;

      case 2:
        return <Step2Destination />;

      case 3:
        return <Step3Purpose />;

      case 4:
        return <Step4TravelDate />;

      case 5:
        return <Step5Travellers />;

      case 6:
        return <Step6Budget />;

      case 7:
        return <Step7Referral />;

      case 8:
        return <Step8Contact />;

      default:
        return null;
    }
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="max-w-7xl mx-auto bg-white rounded-md shadow-lg p-10 min-h-[80vh]"
      >
        <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />

        <div className="min-h-[500px]">{renderStep()}</div>

        <Navigation
          onNext={next}
          onBack={previous}
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
        />
      </form>
    </FormProvider>
  );
};

export default MultiStepForm;

"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../ui/Button";

const Navigation = ({ onNext, onBack, isFirstStep, isLastStep }) => {
  return (
    <div className=" max-w-5xl mx-auto flex justify-between items-center mt-12">
      {/* Back */}

      <div>
        {!isFirstStep && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-2xl font-semibold cursor-pointer hover:text-[#aa8b51] font-quicksand"
          >
            <ChevronLeft size={24} />
            Back
          </button>
        )}
      </div>

      {/* Next */}

      <Button
        onClick={onNext}
        className="min-w-[180px] h-14 text-xl cursor-pointer font-quicksand"
        icon={<ChevronRight />}
      >
        {isLastStep ? "Send" : "Next"}
      </Button>
    </div>
  );
};

export default Navigation;

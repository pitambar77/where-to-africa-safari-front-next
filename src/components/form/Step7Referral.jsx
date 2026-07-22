"use client";

import { useFormContext } from "react-hook-form";

import OptionCard from "../ui/OptionCard";
import Input from "../ui/Input";

const Step7Referral = () => {
  const { watch, setValue } = useFormContext();

  const travelledBefore = watch("travelledBefore");
  const referred = watch("referred");
  const referralName = watch("referralName");

  return (
    <div className="max-w-4xl mx-auto">
      {/* Question 1 */}

      <div className="text-center mt-4">
        <h2 className="text-2xl md:text-4xl text-[#636363] font-normal font-cormorant">
          Have you travelled with us before?
        </h2>

        <div className="grid grid-cols-2 gap-6 max-w-xl mx-auto mt-12 font-quicksand">
          <OptionCard
            label="Yes"
            selected={travelledBefore === "yes"}
            onClick={() => {
              setValue("travelledBefore", "yes");
              setValue("referred", "");
              setValue("referralName", "");
            }}
          />

          <OptionCard
            label="No"
            selected={travelledBefore === "no"}
            onClick={() => setValue("travelledBefore", "no")}
          />
        </div>
      </div>

      {/* Question 2 */}

      {travelledBefore === "no" && (
        <div className="mt-20 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl text-[#636363] font-normal font-cormorant">
            Have you been referred by someone who has travelled with Where to
            Africa before?
          </h2>

          <div className="grid grid-cols-2 gap-6 max-w-xl mx-auto mt-12 font-quicksand">
            <OptionCard
              label="Yes"
              selected={referred === "yes"}
              onClick={() => setValue("referred", "yes")}
            />

            <OptionCard
              label="No"
              selected={referred === "no"}
              onClick={() => {
                setValue("referred", "no");
                setValue("referralName", "");
              }}
            />
          </div>
        </div>
      )}

      {/* Referral Name */}

      {travelledBefore === "no" && referred === "yes" && (
        <div className="max-w-2xl mx-auto mt-14">
          <Input
            label="Please tell us who referred you. *"
            placeholder="Full Name"
            value={referralName}
            onChange={(e) => setValue("referralName", e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default Step7Referral;

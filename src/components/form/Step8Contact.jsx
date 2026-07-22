"use client";

import { useFormContext, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import Input from "../ui/Input";
import Select from "../ui/Select";

const contactOptions = [
  {
    label: "Email",
    value: "email",
  },
  {
    label: "Phone Call",
    value: "phone",
  },
  {
    label: "WhatsApp",
    value: "whatsapp",
  },
];

const Step8Contact = () => {
  const { watch, setValue, control, register } = useFormContext();

  const preferredContact = watch("preferredContact") || "email";

  const privacy = watch("privacy");

  return (
    <div className="max-w-5xl mx-auto">
      {/* Heading */}

      <div className="text-center mb-10 max-w-3xl mx-auto ">
        <h2 className="text-2xl md:text-4xl text-[#636363] font-normal font-cormorant">
          Tell us more!
        </h2>
        <p className="mt-6 text-gray-500 text-lg font-quicksand">
          Tell us everything about what you and your fellow travellers would
          like to tick off your bucket list while in Africa.
        </p>
      </div>

      <div className=" flex flex-col md:flex-row gap-8 justify-between">

    
      <div>
        {/* Form */}

        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="First Name"
            placeholder="John"
            {...register("firstName")}
          />

          <Input
            label="Last Name"
            placeholder="Doe"
            {...register("lastName")}
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            {...register("email")}
          />

          <div>
            <label className="block mb-4 font-quicksand tracking-wide font-medium text-gray-700">
              Phone Number
            </label>

            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <PhoneInput
                  country={"us"}
                  value={field.value}
                  onChange={field.onChange}
                  enableSearch
                  inputStyle={{
                    width: "100%",
                    height: "56px",
                  }}
                  buttonStyle={{
                    borderRadius: "8px 0 0 8px",
                  }}
                />
              )}
            />
          </div>
        </div>

        {/* Contact Method */}

        <div className="mt-8">
          <Select
            label="Preferred Contact Method"
            value={preferredContact}
            onChange={(e) => setValue("preferredContact", e.target.value)}
            options={contactOptions}
          />
        </div>
      </div>

      <div>
        {/* Message */}

        <div className="">
          <label className="block mb-4 font-quicksand tracking-wide font-medium text-gray-700">
            Additional Information
          </label>

          <textarea
            rows={6}
            placeholder="Tell us about your dream safari..."
            {...register("message")}
            className="w-full rounded-lg border border-gray-300 p-4 outline-none focus:border-[#A30C0C] font-quicksand"
          />
        </div>

        {/* Privacy */}

        <div className="mt-8">
          <label className="flex items-start gap-3 font-quicksand">
            <input
              type="checkbox"
              checked={privacy}
              onChange={(e) => setValue("privacy", e.target.checked)}
              className="mt-1 w-5 h-5 accent-[#aaa085] "
            />

            <span className="text-gray-700 leading-7">
              I agree to the Privacy Policy and consent to being contacted
              regarding my safari enquiry.
            </span>
          </label>
        </div>
      </div>
        </div>
    </div>
  );
};

export default Step8Contact;

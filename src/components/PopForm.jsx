import { useState, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import ReCAPTCHA from "react-google-recaptcha";

export default function PopForm({ experienceName, destination }) {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  const [form, setForm] = useState({
    tripType: experienceName || "",
    destinations: destination ? [destination] : [],
    planningStage: "",
    adults: 1,
    children: 0,
    // budget: "",
    travelDate: "",
    interests: "",

    // NEW (Step 2)
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    acceptPolicy: false,
  });

  const [openDropdown, setOpenDropdown] = useState(null);

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  const toggleDestination = (value) => {
    setForm((prev) => {
      const exists = prev.destinations.includes(value);

      return {
        ...prev,
        destinations: exists
          ? prev.destinations.filter((d) => d !== value)
          : [...prev.destinations, value],
      };
    });

    setErrors((prev) => ({
      ...prev,
      destinations: "",
    }));
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!form.tripType) newErrors.tripType = "Please select trip type.";

    if (form.destinations.length === 0)
      newErrors.destinations = "Select destination.";

    if (!form.planningStage)
      newErrors.planningStage = "Planning stage is required.";

    // if (!form.budget) newErrors.budget = "Budget is required.";

    if (!form.travelDate) newErrors.travelDate = "Travel date is required.";

    if (Number(form.adults) < 1) newErrors.adults = "Minimum 1 adult.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required.";

    if (!form.lastName.trim()) newErrors.lastName = "Last name is required.";

    if (!form.email) newErrors.email = "Email is required.";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email))
      newErrors.email = "Invalid email.";

    if (!form.phone) newErrors.phone = "Phone number is required.";

    if (!form.country) newErrors.country = "Country is required.";

    if (!form.acceptPolicy) newErrors.acceptPolicy = "Accept Privacy Policy.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async () => {
    if (!validateStep2()) return;

    if (!captchaToken) {
      alert("Please verify the captcha.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/floating-enquiry`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            captchaToken,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      if (data.success) {
        setStep(3);

        // Optional: Reset form after successful submission
        setForm({
          tripType: "",
          destinations: [],
          planningStage: "",
          adults: 1,
          children: 0,
          budget: "",
          travelDate: "",
          interests: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          country: "",
          acceptPolicy: false,
        });
      }
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to submit inquiry.");
    } finally {
      setLoading(false);
    }
  };

  // close dropdown on outside click
  useEffect(() => {
    const close = () => setOpenDropdown(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  useEffect(() => {
    if (experienceName) {
      setForm((prev) => ({
        ...prev,
        destinations: destination ? [destination] : prev.destinations,
        tripType: experienceName || prev.tripType,
      }));
    }
  }, [destination, experienceName]);

  const countries = [
    { name: "Afghanistan", code: "AF", dial: "+93" },
    { name: "Albania", code: "AL", dial: "+355" },
    { name: "Algeria", code: "DZ", dial: "+213" },
    { name: "Andorra", code: "AD", dial: "+376" },
    { name: "Angola", code: "AO", dial: "+244" },
    { name: "Argentina", code: "AR", dial: "+54" },
    { name: "Armenia", code: "AM", dial: "+374" },
    { name: "Australia", code: "AU", dial: "+61" },
    { name: "Austria", code: "AT", dial: "+43" },
    { name: "Azerbaijan", code: "AZ", dial: "+994" },

    { name: "Bahamas", code: "BS", dial: "+1-242" },
    { name: "Bahrain", code: "BH", dial: "+973" },
    { name: "Bangladesh", code: "BD", dial: "+880" },
    { name: "Belarus", code: "BY", dial: "+375" },
    { name: "Belgium", code: "BE", dial: "+32" },
    { name: "Belize", code: "BZ", dial: "+501" },
    { name: "Benin", code: "BJ", dial: "+229" },
    { name: "Bhutan", code: "BT", dial: "+975" },
    { name: "Bolivia", code: "BO", dial: "+591" },
    { name: "Bosnia and Herzegovina", code: "BA", dial: "+387" },
    { name: "Botswana", code: "BW", dial: "+267" },
    { name: "Brazil", code: "BR", dial: "+55" },
    { name: "Brunei", code: "BN", dial: "+673" },
    { name: "Bulgaria", code: "BG", dial: "+359" },
    { name: "Burkina Faso", code: "BF", dial: "+226" },
    { name: "Burundi", code: "BI", dial: "+257" },

    { name: "Cambodia", code: "KH", dial: "+855" },
    { name: "Cameroon", code: "CM", dial: "+237" },
    { name: "Canada", code: "CA", dial: "+1" },
    { name: "Cape Verde", code: "CV", dial: "+238" },
    { name: "Central African Republic", code: "CF", dial: "+236" },
    { name: "Chad", code: "TD", dial: "+235" },
    { name: "Chile", code: "CL", dial: "+56" },
    { name: "China", code: "CN", dial: "+86" },
    { name: "Colombia", code: "CO", dial: "+57" },
    { name: "Comoros", code: "KM", dial: "+269" },
    { name: "Congo", code: "CG", dial: "+242" },
    { name: "Costa Rica", code: "CR", dial: "+506" },
    { name: "Croatia", code: "HR", dial: "+385" },
    { name: "Cuba", code: "CU", dial: "+53" },
    { name: "Cyprus", code: "CY", dial: "+357" },
    { name: "Czech Republic", code: "CZ", dial: "+420" },

    { name: "Denmark", code: "DK", dial: "+45" },
    { name: "Djibouti", code: "DJ", dial: "+253" },
    { name: "Dominican Republic", code: "DO", dial: "+1-809" },

    { name: "Ecuador", code: "EC", dial: "+593" },
    { name: "Egypt", code: "EG", dial: "+20" },
    { name: "El Salvador", code: "SV", dial: "+503" },
    { name: "Estonia", code: "EE", dial: "+372" },
    { name: "Eswatini", code: "SZ", dial: "+268" },
    { name: "Ethiopia", code: "ET", dial: "+251" },

    { name: "Fiji", code: "FJ", dial: "+679" },
    { name: "Finland", code: "FI", dial: "+358" },
    { name: "France", code: "FR", dial: "+33" },

    { name: "Gabon", code: "GA", dial: "+241" },
    { name: "Gambia", code: "GM", dial: "+220" },
    { name: "Georgia", code: "GE", dial: "+995" },
    { name: "Germany", code: "DE", dial: "+49" },
    { name: "Ghana", code: "GH", dial: "+233" },
    { name: "Greece", code: "GR", dial: "+30" },
    { name: "Guatemala", code: "GT", dial: "+502" },

    { name: "Haiti", code: "HT", dial: "+509" },
    { name: "Honduras", code: "HN", dial: "+504" },
    { name: "Hungary", code: "HU", dial: "+36" },

    { name: "Iceland", code: "IS", dial: "+354" },
    { name: "India", code: "IN", dial: "+91" },
    { name: "Indonesia", code: "ID", dial: "+62" },
    { name: "Iran", code: "IR", dial: "+98" },
    { name: "Iraq", code: "IQ", dial: "+964" },
    { name: "Ireland", code: "IE", dial: "+353" },
    { name: "Israel", code: "IL", dial: "+972" },
    { name: "Italy", code: "IT", dial: "+39" },

    { name: "Jamaica", code: "JM", dial: "+1-876" },
    { name: "Japan", code: "JP", dial: "+81" },
    { name: "Jordan", code: "JO", dial: "+962" },

    { name: "Kazakhstan", code: "KZ", dial: "+7" },
    { name: "Kenya", code: "KE", dial: "+254" },
    { name: "Kuwait", code: "KW", dial: "+965" },

    { name: "Laos", code: "LA", dial: "+856" },
    { name: "Latvia", code: "LV", dial: "+371" },
    { name: "Lebanon", code: "LB", dial: "+961" },
    { name: "Lesotho", code: "LS", dial: "+266" },
    { name: "Liberia", code: "LR", dial: "+231" },
    { name: "Libya", code: "LY", dial: "+218" },
    { name: "Lithuania", code: "LT", dial: "+370" },

    { name: "Luxembourg", code: "LU", dial: "+352" },

    { name: "Madagascar", code: "MG", dial: "+261" },
    { name: "Malawi", code: "MW", dial: "+265" },
    { name: "Malaysia", code: "MY", dial: "+60" },
    { name: "Maldives", code: "MV", dial: "+960" },
    { name: "Mali", code: "ML", dial: "+223" },
    { name: "Malta", code: "MT", dial: "+356" },
    { name: "Mexico", code: "MX", dial: "+52" },
    { name: "Mongolia", code: "MN", dial: "+976" },
    { name: "Morocco", code: "MA", dial: "+212" },

    { name: "Myanmar", code: "MM", dial: "+95" },

    { name: "Namibia", code: "NA", dial: "+264" },
    { name: "Nepal", code: "NP", dial: "+977" },
    { name: "Netherlands", code: "NL", dial: "+31" },
    { name: "New Zealand", code: "NZ", dial: "+64" },
    { name: "Nicaragua", code: "NI", dial: "+505" },
    { name: "Niger", code: "NE", dial: "+227" },
    { name: "Nigeria", code: "NG", dial: "+234" },
    { name: "Norway", code: "NO", dial: "+47" },

    { name: "Oman", code: "OM", dial: "+968" },

    { name: "Pakistan", code: "PK", dial: "+92" },
    { name: "Panama", code: "PA", dial: "+507" },
    { name: "Papua New Guinea", code: "PG", dial: "+675" },
    { name: "Paraguay", code: "PY", dial: "+595" },
    { name: "Peru", code: "PE", dial: "+51" },
    { name: "Philippines", code: "PH", dial: "+63" },
    { name: "Poland", code: "PL", dial: "+48" },
    { name: "Portugal", code: "PT", dial: "+351" },

    { name: "Qatar", code: "QA", dial: "+974" },

    { name: "Romania", code: "RO", dial: "+40" },
    { name: "Russia", code: "RU", dial: "+7" },

    { name: "Rwanda", code: "RW", dial: "+250" },

    { name: "Saudi Arabia", code: "SA", dial: "+966" },
    { name: "Senegal", code: "SN", dial: "+221" },
    { name: "Serbia", code: "RS", dial: "+381" },
    { name: "Singapore", code: "SG", dial: "+65" },
    { name: "Slovakia", code: "SK", dial: "+421" },
    { name: "Slovenia", code: "SI", dial: "+386" },
    { name: "Somalia", code: "SO", dial: "+252" },
    { name: "South Africa", code: "ZA", dial: "+27" },
    { name: "South Korea", code: "KR", dial: "+82" },
    { name: "Spain", code: "ES", dial: "+34" },
    { name: "Sri Lanka", code: "LK", dial: "+94" },
    { name: "Sudan", code: "SD", dial: "+249" },
    { name: "Sweden", code: "SE", dial: "+46" },
    { name: "Switzerland", code: "CH", dial: "+41" },

    { name: "Thailand", code: "TH", dial: "+66" },
    { name: "Tunisia", code: "TN", dial: "+216" },
    { name: "Turkey", code: "TR", dial: "+90" },

    { name: "Uganda", code: "UG", dial: "+256" },
    { name: "Ukraine", code: "UA", dial: "+380" },
    { name: "United Arab Emirates", code: "AE", dial: "+971" },
    { name: "United Kingdom", code: "GB", dial: "+44" },
    { name: "United States", code: "US", dial: "+1" },
    { name: "Uruguay", code: "UY", dial: "+598" },
    { name: "Uzbekistan", code: "UZ", dial: "+998" },

    { name: "Venezuela", code: "VE", dial: "+58" },
    { name: "Vietnam", code: "VN", dial: "+84" },

    { name: "Yemen", code: "YE", dial: "+967" },

    { name: "Zambia", code: "ZM", dial: "+260" },
    { name: "Zimbabwe", code: "ZW", dial: "+263" },
  ];

  const sortedCountries = [...countries].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  const dropdownClass =
    "w-full flex items-center justify-between bg-transparent font-quicksand border border-[#aba186]/40 px-4 py-3 rounded outline-none cursor-pointer";

  const optionsClass =
    "px-4 py-3 hover:bg-[#f6f1e9] cursor-pointer text-sm flex items-center justify-between";

  return (
    <>
      <div className="bg-[#ebe6dd]  ">
        <div className=" bg-[#f6f4f4cd] p-8 shadow-sm font-quicksand rounded">
          {/* Heading */}
          <div className=" font-quicksand text-center mb-10">
            <h2 className="text-xl tracking-widest text-gray-600 uppercase">
              Send Your Inquiry
            </h2>
          </div>
          <div className=" px-20">
            <div className="relative mb-16">
              {/* Base Line (between dots only) */}
              <div className="absolute top-[7px] left-[8px] right-[8px] h-[1px] bg-gray-300"></div>

              {/* Active Line */}
              <div
                className="absolute top-[7px] left-[8px] h-[1px] bg-[#f4b63d] transition-all duration-300"
                style={{
                  width: step === 1 ? "0%" : step === 2 ? "50%" : "100%",
                }}
              ></div>

              {/* Steps */}
              <div className="flex justify-between relative">
                {/* Step 1 */}
                <div className="flex flex-col items-start">
                  <div
                    className={`w-4 h-4 rounded-full border ${
                      step >= 1
                        ? "bg-[#b08436] border-[#b08436]"
                        : "bg-white border-gray-300"
                    }`}
                  ></div>
                  <p className="mt-4  text-sm tracking-[3px] text-gray-700">
                    YOUR TRIP
                  </p>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-4 h-4 rounded-full border ${
                      step >= 2
                        ? "bg-[#b08436] border-[#b08436]"
                        : "bg-white border-gray-300"
                    }`}
                  ></div>
                  <p className="mt-4  text-sm tracking-[3px] text-gray-700">
                    YOUR DETAILS
                  </p>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-end">
                  <div
                    className={`w-4 h-4 rounded-full border ${
                      step === 3
                        ? "bg-[#b08436] border-[#b08436]"
                        : "bg-white border-gray-300"
                    }`}
                  ></div>
                  <p className="mt-4  text-sm tracking-[3px] text-gray-700">
                    SEND INQUIRY
                  </p>
                </div>
              </div>
            </div>
          </div>

          {step === 1 && (
            <>
              {/* ================= 1. Trip Type ================= */}
              <div className=" grid md:grid-cols-2 gap-6 mb-8">
                <div className=" relative">
                  <p className=" text-sm capitalize mb-2">
                    {/* What type of trip are you looking for? */}
                    I'm Interested in...
                  </p>

                  <input
                    type="text"
                    className="w-full border border-[#aba186]/40 px-4 py-3 rounded outline-none"
                    value={form.tripType || ""}
                    onChange={(e) => handleChange("tripType", e.target.value)}
                  />
                  {errors.tripType && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.tripType}
                    </p>
                  )}
                  {/* <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenDropdown(openDropdown === "trip" ? null : "trip");
                    }}
                    className={dropdownClass}
                  >
                    <span>{form.tripType || "Select trip type"}</span>
                    <span>
                      <MdKeyboardArrowDown />
                    </span>
                  </div>

                  {openDropdown === "trip" && (
                    <div className="absolute w-full bg-white mt-2 shadow z-10">
                      {[
                        "We are looking for a bucket list Safari Experience.",
                        "We are looking for a family vacation.",
                        "We are a couple looking for a once-in-a-lifetime experience.",
                        "We are planning a romantic getaway or honeymoon.",
                        "We are a group of friends looking for a bucket list adventure.",
                        "I am a solo traveler.",
                      ].map((opt) => (
                        <div
                          key={opt}
                          onClick={() => {
                            handleChange("tripType", opt);
                            setOpenDropdown(null);
                          }}
                          className={optionsClass}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )} */}
                </div>

                {/* ================= 2. Destinations (Multi) ================= */}
                <div className="relative">
                  <p className=" text-sm capitalize mb-2">
                    Which one of our amazing destinations would you like to go
                    to?
                  </p>

                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenDropdown(openDropdown === "dest" ? null : "dest");
                    }}
                    className={dropdownClass}
                  >
                    <span className="truncate">
                      {form.destinations.length > 0
                        ? form.destinations.join(", ")
                        : "Select destinations"}
                    </span>
                    <MdKeyboardArrowDown className="text-lg" />
                  </div>

                  {openDropdown === "dest" && (
                    <div className="absolute w-full bg-white mt-2  shadow-lg rounded z-10 max-h-60 overflow-y-auto">
                      {[
                        "Botswana",
                        "East Africa - Kenya & Tanzania",
                        "Mozambique",
                        "Namibia",
                        "South Africa",
                        "Zambia",
                        "Zimbabwe",
                        "Multi-Country Trip",
                      ].map((opt) => (
                        <div
                          key={opt}
                          onClick={() => toggleDestination(opt)}
                          className={optionsClass}
                        >
                          <span>{opt}</span>
                          {form.destinations.includes(opt) && (
                            <span className="text-green-600 font-semibold">
                              ✓
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {errors.destinations && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.destinations}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8 ">
                {/* ================= 3. Planning Stage ================= */}
                <div className=" relative">
                  <p className=" text-sm capitalize mb-3 ">
                    How far along are you in your trip planning process?
                  </p>

                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenDropdown(openDropdown === "plan" ? null : "plan");
                    }}
                    className={dropdownClass}
                  >
                    <span>{form.planningStage || "Select stage"}</span>
                    <span>
                      <MdKeyboardArrowDown />
                    </span>
                  </div>

                  {openDropdown === "plan" && (
                    <div className="absolute w-full bg-white mt-2 shadow z-10">
                      {[
                        "I’m just looking at possible options for the moment.",
                        "I have a fair idea of what I would like to do, and am ready to start planning a trip",
                      ].map((opt) => (
                        <div
                          key={opt}
                          onClick={() => {
                            handleChange("planningStage", opt);
                            setOpenDropdown(null);
                          }}
                          className={optionsClass}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                  {errors.planningStage && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.planningStage}
                    </p>
                  )}
                </div>
                {/* ================= 5. Budget ================= */}
                {/* <div className=" relative">
                  <p className=" text-sm capitalize mb-3">
                    What budget do you expect to spend per person, per day on
                    this trip?
                  </p>

                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenDropdown(
                        openDropdown === "budget" ? null : "budget",
                      );
                    }}
                    className={dropdownClass}
                  >
                    <span>{form.budget || "Select budget"}</span>
                    <span>
                      <MdKeyboardArrowDown />
                    </span>
                  </div>

                  {openDropdown === "budget" && (
                    <div className="absolute w-full bg-white mt-2 shadow z-10">
                      {[
                        "Budget : $275",
                        "Luxury : $550",
                        "Premier : $750-$1200",
                      ].map((opt) => (
                        <div
                          key={opt}
                          onClick={() => {
                            handleChange("budget", opt);
                            setOpenDropdown(null);
                          }}
                          className={optionsClass}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </div> */}
                <div className="">
                  <label className=" text-sm capitalize mb-2 block">
                    Travel Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full bg-transparent font-quicksand border border-[#aba186]/40 p-3 rounded outline-none"
                    value={form.travelDate}
                    onChange={(e) => handleChange("travelDate", e.target.value)}
                  />
                  {errors.travelDate && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.travelDate}
                    </p>
                  )}
                </div>
              </div>

              {/* ================= 4. Travellers ================= */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* ================= 6. Travel Date ================= */}

                <div>
                  <label className=" text-sm capitalize mb-2 block">
                    Adults
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={form.adults}
                    onChange={(e) => handleChange("adults", e.target.value)}
                    className="w-full bg-transparent font-quicksand border border-[#aba186]/40 p-3 rounded outline-none placeholder:opacity-60"
                  />
                  {errors.adults && (
                    <p className="text-red-500 text-sm mt-1">{errors.adults}</p>
                  )}
                </div>

                <div>
                  <label className=" text-sm capitalize mb-2 block">
                    Children
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={form.children}
                    onChange={(e) => handleChange("children", e.target.value)}
                    className="w-full bg-transparent font-quicksand border border-[#aba186]/40 p-3 rounded outline-none placeholder:opacity-60"
                  />
                </div>
              </div>

              {/* ================= 7. Interests ================= */}
              <div className="mb-10">
                <label className=" text-sm capitalize mb-2 block">
                  Do you have any specific areas of interest that you would like
                  us to cater for, i.e. Birding, Hiking or Fishing?
                </label>
                <textarea
                  rows="2"
                  className="w-full bg-transparent  font-quicksand border border-[#aba186]/40 p-4 rounded outline-none placeholder:opacity-60"
                  value={form.interests}
                  onChange={(e) => handleChange("interests", e.target.value)}
                />
              </div>

              {/* Next */}
              <div className="text-right">
                <button
                  onClick={() => {
                    if (validateStep1()) {
                      setStep(2);
                    }
                  }}
                  className="font-quicksand cursor-pointer capitalize bg-[#aaa086] border border-[#aaa086] text-white rounded-md px-4 py-2 hover:bg-[#322913b0] transition-colors"
                >
                  NEXT STEP
                </button>
              </div>
            </>
          )}

          {/* ================= STEP 2 ================= */}
          {step === 2 && (
            <>
              {/* ================= 8. Your Details ================= */}
              <div className="mb-10">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* First Name */}
                  <div>
                    <label className=" text-sm capitalize mb-2 block">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter first name"
                      className="w-full border border-[#aba186]/40 px-4 py-3 rounded outline-none"
                      value={form.firstName || ""}
                      onChange={(e) =>
                        handleChange("firstName", e.target.value)
                      }
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className=" text-sm capitalize mb-2 block">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter last name"
                      className="w-full border border-[#aba186]/40 px-4 py-3 rounded outline-none"
                      value={form.lastName || ""}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Email */}
                  <div>
                    <label className=" text-sm capitalize mb-2 block">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Enter email"
                      className="w-full border border-[#aba186]/40 px-4 py-3 rounded outline-none"
                      value={form.email || ""}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className=" text-sm capitalize mb-2 block">
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      className="w-full border border-[#aba186]/40 px-4 py-3 rounded outline-none"
                      value={form.phone || ""}
                      onChange={(e) => handleChange("phone", e.target.value)}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Residency Country */}
                <div className="relative mb-6">
                  <label className="text-sm capitalize mb-2 block">
                    Residency Country
                  </label>

                  {/* Selected */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenDropdown(
                        openDropdown === "country" ? null : "country",
                      );
                    }}
                    className={dropdownClass}
                  >
                    <span className="truncate">
                      {form.country
                        ? `${form.country.name} (${form.country.dial})`
                        : "Select country"}
                    </span>
                    <MdKeyboardArrowDown />
                  </div>

                  {/* Dropdown */}
                  {openDropdown === "country" && (
                    <div className="absolute w-full bg-white mt-2 shadow-lg rounded z-10 max-h-60 overflow-y-auto ">
                      {sortedCountries.map((country) => (
                        <div
                          key={country.code}
                          onClick={() => {
                            handleChange("country", country); // store full object
                            setOpenDropdown(null);
                          }}
                          className={`${optionsClass} flex justify-between`}
                        >
                          <span>{country.name}</span>
                          <span className="text-gray-400 text-xs">
                            {country.dial}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  {errors.country && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.country}
                    </p>
                  )}
                </div>

                {/* Privacy Policy */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={form.acceptPolicy || false}
                    onChange={(e) =>
                      handleChange("acceptPolicy", e.target.checked)
                    }
                  />
                  <p className="text-sm text-gray-600 leading-relaxed">
                    I agree to the{" "}
                    <span className="underline cursor-pointer">
                      Privacy Policy
                    </span>{" "}
                    and consent to being contacted regarding my inquiry.
                  </p>
                </div>
                {errors.acceptPolicy && (
                  <p className="text-red-500 text-sm">{errors.acceptPolicy}</p>
                )}
              </div>

              <div className="my-8">
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                  onChange={(token) => setCaptchaToken(token)}
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="border border-[#aaa086] cursor-pointer rounded-md capitalize px-6 py-2 hover:bg-[#322913b0] hover:text-white"
                >
                  BACK
                </button>

                <button
                  onClick={submitForm}
                  disabled={loading}
                  className=" font-quicksand cursor-pointer capitalize bg-[#aaa086] border border-[#aaa086] text-white rounded-md px-4 hover:bg-[#322913b0] transition-colors"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <div className="text-center py-20">
              <h2 className="text-xl font-semibold">Thank you!</h2>
              <p className="text-gray-500 mt-2">
                Your inquiry has been submitted.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

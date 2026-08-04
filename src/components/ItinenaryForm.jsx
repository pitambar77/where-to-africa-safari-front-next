"use client"
import React, { useState } from "react";
import Link from "next/link";

const ItinenaryForm = ({ onClose, trip }) => {
  const [formData, setFormData] = useState({
    travelDate: "",
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+91",
    phone: "",
    additionalInfo: "",
    contactByEmail: false,
    contactByPhone: false,
    newsUpdates: false,
    pastTraveller: false,
    acceptPolicy: false,
  });

  const [errors, setErrors] = useState({});

  // Handle Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Validation
  const validate = () => {
    let newErrors = {};

    if (!formData.travelDate) newErrors.travelDate = "Travel date is required";

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";

    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email";

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Phone number must contain only digits";
    } else if (formData.phone.length < 7 || formData.phone.length > 12) {
      newErrors.phone = "Phone number must be between 7 and 12 digits";
    }

    // Country code validation
    if (!formData.countryCode) {
      newErrors.phone = "Country code is required";
    }

    if (!formData.acceptPolicy)
      newErrors.acceptPolicy = "You must accept the Privacy Policy";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});

      // ✅ ADD HERE
      const fullPhoneNumber = formData.countryCode + formData.phone;

      const finalData = {
        ...formData,
        phone: fullPhoneNumber, // overwrite with full phone
      };

      console.log("Final Form Data:", finalData);

      alert("Form submitted successfully!");

      // 👉 If calling backend:
      // await axios.post("/api/itinerary", finalData);
    }
  };

  return (
    <div className="flex items-start justify-center p-6">
      <div className="bg-white w-full md:max-w-6xl relative">
        {/* Header */}
        <div className="flex items-start gap-4 p-6 border-b border-[#c7c3bc]">
          <img
            src={trip?.image}
            alt={trip?.title}
            className="w-20 h-16 rounded-lg object-cover"
          />

          <div className="flex-1">
            <h2 className="text-2xl text-[#636363] font-quicksand">
              Request more info for {trip?.title}
            </h2>
            <p className="text-gray-600 mt-1 text-sm">{trip?.subtitle}</p>
          </div>
        </div>

        {/* FORM START */}
        <form onSubmit={handleSubmit}>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10 text-[#636363] font-quicksand">
            {/* LEFT SIDE */}
            <div>
              {/* Travel Date */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">Travel date</h3>
                  <span className="text-sm text-gray-500">*Required</span>
                </div>

                {/* Calendar */}
                <input
                  type="date"
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleChange}
                  className="w-full border border-[#c7c3bc]  rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#636363]"
                />
                {errors.travelDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.travelDate}
                  </p>
                )}
              </div>

              {/* Personal Details */}
              <div>
                <div className="flex justify-between items-center mb-4 font-quicksand">
                  <h3 className="text-lg font-semibold">Personal details</h3>
                  <span className="text-sm text-gray-500">*Required</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name *"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full border border-[#c7c3bc] rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#636363]"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name *"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full border border-[#c7c3bc] rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#636363]"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email *"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-[#c7c3bc] rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#636363]"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* <div>
                    <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                      <div className="px-4 py-3 border-r flex items-center gap-2">
                        🇮🇳 <span className="text-gray-600">+91</span>
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="flex-1 px-4 py-3 focus:outline-none"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div> */}
                  <div>
                    <div className="flex items-center border border-[#c7c3bc] rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-[#636363]">
                      {/* Country Code */}
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="px-4 py-3 border-r  bg-white focus:outline-none"
                      >
                        <option value="+1">🇺🇸 US (+1)</option>
                        <option value="+1">🇨🇦 CA (+1)</option>
                        <option value="+7">🇷🇺 RU (+7)</option>
                        <option value="+20">🇪🇬 EG (+20)</option>
                        <option value="+27">🇿🇦 ZA (+27)</option>
                        <option value="+30">🇬🇷 GR (+30)</option>
                        <option value="+31">🇳🇱 NL (+31)</option>
                        <option value="+32">🇧🇪 BE (+32)</option>
                        <option value="+33">🇫🇷 FR (+33)</option>
                        <option value="+34">🇪🇸 ES (+34)</option>
                        <option value="+36">🇭🇺 HU (+36)</option>
                        <option value="+39">🇮🇹 IT (+39)</option>
                        <option value="+40">🇷🇴 RO (+40)</option>
                        <option value="+41">🇨🇭 CH (+41)</option>
                        <option value="+43">🇦🇹 AT (+43)</option>
                        <option value="+44">🇬🇧 UK (+44)</option>
                        <option value="+45">🇩🇰 DK (+45)</option>
                        <option value="+46">🇸🇪 SE (+46)</option>
                        <option value="+47">🇳🇴 NO (+47)</option>
                        <option value="+48">🇵🇱 PL (+48)</option>
                        <option value="+49">🇩🇪 DE (+49)</option>
                        <option value="+51">🇵🇪 PE (+51)</option>
                        <option value="+52">🇲🇽 MX (+52)</option>
                        <option value="+53">🇨🇺 CU (+53)</option>
                        <option value="+54">🇦🇷 AR (+54)</option>
                        <option value="+55">🇧🇷 BR (+55)</option>
                        <option value="+56">🇨🇱 CL (+56)</option>
                        <option value="+57">🇨🇴 CO (+57)</option>
                        <option value="+58">🇻🇪 VE (+58)</option>
                        <option value="+60">🇲🇾 MY (+60)</option>
                        <option value="+61">🇦🇺 AU (+61)</option>
                        <option value="+62">🇮🇩 ID (+62)</option>
                        <option value="+63">🇵🇭 PH (+63)</option>
                        <option value="+64">🇳🇿 NZ (+64)</option>
                        <option value="+65">🇸🇬 SG (+65)</option>
                        <option value="+66">🇹🇭 TH (+66)</option>
                        <option value="+81">🇯🇵 JP (+81)</option>
                        <option value="+82">🇰🇷 KR (+82)</option>
                        <option value="+84">🇻🇳 VN (+84)</option>
                        <option value="+86">🇨🇳 CN (+86)</option>
                        <option value="+90">🇹🇷 TR (+90)</option>
                        <option value="+91">🇮🇳 IN (+91)</option>
                        <option value="+92">🇵🇰 PK (+92)</option>
                        <option value="+93">🇦🇫 AF (+93)</option>
                        <option value="+94">🇱🇰 LK (+94)</option>
                        <option value="+95">🇲🇲 MM (+95)</option>
                        <option value="+98">🇮🇷 IR (+98)</option>
                        <option value="+212">🇲🇦 MA (+212)</option>
                        <option value="+213">🇩🇿 DZ (+213)</option>
                        <option value="+216">🇹🇳 TN (+216)</option>
                        <option value="+218">🇱🇾 LY (+218)</option>
                        <option value="+220">🇬🇲 GM (+220)</option>
                        <option value="+221">🇸🇳 SN (+221)</option>
                        <option value="+234">🇳🇬 NG (+234)</option>
                        <option value="+254">🇰🇪 KE (+254)</option>
                        <option value="+255">🇹🇿 TZ (+255)</option>
                        <option value="+256">🇺🇬 UG (+256)</option>
                        <option value="+260">🇿🇲 ZM (+260)</option>
                        <option value="+263">🇿🇼 ZW (+263)</option>
                        <option value="+351">🇵🇹 PT (+351)</option>
                        <option value="+352">🇱🇺 LU (+352)</option>
                        <option value="+353">🇮🇪 IE (+353)</option>
                        <option value="+354">🇮🇸 IS (+354)</option>
                        <option value="+355">🇦🇱 AL (+355)</option>
                        <option value="+356">🇲🇹 MT (+356)</option>
                        <option value="+357">🇨🇾 CY (+357)</option>
                        <option value="+358">🇫🇮 FI (+358)</option>
                        <option value="+359">🇧🇬 BG (+359)</option>
                        <option value="+370">🇱🇹 LT (+370)</option>
                        <option value="+371">🇱🇻 LV (+371)</option>
                        <option value="+372">🇪🇪 EE (+372)</option>
                        <option value="+380">🇺🇦 UA (+380)</option>
                        <option value="+381">🇷🇸 RS (+381)</option>
                        <option value="+385">🇭🇷 HR (+385)</option>
                        <option value="+386">🇸🇮 SI (+386)</option>
                        <option value="+387">🇧🇦 BA (+387)</option>
                        <option value="+389">🇲🇰 MK (+389)</option>
                        <option value="+420">🇨🇿 CZ (+420)</option>
                        <option value="+421">🇸🇰 SK (+421)</option>
                        <option value="+852">🇭🇰 HK (+852)</option>
                        <option value="+853">🇲🇴 MO (+853)</option>
                        <option value="+880">🇧🇩 BD (+880)</option>
                        <option value="+971">🇦🇪 AE (+971)</option>
                        <option value="+972">🇮🇱 IL (+972)</option>
                        <option value="+974">🇶🇦 QA (+974)</option>
                        <option value="+975">🇧🇹 BT (+975)</option>
                        <option value="+976">🇲🇳 MN (+976)</option>
                        <option value="+977">🇳🇵 NP (+977)</option>
                        <option value="+992">🇹🇯 TJ (+992)</option>
                        <option value="+993">🇹🇲 TM (+993)</option>
                        <option value="+994">🇦🇿 AZ (+994)</option>
                        <option value="+995">🇬🇪 GE (+995)</option>
                        <option value="+996">🇰🇬 KG (+996)</option>
                        <option value="+998">🇺🇿 UZ (+998)</option>
                      </select>

                      {/* Phone Number */}
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone number"
                        value={formData.phone}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, ""); // remove non-numbers
                          setFormData({ ...formData, phone: value });
                        }}
                        maxLength={12}
                        className="flex-1 px-4 py-3 focus:outline-none"
                      />
                    </div>

                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-6 mt-6 text-sm text-gray-600">
                  <Link href={"/privacy-policy"} type="button" className="underline">
                    Privacy Policy
                  </Link>
                 
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div>
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">
                  Additional Information
                </h3>
                <textarea
                  rows={5}
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  placeholder="What can a Where to Africa expert help you with?"
                  className="w-full border border-[#c7c3bc] rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#636363]"
                />
              </div>

              {/* Contact Preference */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">
                  How would you like us to contact you?
                </h3>

                <div className="flex gap-8">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="contactByEmail"
                      checked={formData.contactByEmail}
                      onChange={handleChange}
                      className="w-5 h-5 border border-[#c7c3bc]"
                    />
                    <span>By Email</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="contactByPhone"
                      checked={formData.contactByPhone}
                      onChange={handleChange}
                      className="w-5 h-5 border border-[#c7c3bc]"
                    />
                    <span>By Phone</span>
                  </label>
                </div>
              </div>

              {/* Tick All */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    Please tick all that apply
                  </h3>
                  <span className="text-sm text-gray-500">*Required</span>
                </div>

                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="newsUpdates"
                      checked={formData.newsUpdates}
                      onChange={handleChange}
                      className="w-5 h-5 mt-1 border border-[#c7c3bc]"
                    />
                    <span>
                      Keep me updated on the latest Where to Africa news, deals
                      and latest trips
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="pastTraveller"
                      checked={formData.pastTraveller}
                      onChange={handleChange}
                      className="w-5 h-5 mt-1 border border-[#c7c3bc]"
                    />
                    <span>I am a Where to Africa past traveller</span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="acceptPolicy"
                      checked={formData.acceptPolicy}
                      onChange={handleChange}
                      className="w-5 h-5 mt-1 border border-[#c7c3bc]"
                    />
                    <span>
                      Please confirm you have read and accept the Where to
                      Africa Privacy Policy*
                    </span>
                  </label>

                  {errors.acceptPolicy && (
                    <p className="text-red-500 text-sm">
                      {errors.acceptPolicy}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Submit */}
          <div className="flex justify-center mt-10">
            <button
              type="submit"
              className="bg-[#ac9e86] text-white font-light tracking-widest py-3 px-8 text-xs sm:text-sm uppercase hover:bg-[#978973] rounded-sm transition duration-200 font-quicksand cursor-pointer"
            >
              Book Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItinenaryForm;

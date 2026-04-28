"use client"
import React, { useState } from "react";
import axios from "axios";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    inquiry: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent letters in phone field
    if (name === "phone") {
      const numericValue = value.replace(/[^0-9+]/g, "");
      setFormData({ ...formData, phone: numericValue });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  // Validation Function
  const validate = () => {
    let newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";

    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9+]{7,15}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (!formData.inquiry) newErrors.inquiry = "Please select inquiry type";

    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await axios.post(
        "http://where-to-africa-safari-backend.manoramaseoservice.com/api/contact",
        formData,
      );

      setSuccess("Message sent successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        inquiry: "",
        message: "",
      });
      setErrors({});
    } catch (error) {
      console.log("Full error:", error);
      console.log("Server response:", error.response?.data);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className=" min-h-screen py-14 ">
        <div className="max-w-5xl mx-auto">
          {/* Top Section */}
          <div className="text-center mb-16">
            <h2 className="font-cormorant font-semibold text-6xl text-[#636363] mt-4">
              Contact Us
            </h2>

            <p className="mt-6  max-w-3xl mx-auto font-quicksand">
              Get in touch with our safari experts to plan your perfect African
              adventure. We provide personalized travel planning, expert advice,
              and full support for your journey.
            </p>
          </div>

          <div className="border-t border-gray-300 pt-16  gap-16">
            {/* LEFT FORM SECTION */}
            <div className="">
              {/* Personal Info */}
              <h3 className="text-sm font-quicksand tracking-widest text-gray-600 uppercase mb-6">
                Personal Info
              </h3>

              {/* FORM WRAPPER */}
              <form onSubmit={handleSubmit}>
                {/* Your existing inputs — only added name, value, onChange */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="*First Name"
                      className="w-full bg-transparent font-quicksand border border-[#aba186]/40 p-4 rounded outline-none placeholder:opacity-60"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="*Last Name"
                      className="w-full bg-transparent font-quicksand border border-[#aba186]/40 p-4 rounded outline-none placeholder:opacity-60"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="*Email Address"
                      className="w-full bg-transparent font-quicksand border border-[#aba186]/40 p-4 rounded outline-none placeholder:opacity-60"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="*Phone"
                      className="w-full bg-transparent font-quicksand border border-[#aba186]/40 p-4 rounded outline-none placeholder:opacity-60"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="mt-12">
                  <h3 className="text-sm tracking-wider font-quicksand text-gray-600 uppercase mb-6">
                    How can we help you?
                  </h3>
                  <select
                    name="inquiry"
                    value={formData.inquiry}
                    onChange={handleChange}
                    className="w-1/2 bg-transparent border font-quicksand border-[#aba186]/40 p-4 rounded-full outline-none placeholder:opacity-60"
                  >
                    <option value="" className="">
                      Select...
                    </option>
                    <option>General Inquiry</option>
                    <option>Reservations</option>
                    <option>Support</option>
                  </select>
                  {errors.inquiry && (
                    <p className="text-red-500 text-sm">{errors.inquiry}</p>
                  )}
                </div>

                <div className="mt-12">
                  <h3 className="text-sm tracking-wider font-quicksand text-gray-600 uppercase mb-6">
                    Please tell us a little more:
                  </h3>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    placeholder="*Provide more information here"
                    className="w-full bg-transparent font-quicksand border border-[#aba186]/40 p-4 rounded resize-none outline-none placeholder:opacity-60"
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm">{errors.message}</p>
                  )}
                </div>

                <div className="mt-12">
                  <button
                    type="submit"
                    className="bg-[#aba186] hover:bg-[#78715d] text-white cursor-pointer px-8 py-3 rounded-full"
                  >
                    Submit
                  </button>
                </div>

                {success && <p className="text-green-600 mt-4">{success}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ================= INQUIRIES SECTION ================= */}

      <div className="bg-[#f5f5f3] py-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Top Divider Lines */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-12">
            <div className="border-t border-gray-400"></div>
            <div className="border-t border-gray-400"></div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 ">
            {/* North America */}
            <div>
              <h3 className="font-cormorant uppercase text-[#636363] text-2xl font-semibold mb-4">
                Durban, South Africa
              </h3>

              <p className="font-semibold text-[#aca288] font-quicksand ">
                Contact Number:
              </p>
              <p className="mb-4 font-quicksand">+27(0)315352811</p>

              <p className="font-semibold text-[#aca288] font-quicksand ">
                Email:
              </p>
              <p className="mb-4 font-quicksand">res@todo.africa</p>

              <p className="font-semibold text-[#aca288] font-quicksand ">
                Address:
              </p>
              <p className=" mb-4 font-quicksand">
                1 Underwood Lodge, 34 Underwood Road Umgeni Park, Durban 4050,
                KwaZulu Natal, South Africa
              </p>
            </div>

            {/* International - Email */}
            <div>
              <h3 className="font-cormorant uppercase text-[#636363] text-2xl font-semibold mb-4">
                Victoria Falls, Zimbabwe
              </h3>

              <p className="font-semibold text-[#aca288] font-quicksand ">
                Contact Number:
              </p>
              <p className="mb-4 font-quicksand ">+27(0)315352811</p>

              <p className="font-semibold text-[#aca288] font-quicksand ">
                Email:
              </p>
              <p className="mb-4 font-quicksand">spiwe@whereto.africa</p>

              <p className="font-semibold text-[#aca288] font-quicksand ">
                Address:
              </p>
              <p className=" mb-4 font-quicksand">
                1 Mallet Drive, Victoria Falls, Zimbabwe
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;

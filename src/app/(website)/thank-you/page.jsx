"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-[#aca188] flex items-center justify-center px-4">
      <div className="max-w-[1120px] w-full bg-[#fff] rounded-md shadow-lg p-8 md:p-12 my-18  text-center">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-[#e8e3d9] flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-[#aca188]" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="mt-8 text-3xl md:text-4xl font-semibold tracking-wide uppercase text-[#3c4655]">
          Thank You!
        </h1>

        {/* Message */}
        <p className="mt-5 text-gray-600 leading-7">
          Your enquiry has been successfully submitted.
          <br />
          Thank you for contacting us.
        </p>

        <p className="mt-4 text-gray-600 leading-7">
          Our safari specialists have received your request and will get back to
          you as soon as possible with personalized recommendations and further
          details.
        </p>

        {/* Information Box */}
        <div className="mt-8 bg-[#f7f3ef] rounded-md p-6 text-left">
          <h2 className="font-semibold text-[#3c4655] mb-3">
            What happens next?
          </h2>

          <ul className="space-y-2 text-gray-600 list-disc pl-5">
            <li>Our team will review your enquiry.</li>
            <li>We'll contact you via email or phone.</li>
            <li>You'll receive a customized itinerary and quotation.</li>
            <li>Our travel experts will assist you with any questions.</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-[#aca188] text-white hover:bg-[#96886f] transition"
          >
            Back to Home
          </Link>

          {/* <Link
            href="/destinations"
            className="px-6 py-3 rounded-full border border-[#aca188] text-[#aca188] hover:bg-[#aca188] hover:text-white transition"
          >
            Explore Destinations
          </Link> */}
        </div>
      </div>
    </div>
  );
}

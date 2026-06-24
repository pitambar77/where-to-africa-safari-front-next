import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#1b1b1b] text-[#d9d9d9] ">
      <div className="max-w-[1320px] mx-auto px-4 py-16 grid lg:grid-cols-[280px_1fr] gap-12">
        {/* Logo Section */}
        <div className="flex flex-col items-start">
          <div className="relative w-60 h-20">
            <Image
              src="/whereto-logo.webp"
              alt="Where To Africa Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Right Side Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 font-cormorant">
          {/* Quick Links */}
          <div>
            <h4 className="text-[#c2bfae] text-lg font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm font-quicksand flex flex-col">
              <Link href="/">Home</Link>
              <Link href="/about-us">About Us</Link>
              <Link href="/contact-us">Contact Us</Link>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[#c2bfae] text-lg font-semibold mb-4">
              Services
            </h4>
            <ul className="space-y-2 text-sm font-quicksand flex flex-col">
              <Link href="/accommodations">Retreats</Link>
              <Link href="/packages">Journey</Link>
              <Link href="/experiences">Experience</Link>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-[#c2bfae] text-lg font-semibold mb-4">
              Useful Links
            </h4>
            <ul className="space-y-2 text-sm font-quicksand flex flex-col">
              <Link href="/conservation">Conservation</Link>
              <Link href="/blogs">Blogs</Link>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#c2bfae] text-lg font-semibold mb-4">
              Contact
            </h4>
            <div className="flex flex-col space-y-2 text-sm font-quicksand">
              <p>Phone: +27(0)315352811</p>
              <p>Email: spiwe@whereto.africa</p>
            </div>
          </div>

          {/* Review Widget */}
          <div>
            <iframe
              frameBorder="1"
              src="https://www.kiyoh.com/retrieve-widget.html?color=white&allowTransparency=false&button=true&lang=en&tenantId=98&locationId=1079908"
              width="180"
              height="120"
            />
          </div>
        </div>
      </div>
      <div className=" bg-black/80 py-6 flex gap-4 justify-center font-quicksand">
        <p>
          AlI rights reserved © 2026 Where to Africa, Design by{" "}
          <a
            href="https://safarimarketingpro.com/"
            className=" hover:underline"
          >
            Safari Marketing Pro
          </a>
        </p>
        <ul className=" flex gap-4">
          <li>
            <a href="#" className=" text-amber-300/80">
              Privacy Policy
            </a>
          </li>
          {/* <li>
            <a href="#" className="write_teram">
              Website Terms of Use
            </a>
          </li>
          <li>
            <a href="#" className=" text-amber-300/80">
              Payment Conditions
            </a>
          </li> */}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

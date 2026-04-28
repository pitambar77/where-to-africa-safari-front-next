import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#1b1b1b] text-[#d9d9d9] ">
      <div className="max-w-[1320px] mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Logo Section */}
        <div className="md:col-span-2 flex flex-col items-start">
          <div className="relative w-60 h-20 mb-4">
            <Image
              src="/whereto-logo.webp"
              alt="Where To Africa Logo"
              fill
              className="object-contain"
            />
          </div>
          {/* <p className="text-sm text-[#c2bfae] tracking-wide">
            AFRICA TRAVEL AND TOURS
          </p> */}
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 md:col-span-3 gap-8 font-cormorant">
          {/* Column 1 */}
          <div>
            <h4 className="text-[#c2bfae] text-lg font-semibold mb-4">
              Quick links
            </h4>
            <ul className="space-y-2 text-sm font-quicksand flex flex-col">
              <Link
                href={"/"}
                className="hover:text-[#c2bfae] cursor-pointer transition"
              >
                Home
              </Link>
              <Link
                href={"/about-us"}
                className="hover:text-[#c2bfae] cursor-pointer transition"
              >
                About Us
              </Link>

              <Link
                href={"/contact-us"}
                className="hover:text-[#c2bfae] cursor-pointer transition"
              >
                Contact Us
              </Link>
            </ul>
          </div>
          {/* Column 2 */}
          <div>
            <h4 className="text-[#c2bfae] text-lg font-semibold mb-4  ">
              Services
            </h4>
            <ul className="space-y-2 text-sm font-quicksand flex flex-col">
              <Link
                href={"/accommodations"}
                className="hover:text-[#c2bfae] cursor-pointer transition"
              >
                Retreats
              </Link>
              <Link
                href={"/packages"}
                className="hover:text-[#c2bfae] cursor-pointer transition"
              >
                Journey
              </Link>
              <Link
                href={"/experiences"}
                className="hover:text-[#c2bfae] cursor-pointer transition"
              >
                Experience
              </Link>
            </ul>
          </div>

          <div>
            <h4 className="text-[#c2bfae] text-lg font-semibold mb-4">
              Useful Links
            </h4>
            <ul className="space-y-2 text-sm font-quicksand flex flex-col">
              <Link
                href={"/conservation"}
                className="hover:text-[#c2bfae] cursor-pointer transition"
              >
                Conservation
              </Link>
              <Link
                href=""
                className="hover:text-[#c2bfae] cursor-pointer transition"
              >
                Blogs
              </Link>
              {/* <Link className="hover:text-[#c2bfae] cursor-pointer transition">
                Brochure
              </Link> */}
            </ul>
          </div>

          {/* Column 3 */}

          <div>
            <h4 className="text-[#c2bfae] text-lg font-semibold mb-4  ">
              Contact
            </h4>
            <div className=" flex flex-col space-y-2">
              <p>Phone: +27(0)315352811</p>
              <p>Email:spiwe@whereto.africa</p>
            </div>
          </div>
          {/* Column 4 */}
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

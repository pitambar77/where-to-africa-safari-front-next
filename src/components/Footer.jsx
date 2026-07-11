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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 font-cormorant">
          {/* Quick Links */}
          <div>
            <h4 className="text-[#c2bfae] text-lg font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm font-quicksand flex flex-col">
              <Link href="/">Home</Link>
              <Link href="/about-us">About Us</Link>
              <Link href="/contact-us">Contact Us</Link>
              <Link href="/accommodations">Retreats</Link>
              <Link href="/packages">Journey</Link>
              <Link href="/experiences">Experience</Link>
            </ul>
          </div>

          {/* Services */}
          {/* <div>
            <h4 className="text-[#c2bfae] text-lg font-semibold mb-4">
              Services
            </h4>
            <ul className="space-y-2 text-sm font-quicksand flex flex-col">
              <Link href="/accommodations">Retreats</Link>
              <Link href="/packages">Journey</Link>
              <Link href="/experiences">Experience</Link>
            </ul>
          </div> */}

          {/* Useful Links */}
          {/* <div>
            <h4 className="text-[#c2bfae] text-lg font-semibold mb-4">
              Useful Links
            </h4>
            <ul className="space-y-2 text-sm font-quicksand flex flex-col">
              <Link href="/conservation">Conservation</Link>
              <Link href="/blogs">Blogs</Link>
            </ul>
          </div> */}

          <div>
            <h4 className="text-[#c2bfae] text-lg font-semibold mb-4">
              South African Office
            </h4>
            <div className="flex flex-col space-y-2 text-sm font-quicksand">
              <p>Tel: +27 31 535 2811</p>
              <p>M : +27 83 625 3607</p>
              <p>Email: res@whereto.africa</p>
              <p>
                Unit 1 Underwood Lodge, 34 Underwood Road, Umgeni Park, 4051
                Durban
              </p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#c2bfae] text-lg font-semibold mb-4">
              Zimbabwe Office
            </h4>
            <div className="flex flex-col space-y-2 text-sm font-quicksand">
              <p>Phone: +263 77 538 6228</p>
              <p>Email: spiwe@whereto.africa</p>
              <p>1 Mallet Drive, Victoria Falls, Zimbabwe</p>
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
      {/* <div className=" bg-black/80 py-6 flex gap-4 justify-center font-quicksand">
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
        </ul>
      </div> */}
      <div className="bg-black/80 py-6 px-4">
        <div className="max-w-[1320px] mx-auto flex flex-col-reverse md:flex-row items-center justify-center gap-4 font-quicksand text-center">
          {/* Copyright */}
          <p>
            All rights reserved © 2026 Where to Africa, Design by{" "}
            <a
              href="https://safarimarketingpro.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Safari Marketing Pro
            </a>
          </p>

          {/* Privacy Policy */}
          <ul className="flex gap-4">
            <li>
              <a
                href="/privacy-policy"
                className="text-amber-300/80 hover:text-amber-300"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

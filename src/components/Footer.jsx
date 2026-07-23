import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getFooter } from "@/api/footerAPI.js";

const Footer = async () => {
  const footer = await getFooter();
  return (
    <footer className="bg-[#1b1b1b] text-[#d9d9d9] ">
      <div className="max-w-[1320px] mx-auto px-4 py-16 grid lg:grid-cols-[280px_1fr] gap-12">
        {/* Logo Section */}
        <div className="flex flex-col items-start">
          <div className="relative w-60 h-20">
            <Image
              src={footer?.logo || "/whereto-logo.webp"}
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
            {/* <ul className="space-y-2 text-sm font-quicksand flex flex-col">
              <Link href="/">Home</Link>
              <Link href="/about-us">About Us</Link>
              <Link href="/contact-us">Contact Us</Link>
              <Link href="/accommodations">Retreats</Link>
              <Link href="/packages">Journey</Link>
              <Link href="/experiences">Experience</Link>
            </ul> */}
            <ul className="space-y-2 text-sm font-quicksand flex flex-col">
              {footer?.quickLinks?.map((link) => (
                <Link key={link._id || link.url} href={link.url}>
                  {link.title}
                </Link>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#c2bfae] text-lg font-semibold mb-4">
              {footer?.southAfricaOffice?.title}
            </h4>
            <div className="flex flex-col space-y-2 text-sm font-quicksand">
              <p>{footer?.southAfricaOffice?.phone}</p>
              <p>{footer?.southAfricaOffice?.mobile}</p>
              <p>{footer?.southAfricaOffice?.email}</p>
              <p>{footer?.southAfricaOffice?.address}</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#c2bfae] text-lg font-semibold mb-4">
              {footer?.zimbabweOffice?.title}
            </h4>
            <div className="flex flex-col space-y-2 text-sm font-quicksand">
              <p>{footer?.zimbabweOffice?.phone}</p>
              <p>{footer?.zimbabweOffice?.mobile}</p>
              <p>{footer?.zimbabweOffice?.email}</p>
              <p>{footer?.zimbabweOffice?.address}</p>
            </div>
          </div>

          {/* Review Widget */}
          <div>
            {footer?.reviewWidget && (
              <iframe
                src={footer.reviewWidget}
                width="180"
                height="120"
                frameBorder="1"
              />
            )}
          </div>
        </div>
      </div>

      <div className="bg-black/80 py-6 px-4">
        <div className="max-w-[1320px] mx-auto flex flex-col-reverse md:flex-row items-center justify-center gap-4 font-quicksand text-center">
          {/* Copyright */}
          <p>
          {footer?.copyright}, Design by{" "}
            <a
              href={footer?.designerLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {footer?.designerName}
            </a>
          </p>

          {/* Privacy Policy */}
          <ul className="flex gap-4">
           <li>
              <Link
                href={footer?.privacyPolicyLink || "/privacy-policy"}
                className="text-amber-300/80 hover:text-amber-300"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa6";
import { IoMenu, IoClose } from "react-icons/io5";
import { getAllDestinations } from "../api/destinationAPI.js";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // desktop dropdown
  const [isMobileDropdown, setIsMobileDropdown] = useState(false); // mobile dropdown
  const [isMobile, setIsMobile] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await getAllDestinations();
        const sorted = res.data.sort((a, b) => a.name.localeCompare(b.name));
        setDestinations(sorted);
      } catch (err) {
        console.error("Failed to fetch destinations", err);
      }
    };
    fetchDestinations();
  }, []);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile) {
      clearTimeout(hoverTimeout);
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      const timeout = setTimeout(() => setIsOpen(false), 150);
      setHoverTimeout(timeout);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-[100]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-4 lg:px-8 xl:px-0 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="w-28 md:w-30 flex-shrink-0">
            <img src="/whereto-logo.webp" alt="Safari Logo" />
          </Link>

          {/* Desktop Menu */}
          {/* <nav className="hidden lg:flex space-x-8 uppercase font-quicksand text-sm font-medium text-gray-600"> */}
          <nav className="hidden lg:flex flex-1 justify-center gap-6 lg:gap-4 xl:gap-8 uppercase font-quicksand text-sm font-medium text-gray-600">
            {/* Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center gap-2 uppercase hover:text-[#f25922]">
                Destinations
                <FaChevronDown
                  className={`text-xs transition ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute left-0 top-full w-56 mt-2 bg-white rounded-lg shadow-md z-50"
                  >
                    {destinations.map((d) => (
                      <li key={d._id}>
                        <Link
                          href={`/${d.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="block px-5 py-2.5 hover:bg-[#f25922]/10 hover:text-[#f25922]"
                        >
                          {d.name}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            <Link href="/packages" className="hover:text-[#f25922]">
              Journey
            </Link>
            <Link href="/accommodations" className="hover:text-[#f25922]">
              Retreats
            </Link>
            <Link href="/experiences" className="hover:text-[#f25922]">
              Experiences
            </Link>
            <Link href="/about-us" className="hover:text-[#f25922]">
              About Us
            </Link>
            <Link href="#" className="hover:text-[#f25922]">
              Blogs
            </Link>
            <Link href="/conservation" className="hover:text-[#f25922]">
              Conservation
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            <Link
              href="/contact-us"
              className="hidden md:inline-block bg-[#aaa086] text-white px-4 py-2 rounded-md text-sm hover:bg-[#f25922]"
            >
              Contact Us
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setIsMobileMenu(true)}
              className="lg:hidden text-gray-700 hover:text-[#f25922] p-2"
            >
              <IoMenu className="text-4xl text-[#aaa086]" />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenu && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-full h-full bg-white z-[200] p-6 overflow-y-auto"
          >
            {/* Top */}
            <div className="flex justify-between items-center mb-6">
              <img src="/whereto-logo.webp" className="w-28" />
              <button onClick={() => setIsMobileMenu(false)}>
                <IoClose className="text-2xl text-[#aaa086] cursor-pointer" />
              </button>
            </div>

            {/* Menu */}
            <div className="flex flex-col gap-4  uppercase font-quicksand text-sm font-medium text-gray-600">
              {/* Mobile Dropdown */}
              <div>
                <button
                  onClick={() => setIsMobileDropdown(!isMobileDropdown)}
                  className="flex justify-between w-full uppercase "
                >
                  Destinations
                  <FaChevronDown
                    className={`transition text-[#aaa086] cursor-pointer ${
                      isMobileDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isMobileDropdown && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden "
                    >
                      {destinations.map((d) => (
                        <Link
                          key={d._id}
                          href={`/${d.slug}`}
                          onClick={() => {
                            setIsMobileMenu(false);
                            setIsMobileDropdown(false);
                          }}
                          className="block py-2 pl-4  "
                        >
                          {d.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/packages" onClick={() => setIsMobileMenu(false)}>
                Journey
              </Link>
              <Link href="/accommodations" onClick={() => setIsMobileMenu(false)}>
                Retreats
              </Link>
              <Link href="/experiences" onClick={() => setIsMobileMenu(false)}>
                Experiences
              </Link>
              <Link href="/about-us" onClick={() => setIsMobileMenu(false)}>
                About Us
              </Link>
              <Link href="/conservation" onClick={() => setIsMobileMenu(false)}>
                Conservation
              </Link>

              <Link
                href="/contact-us"
                onClick={() => setIsMobileMenu(false)}
                className="bg-[#aaa086] text-white px-4 py-2 rounded-md text-center mt-4"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

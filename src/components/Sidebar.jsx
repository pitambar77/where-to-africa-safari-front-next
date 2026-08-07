"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaMapMarkedAlt,
  FaUmbrellaBeach,
  FaHotel,
  FaRoute,
  FaChevronDown,
} from "react-icons/fa";
import { useState } from "react";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState("Blogs");

  const pathname = usePathname();

  const links = [
    {
      name: "Destinations",
      path: "/dashboard/destinations",
      icon: <FaMapMarkedAlt />,
    },
    {
      name: "Blogs",
      icon: <FaMapMarkedAlt />,
      children: [
        {
          name: "All Blogs",
          path: "/dashboard/blog",
        },
        {
          name: "Category",
          path: "/dashboard/blog/category",
        },
        {
          name: "Author",
          path: "/dashboard/blog/author",
        },
      ],
    },
    {
      name: "Experience Landing",
      path: "/dashboard/experiences/landing",
      icon: <FaUmbrellaBeach />,
    },
    {
      name: "Experiences",
      path: "/dashboard/experiences",
      icon: <FaUmbrellaBeach />,
    },
    { name: "Packages", path: "/dashboard/trips", icon: <FaRoute /> },
    {
      name: "Packages landing",
      path: "/dashboard/itinenarylanding",
      icon: <FaRoute />,
    },
    {
      name: "Accommodations",
      path: "/dashboard/accommodations",
      icon: <FaHotel />,
    },
    {
      name: "Accommodations landing",
      path: "/dashboard/accommodations/landing",
      icon: <FaHotel />,
    },
    {
      name: "About us",
      path: "/dashboard/aboutus",
      icon: <FaHotel />,
    },
    { name: "Travel Guide", path: "/dashboard/travelguide", icon: <FaHotel /> },
    {
      name: "Travelguidelist",
      path: "/dashboard/travelguidelist",
      icon: <FaHotel />,
    },
    {
      name: "Conservation",
      path: "/dashboard/conservation",
      icon: <FaHotel />,
    },
    {
      name: "Contact us",
      path: "/dashboard/contactus",
      icon: <FaHotel />,
    },
    {
      name: "Footer",
      path: "/dashboard/footer",
      icon: <FaHotel />,
    },
    {
      name: "Home",
      path: "/dashboard/homepage",
      icon: <FaHotel />,
    },
  ];

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen flex flex-col p-5">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Panel</h1>

      {/* <nav className="flex flex-col gap-3">
        {links.map((link) => {
          const isActive = pathname === link.path;

          return (
            <Link
              key={link.name}
              href={link.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                isActive ? "bg-gray-700" : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          );
        })}
      </nav> */}
      <nav className="flex flex-col gap-2">
        {links.map((link) => {
          if (link.children) {
            return (
              <div key={link.name}>
                <button
                  onClick={() =>
                    setOpenMenu(openMenu === link.name ? "" : link.name)
                  }
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-gray-300 hover:bg-gray-800"
                >
                  <div className="flex items-center gap-3">
                    {link.icon}
                    {link.name}
                  </div>

                  <FaChevronDown
                    className={`transition-transform ${
                      openMenu === link.name ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openMenu === link.name && (
                  <div className="ml-8 mt-2 flex flex-col gap-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.path}
                        href={child.path}
                        className={`rounded-lg px-3 py-2 text-sm ${
                          pathname === child.path
                            ? "bg-gray-700 text-white"
                            : "text-gray-400 hover:bg-gray-800"
                        }`}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={link.path}
              href={link.path}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname === link.path
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaMapMarkedAlt,
  FaUmbrellaBeach,
  FaHotel,
  FaRoute,
} from "react-icons/fa";

const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    {
      name: "Destinations",
      path: "/dashboard/destinations",
      icon: <FaMapMarkedAlt />,
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
    { name: "Packages landing", path: "/dashboard/itinenarylanding", icon: <FaRoute /> },
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
    { name: "Travelguidelist", path: "/dashboard/travelguidelist", icon: <FaHotel /> },
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
    }
  ];

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen flex flex-col p-5">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Panel</h1>

      <nav className="flex flex-col gap-3">
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
      </nav>
    </div>
  );
};

export default Sidebar;

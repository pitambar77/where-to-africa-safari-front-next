// src/data/amenityIcons.js
import {
  FaWifi,
  FaSwimmingPool,
  FaParking,
  FaUtensils,
  FaTv,
  FaSnowflake,
  FaSpa,
  FaDumbbell,
  FaConciergeBell,
} from "react-icons/fa";
import { MdLocalLaundryService, MdPets, MdOutlineRoomService } from "react-icons/md";

export const amenityIcons = [
  { name: "WiFi", icon: FaWifi },
  { name: "Swimming Pool", icon: FaSwimmingPool },
  { name: "Parking", icon: FaParking },
  { name: "Restaurant", icon: FaUtensils },
  { name: "TV", icon: FaTv },
  { name: "Air Conditioning", icon: FaSnowflake },
  { name: "Spa", icon: FaSpa },
  { name: "Gym", icon: FaDumbbell },
  { name: "Laundry", icon: MdLocalLaundryService },
  { name: "Pets Allowed", icon: MdPets },
  { name: "Room Service", icon: MdOutlineRoomService },
  { name: "Concierge", icon: FaConciergeBell },
];

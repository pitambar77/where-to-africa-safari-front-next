// import React from "react";
// import { FaSailboat } from "react-icons/fa6";
// import {  FaDove, FaHelicopter, FaPlane, FaFish, FaGolfBall, FaHiking, FaChild, FaUtensils, FaCity, FaMountain, FaSpa, FaWineBottle } from "react-icons/fa"; // example icons
// import Overview from "../../../components/Overview";

// const activities = [
//   { icon: <FaSailboat size={22} color="white" />, label: "Boat Trip" },
//   { icon: <FaDove size={22} color="white" />, label: "Ocean Safari" },
//   { icon: <FaHelicopter size={22} color="white" />, label: "Helicopter Flights" },
//   { icon: <FaPlane size={22} color="white" />, label: "Scenic Flights" },
//   { icon: <FaFish size={22} color="white" />, label: "Shark Diving" },
//   { icon: <FaHiking size={22} color="white" />, label: "Hiking" },
//   { icon: <FaGolfBall size={22} color="white" />, label: "Golf" },
//   { icon: <FaChild size={22} color="white" />, label: "Kids Club" },
//   { icon: <FaUtensils size={22} color="white" />, label: "Food Experiences" },
//   // { icon: <FaCity size={22} color="white" />, label: "City Sights" },
//   { icon: <FaMountain size={22} color="white" />, label: "Natural Wonders" },
//   { icon: <FaSpa size={22} color="white" />, label: "Wellness/Spa" },
//   { icon: <FaWineBottle size={22} color="white" />, label: "Wine Tour" },
// ];

// const ActivitiesSection = () => {
//   return (
//     <div className="bg-[#faf5e9]">
//        <Overview
//           title="Welcome To Africa"
//           subtitle="African landscapes parading with the circle of life promise magical moments unlike any you have imagined before. You'll find them..."
//           description="Here at Newmark, we have an incredible variety of restaurants and bars across our beautiful properties, from ocean-side dining to city-chic Asian tapas and whimsical bougainvillea-clad courtyards. Find out more information below"
//         />
//       <div className="px-4 md:px-10 lg:px-16 xl:px-20 2xl:px-28 pb-16 ">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-10 justify-center ">
//           {activities.map((item, index) => (
//             <div
//               key={index}
//               className="flex  items-center text-center gap-x-4 relative group"
//             >
                
//               {/* Icon Circle */}
//               <div className="bg-[#a89f82] w-10 h-10 flex items-center justify-center rounded-full mb-3 group-hover:scale-105 transition-transform duration-300">
//                 {item.icon}
//               </div>

//               {/* Label */}
//               <p className="text-[#333] text-lg font-quicksand">{item.label}</p>

//               {/* Divider line */}
//               <span className="absolute bottom-[-12px] left-0 right-0 h-[1px] bg-[#c8c0a6]"></span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ActivitiesSection;


// import React from "react";
// import Overview from "../../../components/Overview";

// const ActivitiesSection = ({ title, subtitle, description, activities }) => {
//   return (
//     <div className="bg-[#faf5e9]">
//       <Overview
//         title={title}
//         subtitle={subtitle}
//         description={description}
//       />
//       <div className="px-4 md:px-10 lg:px-16 xl:px-20 2xl:px-28 pb-16">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-10 justify-center">
//           {activities?.map((item, index) => (
//             <div
//               key={index}
//               className="flex items-center text-center gap-x-4 relative group"
//             >
//               {/* Icon Circle */}
//               <div className="bg-[#a89f82] w-10 h-10 flex items-center justify-center rounded-full mb-3 group-hover:scale-105 transition-transform duration-300">
//                 {item.icon}
//               </div>

//               {/* Label */}
//               <p className="text-[#333] text-lg font-quicksand">{item.label}</p>

//               {/* Divider line */}
//               <span className="absolute bottom-[-12px] left-0 right-0 h-[1px] bg-[#c8c0a6]"></span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ActivitiesSection;

import React from "react";
import Overview from "../../../components/Overview";

const ActivitiesSection = ({ title, subtitle, description, activities = [] }) => {
  return (
    <div className="bg-[#faf5e9]">
      <Overview title={title} subtitle={subtitle} description={description} />

      <div className=" max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-0 pb-8 sm:pb-10 md:pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-5 md:gap-y-10 gap-x-10">
          {activities.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-x-4 relative group"
            >
              {/* Amenity Image */}
              <div className="bg-[#a89f82] w-12 h-12 flex items-center justify-center rounded-full overflow-hidden">
                <img
                  src={item.amenityImage}
                  alt={item.amenityName}
                  className="w-6 h-6 object-contain"
                />
              </div>

              {/* Amenity Name */}
              <p className="text-[#333] text-lg font-quicksand">
                {item.amenityName}
              </p>

              {/* Divider */}
              <span className="absolute bottom-[-12px] left-0 right-0 h-[1px] bg-[#c8c0a6]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivitiesSection;



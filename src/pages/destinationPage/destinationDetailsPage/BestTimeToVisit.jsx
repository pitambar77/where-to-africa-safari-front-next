

// import React, { useState } from "react";

// const monthData = [
//   {
//     name: "Jan",
//     season: "Summer Season",
//     rating: "Excellent",
//     color: "bg-[#A5D6A7]",
//     description: [
//       "January is one of the best months to visit South Africa, with warm temperatures and sunny days perfect for outdoor adventures.",
//       "Enjoy beautiful beaches, safari drives, and vibrant city life in Cape Town and Johannesburg.",
//       "Expect some crowds, as it’s peak travel season for locals and tourists alike.",
//     ],
//   },
//   {
//     name: "Feb",
//     season: "Summer Season",
//     rating: "Excellent",
//     color: "bg-[#A5D6A7]",
//     description: [
//       "February continues the warm, sunny conditions ideal for beach days and game drives.",
//       "Cape Town’s wine festivals and outdoor dining experiences are in full swing.",
//       "It’s a great time to enjoy both the coast and wildlife reserves.",
//     ],
//   },
//   {
//     name: "Mar",
//     season: "Autumn Begins",
//     rating: "Excellent",
//     color: "bg-[#A5D6A7]",
//     description: [
//       "March offers slightly cooler weather, fewer crowds, and amazing scenery.",
//       "Perfect for hiking, safari, and photography with clear skies and lush landscapes.",
//       "Still warm enough for coastal activities and cultural experiences.",
//     ],
//   },
//   {
//     name: "Apr",
//     season: "Autumn",
//     rating: "Good",
//     color: "bg-[#F1F8C0]",
//     description: [
//       "April brings mild temperatures and fewer tourists, great for relaxed travel.",
//       "Wildlife spotting improves as vegetation thins.",
//       "Ideal for exploring cities, vineyards, and nature reserves alike.",
//     ],
//   },
//   {
//     name: "May",
//     season: "Wet Season",
//     rating: "Mixed",
//     color: "bg-[#E1D7F8]",
//     description: [
//       "Expect some rain in Cape Town over the course of a lengthy stay, with day length shortening and temperatures remaining mild.",
//       "The shift in the weather means beach relaxation is not always an option, leaving the many boutique shops and beachfront eateries a must, especially in the nearby coastal towns of St James and Kalk Bay.",
//       "This is the perfect time of year to indulge the taste buds with culinary delights and wine tastings, both readily available with relatively few tourists around.",
//       "The indoor markets bursting with fresh produce and homemade delights combine well with cultural explorations or a trip to the trendy V&A Waterfront.",
//       "If you are wanting a little adventure, the winter months are considered the best for Great White shark cage diving, with the sharks at their most active.",
//     ],
//   },
//   {
//     name: "Jun",
//     season: "Winter",
//     rating: "Mixed",
//     color: "bg-[#E1D7F8]",
//     description: [
//       "Cooler weather makes it perfect for safaris and wildlife spotting.",
//       "Cape Town experiences rain, but landscapes are lush and green.",
//     ],
//   },
//   {
//     name: "Jul",
//     season: "Winter",
//     rating: "Mixed",
//     color: "bg-[#E1D7F8]",
//     description: [
//       "July is ideal for safari lovers as animals gather around water sources.",
//       "Expect chilly evenings and occasional rain in the Cape.",
//     ],
//   },
//   {
//     name: "Aug",
//     season: "Winter",
//     rating: "Good",
//     color: "bg-[#F1F8C0]",
//     description: [
//       "August marks the start of wildflower season in the Western Cape.",
//       "Great time for scenic drives and wildlife safaris.",
//     ],
//   },
//   {
//     name: "Sep",
//     season: "Spring",
//     rating: "Good",
//     color: "bg-[#F1F8C0]",
//     description: [
//       "Spring begins with mild temperatures and blooming landscapes.",
//       "A beautiful time to explore both coastal and inland areas.",
//     ],
//   },
//   {
//     name: "Oct",
//     season: "Spring",
//     rating: "Excellent",
//     color: "bg-[#A5D6A7]",
//     description: [
//       "October offers warm weather and fewer crowds — perfect for adventure and relaxation.",
//       "Ideal for whale watching and outdoor exploration.",
//     ],
//   },
//   {
//     name: "Nov",
//     season: "Early Summer",
//     rating: "Excellent",
//     color: "bg-[#A5D6A7]",
//     description: [
//       "November welcomes summer with long, sunny days and vibrant energy.",
//       "Perfect time for safaris, beaches, and festive events.",
//     ],
//   },
//   {
//     name: "Dec",
//     season: "Summer",
//     rating: "Excellent",
//     color: "bg-[#A5D6A7]",
//     description: [
//       "December is lively and festive, with perfect beach weather.",
//       "Expect crowds and higher prices, but amazing summer vibes.",
//     ],
//   },
// ];

// export default function BestTimeToVisit() {
//   const [hoveredMonth, setHoveredMonth] = useState(monthData[4]); // Default: May

//   return (
//     <section className="px-4 md:px-10 lg:px-16 xl:px-20 2xl:px-48 py-16 text-[#2e2c2d] font-quicksand">

//  <div className="text-center   mb-14 font-cormorant">
//         <p className="text-center text-2xl md:text-3xl font-normal  text-[#a89f82] uppercase mb-6">
//          Best time to visit
//         </p>
//         <h2 className="text-6xl  mb-10  text-[#636363] capitalize font-normal">
//           When to go on a Cape Town Trip
//         </h2>
//         </div>

//       {/* Legend */}
//       <div className="flex justify-center gap-6 text-sm mb-6">
//         <div className="flex items-center gap-2">
//           <span className="w-4 h-4 rounded-full bg-[#A5D6A7]"></span> Excellent
//         </div>
//         <div className="flex items-center gap-2">
//           <span className="w-4 h-4 rounded-full bg-[#F1F8C0]"></span> Good
//         </div>
//         <div className="flex items-center gap-2">
//           <span className="w-4 h-4 rounded-full bg-[#E1D7F8]"></span> Mixed
//         </div>
//       </div>

//       {/* Month Selector */}
//       <div className="flex flex-wrap justify-between gap-4 border-t border-b border-gray-300 py-6">
//         {monthData.map((month) => (
//           <div
//             key={month.name}
//             onMouseEnter={() => setHoveredMonth(month)}
//             className={`w-16 h-16 rounded-full flex items-center justify-center font-semibold uppercase transition-all duration-300 cursor-pointer ${
//               hoveredMonth.name === month.name
//                 ? `${month.color} border-b-4 border-[#a89f82] scale-105`
//                 : month.color
//             }`}
//           >
//             {month.name}
//           </div>
//         ))}
//       </div>

//       {/* Month Details */}
//       <div className="mt-10 transition-all duration-500 ease-in-out">
//         <h2 className="text-4xl font-cormorant mb-2">{hoveredMonth.name}</h2>
//         <h4 className="font-semibold mb-6">{hoveredMonth.season}</h4>

//         <div className="space-y-4 text-[#2e2c2d] border-t border-gray-200 pt-4">
//           {hoveredMonth.description.map((para, i) => (
//             <p key={i} className="border-b border-gray-200 pb-4">
//               {para}
//             </p>
//           ))}
//         </div>

//         <div className="text-center mt-10">
//           <button className="px-6 py-3 border border-black rounded-full uppercase text-sm tracking-[2px] hover:bg-black hover:text-white transition">
//             Learn More
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }



import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const monthData = [
  {
    name: "Jan",
    season: "Summer Season",
    rating: "Excellent",
    color: "bg-[#A5D6A7]",
    description: [
      "January is one of the best months to visit South Africa, with warm temperatures and sunny days perfect for outdoor adventures.",
      "Enjoy beautiful beaches, safari drives, and vibrant city life in Cape Town and Johannesburg.",
      "Expect some crowds, as it’s peak travel season for locals and tourists alike.",
    ],
  },
  {
    name: "Feb",
    season: "Summer Season",
    rating: "Excellent",
    color: "bg-[#A5D6A7]",
    description: [
      "February continues the warm, sunny conditions ideal for beach days and game drives.",
      "Cape Town’s wine festivals and outdoor dining experiences are in full swing.",
      "It’s a great time to enjoy both the coast and wildlife reserves.",
    ],
  },
  {
    name: "Mar",
    season: "Autumn Begins",
    rating: "Excellent",
    color: "bg-[#A5D6A7]",
    description: [
      "March offers slightly cooler weather, fewer crowds, and amazing scenery.",
      "Perfect for hiking, safari, and photography with clear skies and lush landscapes.",
      "Still warm enough for coastal activities and cultural experiences.",
    ],
  },
  {
    name: "Apr",
    season: "Autumn",
    rating: "Good",
    color: "bg-[#F1F8C0]",
    description: [
      "April brings mild temperatures and fewer tourists, great for relaxed travel.",
      "Wildlife spotting improves as vegetation thins.",
      "Ideal for exploring cities, vineyards, and nature reserves alike.",
    ],
  },
  {
    name: "May",
    season: "Wet Season",
    rating: "Mixed",
    color: "bg-[#E1D7F8]",
    description: [
      "Expect some rain in Cape Town over the course of a lengthy stay, with day length shortening and temperatures remaining mild.",
      "The shift in the weather means beach relaxation is not always an option, leaving the many boutique shops and beachfront eateries a must, especially in the nearby coastal towns of St James and Kalk Bay.",
      "This is the perfect time of year to indulge the taste buds with culinary delights and wine tastings, both readily available with relatively few tourists around.",
      "The indoor markets bursting with fresh produce and homemade delights combine well with cultural explorations or a trip to the trendy V&A Waterfront.",
      "If you are wanting a little adventure, the winter months are considered the best for Great White shark cage diving, with the sharks at their most active.",
    ],
  },
  {
    name: "Jun",
    season: "Winter",
    rating: "Mixed",
    color: "bg-[#E1D7F8]",
    description: [
      "Cooler weather makes it perfect for safaris and wildlife spotting.",
      "Cape Town experiences rain, but landscapes are lush and green.",
    ],
  },
  {
    name: "Jul",
    season: "Winter",
    rating: "Mixed",
    color: "bg-[#E1D7F8]",
    description: [
      "July is ideal for safari lovers as animals gather around water sources.",
      "Expect chilly evenings and occasional rain in the Cape.",
    ],
  },
  {
    name: "Aug",
    season: "Winter",
    rating: "Good",
    color: "bg-[#F1F8C0]",
    description: [
      "August marks the start of wildflower season in the Western Cape.",
      "Great time for scenic drives and wildlife safaris.",
    ],
  },
  {
    name: "Sep",
    season: "Spring",
    rating: "Good",
    color: "bg-[#F1F8C0]",
    description: [
      "Spring begins with mild temperatures and blooming landscapes.",
      "A beautiful time to explore both coastal and inland areas.",
    ],
  },
  {
    name: "Oct",
    season: "Spring",
    rating: "Excellent",
    color: "bg-[#A5D6A7]",
    description: [
      "October offers warm weather and fewer crowds — perfect for adventure and relaxation.",
      "Ideal for whale watching and outdoor exploration.",
    ],
  },
  {
    name: "Nov",
    season: "Early Summer",
    rating: "Excellent",
    color: "bg-[#A5D6A7]",
    description: [
      "November welcomes summer with long, sunny days and vibrant energy.",
      "Perfect time for safaris, beaches, and festive events.",
    ],
  },
  {
    name: "Dec",
    season: "Summer",
    rating: "Excellent",
    color: "bg-[#A5D6A7]",
    description: [
      "December is lively and festive, with perfect beach weather.",
      "Expect crowds and higher prices, but amazing summer vibes.",
    ],
  },
];

export default function BestTimeToVisit() {
  const [hoveredMonth, setHoveredMonth] = useState(monthData[4]); // Default: May

  return (
    <section className="px-4 md:px-10 lg:px-16 xl:px-20 2xl:px-48 py-16  text-[#2e2c2d] font-quicksand">

<div className="text-center   mb-14 font-cormorant">
        <p className="text-center text-2xl md:text-3xl font-normal  text-[#a89f82] uppercase mb-6">
         Best time to visit
        </p>
        <h2 className="text-6xl  mb-10  text-[#636363] capitalize font-normal">
          When to go on a Cape Town Trip
        </h2>
        </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 text-sm mb-6">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-[#A5D6A7]"></span> Excellent
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-[#F1F8C0]"></span> Good
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-[#E1D7F8]"></span> Mixed
        </div>
      </div>

      {/* Month Selector */}
      <div className="flex flex-wrap justify-between gap-4 border-t border-b border-gray-300 py-6">
        {monthData.map((month) => (
          <div
            key={month.name}
            onMouseEnter={() => setHoveredMonth(month)}
            className={`w-16 h-16 rounded-full flex items-center justify-center font-semibold uppercase transition-all duration-300 cursor-pointer ${
              hoveredMonth.name === month.name
                ? `${month.color} border-b-4 border-[#a89f82] scale-105`
                : month.color
            }`}
          >
            {month.name}
          </div>
        ))}
      </div>

      {/* Animated Month Details */}
      <div className="mt-10 relative min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={hoveredMonth.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <h2 className="text-4xl font-cormorant mb-2">{hoveredMonth.name}</h2>
            <h4 className="font-semibold mb-6">{hoveredMonth.season}</h4>

            <div className="space-y-4 text-[#2e2c2d] border-t border-gray-200 pt-4">
              {hoveredMonth.description.map((para, i) => (
                <p key={i} className="border-b border-gray-200 pb-4">
                  {para}
                </p>
              ))}
            </div>

            <div className="text-center mt-10">
              <button className="px-6 py-3 border border-[#a89f82] text-[#a89f82] rounded-full uppercase text-sm tracking-[2px] hover:bg-[#f25922] hover:text-white transition">
                Learn More
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}


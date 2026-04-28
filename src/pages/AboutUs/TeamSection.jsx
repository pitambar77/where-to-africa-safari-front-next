// import React from "react";
// import { motion } from "framer-motion";

// const teamMembers = [
//   {
//     name: "ANNIE",
//     role: "Travel Specialist",
//     image:
//       "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     name: "CAROLA",
//     role: "Travel Specialist",
//     image:
//       "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     name: "CATHERINE",
//     role: "Travel Specialist",
//     image:
//       "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     name: "JENNA",
//     role: "Travel Specialist",
//     image:
//       "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80",
//   },
// ];

// const MeetOurTeam = () => {
//   return (
//     <section className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-0 py-8 sm:py-10 md:py-16 bg-white">
//       <div className="text-center mb-8 sm:mb-10 md:mb-16">
//         <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl   text-[#636363] capitalize font-cormorant ">
//           Meet our team
//         </h2>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 ">
//         {teamMembers.map((member, index) => (
//           <div
//             key={index}
//             className="relative overflow-hidden rounded-sm group shadow-md cursor-pointer h-[500px]"
//           >
//             <img
//               src={member.image}
//               alt={member.name}
//               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//             />

//             {/* Overlay gradient */}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent transition-all duration-500 group-hover:from-black/70"></div>

//             <motion.div
//               className="absolute inset-0 flex flex-col items-center justify-center text-white font-quicksand"
//               initial={{ y: 200, opacity: 1 }}
//               whileHover={{ y: 0 }}
//               transition={{ duration: 0.8, ease: "easeInOut" }}
//             >
//               <motion.h3
//                 className="text-lg font-semibold tracking-[1px]"
//                 initial={{ opacity: 1, y: 0 }}
//                 whileHover={{ y: 0 }}
//                 transition={{ duration: 0.8, ease: "easeInOut" }}
//               >
//                 {member.name}
//               </motion.h3>

//               <motion.p
//                 className=" font-cormorant text-2xl font-medium"
//                 initial={{ opacity: 1, y: 0 }}
//                 whileHover={{ y: 0 }}
//                 transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
//               >
//                 {member.role}
//               </motion.p>

//               <motion.div
//                 className="mt-3 opacity-0 group-hover:opacity-100"
//                 initial={{ opacity: 0, y: 10 }}
//                 whileHover={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
//               >
//                 <span className="inline-flex items-center justify-center w-8 h-8 border  border-white rounded-full text-xl leading-none">
//                   →
//                 </span>
//               </motion.div>
//             </motion.div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default MeetOurTeam;

"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const teamMembers = [
  {
    name: "ANNIE",
    role: "Travel Specialist",
    image: "/images/Team-1.jpeg",
  },
  {
    name: "CAROLA",
    role: "Travel Specialist",
    image: "/images/Team-1.jpeg",
  },
  {
    name: "CATHERINE",
    role: "Travel Specialist",
    image: "/images/Team-2.jpeg",
  },
  {
    name: "JENNA",
    role: "Travel Specialist",
    image: "/images/Team-3.jpeg",
  },
];

const MeetOurTeam = () => {
  return (
    <section className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-0 py-8 sm:py-10 md:py-16 bg-white">
      {/* Heading */}
      <div className="text-center mb-8 sm:mb-10 md:mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#636363] font-cormorant">
          Meet our team
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-sm group shadow-md cursor-pointer h-[450px]"
            initial="rest"
            whileHover="hover"
            animate="rest"
          >
            {/* ✅ Optimized Image */}
            <div className="relative w-full h-full">
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent transition-all duration-500" />

            {/* Content */}
            <motion.div
              variants={{
                rest: { y: 60, opacity: 0 },
                hover: { y: 0, opacity: 1 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4"
            >
              <h3 className="text-lg font-semibold tracking-wide font-quicksand">
                {member.name}
              </h3>

              <p className="font-cormorant text-xl md:text-2xl mt-1">
                {member.role}
              </p>

              <div className="mt-3">
                <span className="inline-flex items-center justify-center w-8 h-8 border border-white rounded-full text-xl">
                  →
                </span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MeetOurTeam;

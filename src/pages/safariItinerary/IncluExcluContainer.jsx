// import React, { useState } from "react";
// import { Plus, Minus, CheckCircle, ChevronRight } from "lucide-react";
// import { FaRegDotCircle } from "react-icons/fa";

// const IncluExcluContainer = ({ title, items }) => {
//   const [openIndex, setOpenIndex] = useState(0);

//   const toggle = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <div className="w-full max-w-4xl px-4">
//       {/* Section Title */}
//       <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#636363] capitalize text-center font-cormorant font-normal mb-8 md:mb-16">
//         {title}
//       </h2>

//       {/* Accordion Items */}
//       <div className="space-y-2">
//         {items.map((faq, index) => (
//           <div
//             key={faq._id || index}
//             className="border-b border-gray-200 font-quicksand"
//           >
//             {/* Question */}
//             <button
//               className="flex justify-between items-center w-full py-4 text-left text-lg hover:bg-gray-50 transition-colors"
//               onClick={() => toggle(index)}
//               aria-expanded={openIndex === index}
//               aria-controls={`accordion-content-${faq._id || index}`}
//             >
//               <span className="text-gray-800 font-light px-2">
//                 {faq.question}
//               </span>
//               {openIndex === index ? (
//                 <Minus className="w-5 h-5 text-gray-800" />
//               ) : (
//                 <Plus className="w-5 h-5 text-gray-800" />
//               )}
//             </button>

//             {/* Answer */}
//             <div
//               id={`accordion-content-${faq._id || index}`}
//               className={`overflow-hidden transition-all duration-300 ease-in-out ${
//                 openIndex === index
//                   ? "max-h-[1000px] opacity-100 py-2"
//                   : "max-h-0 opacity-0"
//               }`}
//             >
//               <div className="pb-4 text-gray-600 font-quicksand text-base px-2 leading-relaxed border-t border-gray-100">
//                 {/* {faq.answer?.map((ans, i) => {
//                   if (ans.type === "header") {
//                     return (
//                       <h3
//                         key={i}
//                         className="text-lg font-semibold text-[#636363] mt-4"
//                       >
//                         {ans.content}
//                       </h3>
//                     );
//                   }

//                   if (ans.type === "paragraph") {
//                     return (
//                       <p
//                         key={i}
//                         className="text-gray-700 font-light leading-relaxed mt-2"
//                       >
//                         {ans.content}
//                       </p>
//                     );
//                   }

//                   if (ans.type === "list" && Array.isArray(ans.content)) {
//                     return (
//                       <ul
//                         key={i}
//                         className="list-disc  mt-3 space-y-1 text-gray-700 marker:text-[#a89f81] marker:text-xl list-inside pl-8"
//                       >
//                         {ans.content.map((item, liIndex) => (
//                           <li key={liIndex}>{item}</li>
//                         ))}
//                       </ul>
//                     );
//                   }

//                   return null;
//                 })} */}
//                 {faq.answer?.map((ans, i) => {
//                   if (ans.type === "header") {
//                     return (
//                       <div key={i} className="flex items-start gap-3 mt-4">
//                         <CheckCircle className="w-5 h-5 text-[#a89f81] mt-1 shrink-0" />
//                         <h3 className="text-lg  text-[#636363]">
//                           {ans.content}
//                         </h3>
//                       </div>
//                     );
//                   }

//                   if (ans.type === "paragraph") {
//                     return (
//                       <div key={i} className="flex items-start gap-3 mt-3 ml-4">
//                        <FaRegDotCircle className="w-4 h-4 text-[#a89f81] mt-1 shrink-0" />
//                         <p className="text-gray-700 font-light leading-relaxed">
//                           {ans.content}
//                         </p>
//                       </div>
//                     );
//                   }

//                   if (ans.type === "list" && Array.isArray(ans.content)) {
//                     return (
//                       <ul key={i} className="mt-3 space-y-2 pl-2">
//                         {ans.content.map((item, liIndex) => (
//                           <li key={liIndex} className="flex items-start gap-3">
//                             <ChevronRight className="w-4 h-4 text-[#a89f81] mt-1 shrink-0" />
//                             <span className="text-gray-700">{item}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     );
//                   }

//                   return null;
//                 })}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default IncluExcluContainer;

"use client";

import React, { useState } from "react";
import { Plus, Minus, CheckCircle, ChevronRight } from "lucide-react";
import { FaRegDotCircle } from "react-icons/fa";

const IncluExcluContainer = ({ title = "", items }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  // ✅ HARD NORMALIZATION (IMPORTANT FOR NEXT BUILD)
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <div className="w-full max-w-4xl px-4">
      <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#636363] capitalize text-center font-cormorant font-normal mb-8 md:mb-16">
        {title}
      </h2>

      <div className="space-y-2">
        {safeItems.map((faq, index) => {
          const answers = Array.isArray(faq?.answer) ? faq.answer : [];

          return (
            <div
              key={faq?._id || index}
              className="border-b border-gray-200 font-quicksand"
            >
              {/* QUESTION */}
              <button
                className="flex justify-between items-center w-full py-4 text-left text-lg hover:bg-gray-50 transition-colors"
                onClick={() => toggle(index)}
              >
                <span className="text-gray-800 font-light px-2">
                  {faq?.question || ""}
                </span>

                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-gray-800" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-800" />
                )}
              </button>

              {/* ANSWER */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-[1000px] opacity-100 py-2"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="pb-4 text-gray-600 font-quicksand text-base px-2 leading-relaxed border-t border-gray-100">
                  {answers.map((ans, i) => {
                    if (!ans) return null;

                    // HEADER
                    if (ans.type === "header") {
                      return (
                        <div key={i} className="flex items-start gap-3 mt-4">
                          <CheckCircle className="w-5 h-5 text-[#a89f81] mt-1 shrink-0" />
                          <h3 className="text-lg text-[#636363]">
                            {ans.content}
                          </h3>
                        </div>
                      );
                    }

                    // PARAGRAPH
                    if (ans.type === "paragraph") {
                      return (
                        <div
                          key={i}
                          className="flex items-start gap-3 mt-3 ml-4"
                        >
                          <FaRegDotCircle className="w-4 h-4 text-[#a89f81] mt-1 shrink-0" />
                          <p className="text-gray-700 font-light leading-relaxed">
                            {ans.content}
                          </p>
                        </div>
                      );
                    }

                    // LIST
                    if (ans.type === "list" && Array.isArray(ans.content)) {
                      return (
                        <ul key={i} className="mt-3 space-y-2 pl-2">
                          {ans.content.map((item, liIndex) => (
                            <li
                              key={liIndex}
                              className="flex items-start gap-3"
                            >
                              <ChevronRight className="w-4 h-4 text-[#a89f81] mt-1 shrink-0" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    }

                    return null;
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IncluExcluContainer;

// "use client";

// import React, { useState } from "react";
// import { Plus, Minus, CheckCircle, ChevronRight } from "lucide-react";
// import { FaRegDotCircle } from "react-icons/fa";

// const IncluExcluContainer = ({ title = "", items = [] }) => {
//   const [openIndex, setOpenIndex] = useState(0);

//   const toggle = (index) => {
//     setOpenIndex((prev) => (prev === index ? null : index));
//   };

//   // 🛡️ HARD GUARD (VERY IMPORTANT FOR NEXT BUILD)
//   if (!Array.isArray(items)) return null;

//   return (
//     <div className="w-full max-w-4xl px-4">
//       <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#636363] capitalize text-center font-cormorant font-normal mb-8 md:mb-16">
//         {title}
//       </h2>

//       <div className="space-y-2">
//         {items.map((faq, index) => {
//           // const answers = Array.isArray(faq?.answer) ? faq.answer : [];
//           const answers = Array.isArray(faq?.answer) ? faq.answer : [];

//           return (
//             <div
//               key={faq?._id || index}
//               className="border-b border-gray-200 font-quicksand"
//             >
//               <button
//                 className="flex justify-between items-center w-full py-4 text-left text-lg hover:bg-gray-50 transition-colors"
//                 onClick={() => toggle(index)}
//               >
//                 <span className="text-gray-800 font-light px-2">
//                   {faq?.question || ""}
//                 </span>

//                 {openIndex === index ? (
//                   <Minus className="w-5 h-5 text-gray-800" />
//                 ) : (
//                   <Plus className="w-5 h-5 text-gray-800" />
//                 )}
//               </button>

//               <div
//                 className={`overflow-hidden transition-all duration-300 ease-in-out ${
//                   openIndex === index
//                     ? "max-h-[1000px] opacity-100 py-2"
//                     : "max-h-0 opacity-0"
//                 }`}
//               >
//                 <div className="pb-4 text-gray-600 font-quicksand text-base px-2 leading-relaxed border-t border-gray-100">
//                   {answers.map((ans, i) => {
//                     if (!ans) return null;

//                     if (ans.type === "header") {
//                       return (
//                         <div key={i} className="flex items-start gap-3 mt-4">
//                           <CheckCircle className="w-5 h-5 text-[#a89f81] mt-1 shrink-0" />
//                           <h3 className="text-lg text-[#636363]">
//                             {ans.content}
//                           </h3>
//                         </div>
//                       );
//                     }

//                     if (ans.type === "paragraph") {
//                       return (
//                         <div
//                           key={i}
//                           className="flex items-start gap-3 mt-3 ml-4"
//                         >
//                           <FaRegDotCircle className="w-4 h-4 text-[#a89f81] mt-1 shrink-0" />
//                           <p className="text-gray-700 font-light leading-relaxed">
//                             {ans.content}
//                           </p>
//                         </div>
//                       );
//                     }

//                     if (ans.type === "list" && Array.isArray(ans.content)) {
//                       return (
//                         <ul key={i} className="mt-3 space-y-2 pl-2">
//                           {ans.content.map((item, liIndex) => (
//                             <li
//                               key={liIndex}
//                               className="flex items-start gap-3"
//                             >
//                               <ChevronRight className="w-4 h-4 text-[#a89f81] mt-1 shrink-0" />
//                               <span className="text-gray-700">{item}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       );
//                     }

//                     return null;
//                   })}
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default IncluExcluContainer;

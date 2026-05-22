// import React from 'react'

// const TravelguideSection = ({ section }) => {
//   return (
//     <section className="my-10">
//       <h2 className="text-2xl font-semibold mb-3 text-gray-800">
//         {section.heading}
//       </h2>

//       {section.description && (
//         <p className="text-gray-600 leading-relaxed mb-4">
//           {section.description}
//         </p>
//       )}

//       {section.list && (
//         <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
//           {section.list.map((item, index) => (
//             <li key={index}>{item}</li>
//           ))}
//         </ul>
//       )}

//       {section.subsections && (
//         <div className="space-y-6">
//           {section.subsections.map((sub, idx) => (
//             <div key={idx}>
//               <h3 className="text-xl font-medium text-gray-800 mb-1">
//                 {sub.title}
//               </h3>
//               <p className="text-gray-600 mb-2">{sub.description}</p>
//               <ul className="list-disc list-inside text-gray-700 space-y-1">
//                 {sub.list.map((point, i) => (
//                   <li key={i}>{point}</li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       )}

//       {section.image && (
//         <img
//           src={section.image}
//           alt={section.heading}
//           className="w-full rounded-2xl shadow-md mt-4"
//         />
//       )}
//     </section>
//   )
// }

// export default TravelguideSection

import React from "react";

const TravelguideSection = ({ section }) => {
  if (!section) return null; // ✅ prevents build crash

  return (
    <section className="my-10">
      <h2 className="text-2xl font-semibold mb-3 text-gray-800">
        {section?.heading}
      </h2>

      {section?.description && (
        <p className="text-gray-600 leading-relaxed mb-4">
          {section.description}
        </p>
      )}

      {/* ✅ safe list rendering */}
      {Array.isArray(section?.list) && section.list.length > 0 && (
        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
          {section.list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}

      {/* ✅ safe subsections rendering */}
      {Array.isArray(section?.subsections) &&
        section.subsections.length > 0 && (
          <div className="space-y-6">
            {section.subsections.map((sub, idx) => (
              <div key={idx}>
                <h3 className="text-xl font-medium text-gray-800 mb-1">
                  {sub?.title}
                </h3>

                {sub?.description && (
                  <p className="text-gray-600 mb-2">{sub.description}</p>
                )}

                {Array.isArray(sub?.list) && sub.list.length > 0 && (
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {sub.list.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

      {/* ✅ safe image */}
      {section?.image && (
        <img
          src={section.image}
          alt={section.heading || "Travel guide"}
          className="w-full rounded-2xl shadow-md mt-4"
        />
      )}
    </section>
  );
};

export default TravelguideSection;

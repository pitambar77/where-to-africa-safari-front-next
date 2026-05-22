// "use client";
// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { getAccommodationById } from "../../api/accommodationAPI.js";
// import Gallery from "../../components/Gallery";
// import QnADisplay from "../../components/QnADisplay";

// const AccommodationDetails = () => {
//   const params = useParams();
//   const id = params?.id;
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const { data } = await getAccommodationById(id);
//       setData(data);
//     })();
//   }, [id]);

//   if (!data) return <div className="text-center p-10">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-[#FBF8F3]">
//       {/* Banner */}
//       <div
//         className="h-[60vh] bg-cover bg-center flex items-center justify-center text-white"
//         style={{
//           backgroundImage: `url(${data.bannerImages?.[0]?.url || data.bannerImages?.[0]})`,
//         }}
//       >
//         <div className="bg-black/40 p-6 rounded">
//           <h1 className="text-4xl font-bold mb-2">{data.name}</h1>
//           <p>{data.location}</p>
//         </div>
//       </div>

//       {/* Overview */}
//       <div className="max-w-5xl mx-auto py-10 px-6">
//         <h2 className="text-3xl font-semibold mb-2">{data.overviewTitle}</h2>
//         <p className="text-gray-600 mb-4">{data.overviewDescription}</p>

//         <div className="flex flex-wrap gap-6 bg-white p-6 rounded shadow">
//           <div>
//             <strong>Price:</strong> ${data.pricePerPerson} /person
//           </div>
//           <div>
//             <strong>Nights:</strong> {data.nightsStay}
//           </div>
//           <div>
//             <strong>Check-in:</strong> {data.checkIn}
//           </div>
//           <div>
//             <strong>Check-out:</strong> {data.checkOut}
//           </div>
//           <div>
//             <strong>Type:</strong> {data.accommodationType}
//           </div>
//         </div>

//         {/* Amenities */}
//         <div className="mt-8">
//           <h3 className="text-2xl font-semibold mb-3">Amenities</h3>
//           <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
//             {data.amenities.map((a, i) => (
//               <li key={i} className="text-gray-700">
//                 • {a}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Gallery */}
//         <Gallery
//           images={data.galleryImages}
//           description={data.galleryDescription}
//         />

//         {/* About Booking */}
//         <QnADisplay title="About Booking" items={data.aboutBooking} />

//         {/* Requirements */}
//         <QnADisplay title="Travel Requirements" items={data.requirements} />
//       </div>
//     </div>
//   );
// };

// export default AccommodationDetails;

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getAccommodationById } from "@/api/accommodationAPI";

import Gallery from "@/components/Gallery";
import QnADisplay from "@/components/QnADisplay";

const AccommodationDetails = () => {
  const params = useParams();
  const id = params?.id;

  const [data, setData] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchAccommodation = async () => {
      try {
        const res = await getAccommodationById(id);
        setData(res.data);
      } catch (error) {
        console.error("Failed to fetch accommodation", error);
      }
    };

    fetchAccommodation();
  }, [id]);

  if (!data) {
    return <div className="text-center p-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#FBF8F3]">
      {/* Banner */}
      <div
        className="h-[60vh] bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${
            data.bannerImages?.[0]?.url || data.bannerImages?.[0]
          })`,
        }}
      >
        <div className="bg-black/40 p-6 rounded">
          <h1 className="text-4xl font-bold mb-2">{data.name}</h1>

          <p>{data.location}</p>
        </div>
      </div>

      {/* Overview */}
      <div className="max-w-5xl mx-auto py-10 px-6">
        <h2 className="text-3xl font-semibold mb-2">{data.overviewTitle}</h2>

        <p className="text-gray-600 mb-4">{data.overviewDescription}</p>

        <div className="flex flex-wrap gap-6 bg-white p-6 rounded shadow">
          <div>
            <strong>Price:</strong> ${data.pricePerPerson} /person
          </div>

          <div>
            <strong>Nights:</strong> {data.nightsStay}
          </div>

          <div>
            <strong>Check-in:</strong> {data.checkIn}
          </div>

          <div>
            <strong>Check-out:</strong> {data.checkOut}
          </div>

          <div>
            <strong>Type:</strong> {data.accommodationType}
          </div>
        </div>

        {/* Amenities */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-3">Amenities</h3>

          <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {data.amenities?.map((a, i) => (
              <li key={i} className="text-gray-700">
                • {a}
              </li>
            ))}
          </ul>
        </div>

        {/* Gallery */}
        <Gallery
          images={data.galleryImages}
          description={data.galleryDescription}
        />

        {/* About Booking */}
        <QnADisplay title="About Booking" items={data.aboutBooking} />

        {/* Requirements */}
        <QnADisplay title="Travel Requirements" items={data.requirements} />
      </div>
    </div>
  );
};

export default AccommodationDetails;

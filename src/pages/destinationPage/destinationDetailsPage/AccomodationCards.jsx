// import React, { useState } from 'react'
// import SafariCard from '../../Accomodation/LandingPage/SafariCard'
// import { safarisData } from '../../../data/safariData';

// const AccomodationCards = () => {

//     const [currentPage, setCurrentPage] = useState(1);
      
//       // Variables related to the entire data set and pagination
//       const allSafaris = safarisData; // Use the imported data directly
//       const cardsPerPage = 8;
    
//       // Pagination calculation
//       const totalPages = Math.ceil(allSafaris.length / cardsPerPage);
//       const startIndex = (currentPage - 1) * cardsPerPage;
//       const currentCards = allSafaris.slice(startIndex, startIndex + cardsPerPage);

//   return (
   
//           <div className="py-12  ">
//         <div className="px-4 md:px-10 lg:px-16 xl:px-20 2xl:px-48">

//              {/* <div className="font-cormorant text-center  ">
//           <h2 className="text-3xl text-[#a89f82] uppercase"> Your Journeys</h2>

//           <h5 className="text-6xl  mb-8 mt-4 text-[#636363] capitalize font-normal">
//             South Africa Trips to Inspire
//           </h5>
//         </div> */}

//           {/* Cards Grid */}
//           {currentCards.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 2xl:gap-8 ">
//               {currentCards.map((safari) => (
//                 <SafariCard key={safari.id} safari={safari} />
//               ))}
//             </div>
//           ) : (
//             <p className="text-center text-gray-600 mt-10">No safaris found.</p>
//           )}

//           {/* Pagination */}
//           {totalPages > 1 && ( // Only show pagination if there is more than 1 page
//             <div className="flex justify-center items-center mt-12 gap-2">
//               {[...Array(totalPages)].map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setCurrentPage(i + 1)}
//                   className={`w-8 h-8 rounded-md ${
//                     currentPage === i + 1
//                       ? "bg-[#aaa086] text-white"
//                       : "bg-white border text-[#aaa086] hover:bg-gray-100"
//                   }`}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//               {currentPage < totalPages && (
//                 <button
//                   onClick={() => setCurrentPage(currentPage + 1)}
//                   className="px-4 font-quicksand py-2 bg-[#aaa086] rounded-md text-white hover:bg-[#978f7d] transition-colors"
//                 >
//                   Next Page
//                 </button>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
    
//   )
// }

// export default AccomodationCards

import React from 'react'
import SafariCard from '../../Accomodation/LandingPage/SafariCard'
import { safarisData } from '../../../data/safariData'

const AccomodationCards = () => {
  

   const allSafaris = [
      {
      "id": 1,
      "country": "South Africa & Zimbabwe",
      "title": "South Africa and Victoria Falls Tour",
      "nights": 10,
      "price": 10700,
      "image":"https://whereto.africa/wp-content/uploads/2017/02/The-Bay-Hotel-Pool-Lion-Head.jpg",
    },
    {
      "id": 2,
      "country": "Kenya & Seychelles",
      "title": "Kenya and Seychelles Holiday",
      "nights": 11,
      "price": 9300,
      "image":"https://capearchivestours.com/assest/images/cape-town-accommodation.webp",
    },
    {
      "id": 3,
      "country": "Botswana & Zimbabwe",
      "title": "Best of Botswana with Victoria Falls",
      "nights": 9,
      "price": 13500,
      "image": "https://cf.bstatic.com/xdata/images/hotel/max1024x768/426743301.jpg?k=125bc775a9ed7f7451a6cbba8be7b98e5752f94e3c7f766c0c9f124542033f8a&o=&hp=1"
    },
    {
      "id": 4,
      "country": "India",
      "title": "In Search of Snow Leopards",
      "nights": 11,
      "price": 10900,
      "image":"https://cape.luxury/wp-content/uploads/2019/04/SAOTA_Beyond_01_L5-Living_LR-1.jpeg"
    },
    {
      "id": 5,
      "country": "Kenya",
      "title": "Samburu and Maasai Mara Safari",
      "nights": 7,
      "price": 10900,
      "image": "https://cf.bstatic.com/xdata/images/hotel/max1024x768/542215125.jpg?k=f2409d3200fcf4ae6a7e0e767425394fa631f8f89fea4e0a257e6dfe26d2df14&o=&hp=1"
    },
    {
      "id": 6,
      "country": "Rwanda",
      "title": "Authentic Rwanda Gorilla Trekking Holiday",
      "nights": 8,
      "price": 18900,
      "image":"https://wild-wings-safaris.com/uploads/files/Cape-Town-Accommodation.jpg"
    },
    {
      "id": 7,
      "country": "Zimbabwe",
      "title": "Zimbabwe Luxury and Adventure",
      "nights": 9,
      "price": 14500,
      "image":"https://onlyluxe.com.au/media/magefan_blog/Ellerman_House_Pool.jpeg"
    },
    {
      "id": 8,
      "country": "Uganda",
      "title": "Uganda Wildlife Safari",
      "nights": 6,
      "price": 15800,
      "image": "https://cape.luxury/wp-content/uploads/2019/04/SAOTA_Beyond_01_L5-Living_LR-1.jpeg"
    },
]

  return (
    <div className="pb-16">
      <div className="px-4 md:px-10 lg:px-16 xl:px-20 2xl:px-28">
   

        {/* Cards Grid */}
        {allSafaris.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 2xl:gap-8">
            {allSafaris.map((safari) => (
              <SafariCard key={safari.id} safari={safari} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-10">No safaris found.</p>
        )}
      </div>
    </div>
  )
}

export default AccomodationCards

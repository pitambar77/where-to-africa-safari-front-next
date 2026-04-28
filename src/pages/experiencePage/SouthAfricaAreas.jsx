// import React from "react";

// // Data for the different South Africa areas
// const areas = [
//   {
//     name: "CAPE TOWN",
//     image:
//       "https://s3.amazonaws.com/cdn.micato.com/wp-content/uploads/2018/09/07232001/cape-town-1-2-1110x700.jpg",
//     alt: "A view of Cape Town city",
//   },
//   {
//     name: "GREATER KRUGER",
//     image:
//       "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0b/d3/5c/d0.jpg",
//     alt: "A leopard resting in the grass",
//   },
//     {
//     name: "WINELANDS",
//     image:
//       "https://images.squarespace-cdn.com/content/v1/5f1ab4309bd4b45e29ec3e4b/1638810289461-RQXPK2PDW8QI2CKZ1OJ7/Cape+Winelands+South+Africa",
//     alt: "Vineyards with mountains in the background",
//   },
//   {
//     name: "KWAZULU-NATAL",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/b/bb/Ramsgate_Beach%2C_KZN.jpg",
//     alt: "A beach with large waves",
//   },
//   {
//     name: "GARDEN ROUTE",
//     image:
//       "https://www.andbeyond.com/wp-content/uploads/sites/5/garden-route-hiking.jpg",
//     alt: "A sunset view over a coastal area",
//   },
//   {
//     name: "WHALE ROUTE",
//     image: "https://africansunroad.com/wp-content/uploads/2015/12/PC200721.jpg",
//     alt: "A pristine white sand beach",
//   },
//   {
//     name: "EASTERN CAPE",
//     image:
//       "https://timbuktutravel.imgix.net/2025/10/1-Header-1.jpg?auto=compress%2Cformat&ixlib=php-3.3.1",
//     alt: "Red cliffs by the coast",
//   },
//   {
//     name: "MADIKE AND THE NORTH",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/192A1627_%2849405230186%29.jpg/1200px-192A1627_%2849405230186%29.jpg",
//     alt: "A watering hole at sunset",
//   },
//   {
//     name: "CEDERBERG",
//     image:
//       "https://waybird.imgix.net/regions/kodak_images/000/000/044/original/0-cederberg-south-africa-timbuktu-travel.jpg?q=50&auto=format&crop=fill&w=1024&h=576",
//     alt: "Mountainous rock formations",
//   },
    

// ];


// const SouthAfricaAreas = () => {
//   return (
//     <div className="bg-[#faf5e9] mx-auto justify-center  px-4 md:px-10 lg:px-16 xl:px-20 2xl:px-28 py-16">
//       <div className="">
      
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 lg:gap-y-8 ">
//           {areas.map((area, index) => (
     
//             <div
//               key={area.name}
//               className="flex items-center rounded-[3px] bg-white transition duration-300 cursor-pointer h-24 sm:h-28 lg:h-24 "
          
//               style={
//                 index % 3 === 0 || index % 3 === 1
//                   ? { marginRight: "2rem" }
//                   : {}
//               }
//             >
           
//               <div className="flex-shrink-0 w-24 sm:w-24 h-full">
             
//                 <img
//                   src={area.image} 
//                   alt={area.alt}
//                   className="w-full h-full object-cover rounded-l-[3px]"
//                 />
//               </div>

           
//               <div className="flex-grow p-4 font-quicksand  ">
//                 <p className="text-sm sm:text-base font-semibold tracking-[2px] text-[#252525]">
//                   {area.name}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

     
//         <div className="flex justify-center mt-10 lg:mt-16">
//           <button
//             className="
//               bg-[#ac9e86]
//               text-white
//               font-light
//               tracking-widest
//               py-3
//               px-8
//               text-xs sm:text-sm
//               uppercase
//               hover:bg-[#978973]
//               rounded-sm
//               transition duration-200
//               font-quicksand
//             "
//           >
//             More South Africa Areas
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SouthAfricaAreas;

//navigation addded

import React from "react";
import { useNavigate } from "react-router-dom";

// Data for the different South Africa areas
// const areas = [
//   {
//     name: "CAPE TOWN",
//     image:
//       "https://s3.amazonaws.com/cdn.micato.com/wp-content/uploads/2018/09/07232001/cape-town-1-2-1110x700.jpg",
//     alt: "A view of Cape Town city",
//   },
//   {
//     name: "GREATER KRUGER",
//     image:
//       "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0b/d3/5c/d0.jpg",
//     alt: "A leopard resting in the grass",
//   },
//   {
//     name: "WINELANDS",
//     image:
//       "https://images.squarespace-cdn.com/content/v1/5f1ab4309bd4b45e29ec3e4b/1638810289461-RQXPK2PDW8QI2CKZ1OJ7/Cape+Winelands+South+Africa",
//     alt: "Vineyards with mountains in the background",
//   },
//   {
//     name: "KWAZULU-NATAL",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/b/bb/Ramsgate_Beach%2C_KZN.jpg",
//     alt: "A beach with large waves",
//   },
//   {
//     name: "GARDEN ROUTE",
//     image:
//       "https://www.andbeyond.com/wp-content/uploads/sites/5/garden-route-hiking.jpg",
//     alt: "A sunset view over a coastal area",
//   },
//   {
//     name: "WHALE ROUTE",
//     image: "https://africansunroad.com/wp-content/uploads/2015/12/PC200721.jpg",
//     alt: "A pristine white sand beach",
//   },
//   {
//     name: "EASTERN CAPE",
//     image:
//       "https://timbuktutravel.imgix.net/2025/10/1-Header-1.jpg?auto=compress%2Cformat&ixlib=php-3.3.1",
//     alt: "Red cliffs by the coast",
//   },
//   {
//     name: "MADIKE AND THE NORTH",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/192A1627_%2849405230186%29.jpg/1200px-192A1627_%2849405230186%29.jpg",
//     alt: "A watering hole at sunset",
//   },
//   {
//     name: "CEDERBERG",
//     image:
//       "https://waybird.imgix.net/regions/kodak_images/000/000/044/original/0-cederberg-south-africa-timbuktu-travel.jpg?q=50&auto=format&crop=fill&w=1024&h=576",
//     alt: "Mountainous rock formations",
//   },
// ];

const areas = [
  {
    name: "CAPE TOWN",
    path: "/cape-town",
    image:
      "https://s3.amazonaws.com/cdn.micato.com/wp-content/uploads/2018/09/07232001/cape-town-1-2-1110x700.jpg",
    alt: "A view of Cape Town city",
  },
  {
    name: "GREATER KRUGER",
    path: "/greater-kruger",
    image:
      "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0b/d3/5c/d0.jpg",
    alt: "A leopard resting in the grass",
  },
  {
    name: "WINELANDS",
    path: "/winelands",
    image:
      "https://images.squarespace-cdn.com/content/v1/5f1ab4309bd4b45e29ec3e4b/1638810289461-RQXPK2PDW8QI2CKZ1OJ7/Cape+Winelands+South+Africa",
    alt: "Vineyards with mountains in the background",
  },
  {
    name: "KWAZULU-NATAL",
    path: "/kwazulu-natal",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/bb/Ramsgate_Beach%2C_KZN.jpg",
    alt: "A beach with large waves",
  },
  {
    name: "GARDEN ROUTE",
    path: "/garden-route",
    image:
      "https://www.andbeyond.com/wp-content/uploads/sites/5/garden-route-hiking.jpg",
    alt: "A sunset view over a coastal area",
  },
  {
    name: "WHALE ROUTE",
    path: "/whale-route",
    image:
      "https://africansunroad.com/wp-content/uploads/2015/12/PC200721.jpg",
    alt: "A pristine white sand beach",
  },
  {
    name: "EASTERN CAPE",
    path: "/eastern-cape",
    image:
      "https://timbuktutravel.imgix.net/2025/10/1-Header-1.jpg?auto=compress%2Cformat&ixlib=php-3.3.1",
    alt: "Red cliffs by the coast",
  },
  {
    name: "MADIKE AND THE NORTH",
    path: "/madike-and-the-north",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/192A1627_%2849405230186%29.jpg/1200px-192A1627_%2849405230186%29.jpg",
    alt: "A watering hole at sunset",
  },
  {
    name: "CEDERBERG",
    path: "/cederberg",
    image:
      "https://waybird.imgix.net/regions/kodak_images/000/000/044/original/0-cederberg-south-africa-timbuktu-travel.jpg?q=50&auto=format&crop=fill&w=1024&h=576",
    alt: "Mountainous rock formations",
  },
];


const SouthAfricaAreas = () => {
  const navigate = useNavigate();

  // const handleAreaClick = (areaName) => {
  //   // Convert name to URL-friendly format
  //   const formattedName = areaName.toLowerCase().replace(/\s+/g, "-");
  //   navigate(`/south-africa/${formattedName}`);
  // };

  return (
    <div className="bg-[#faf5e9] mx-auto justify-center px-4 md:px-10 lg:px-16 xl:px-20 2xl:px-28 py-16">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 lg:gap-y-8">
          {areas.map((area, index) => (
            <div
              key={area.name}
              onClick={() => navigate(area.path)}// 🔹 Click redirects
              className="flex items-center rounded-[3px] bg-white transition duration-300 cursor-pointer h-24 sm:h-28 lg:h-24 hover:shadow-md hover:scale-[1.02]"
              style={
                index % 3 === 0 || index % 3 === 1
                  ? { marginRight: "2rem" }
                  : {}
              }
            >
              <div className="flex-shrink-0 w-24 sm:w-24 h-full">
                <img
                  src={area.image}
                  alt={area.alt}
                  className="w-full h-full object-cover rounded-l-[3px]"
                />
              </div>
              <div className="flex-grow p-4 font-quicksand">
                <p className="text-sm sm:text-base font-semibold tracking-[2px] text-[#252525]">
                  {area.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10 lg:mt-16">
          <button
            className="bg-[#ac9e86] text-white font-light tracking-widest py-3 px-8 text-xs sm:text-sm uppercase hover:bg-[#978973] rounded-sm transition duration-200 font-quicksand"
          >
            More South Africa Areas
          </button>
        </div>
      </div>
    </div>
  );
};

export default SouthAfricaAreas;

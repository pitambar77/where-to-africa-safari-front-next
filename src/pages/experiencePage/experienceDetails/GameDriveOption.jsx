// import React from 'react';
// import elephant from '../../../assets/elephant.webp'


// const gameDriveOptions = [
//   {
//     image: elephant,
//     title: 'Afternoon game drive',
//     price: '$48.00',
//   },
//   {
//     image: 'https://capetowndaytours.checkfront.com/media/L468-1--1614785510749032.jpg',
//     title: 'Breakfast safari game drive',
//     price: '$130.00',
//   },
//   {
//     image: 'https://media.gadventures.com/media-server/cache/92/9b/929b8f99eb4dcfb115ca9d735480814c.jpg',
//     title: 'Full day safari game drive',
//     price: '$120.00',
//   },
//   {
//     image: 'https://moafrikatours.com/wp-content/uploads/2023/11/d4.jpg',
//     title: 'Lunch safari game drive',
//     price: '$130.00',
//   },
// ];


// const GameDriveCard = ({ image, title, price }) => {
//   return (
//     <div className="flex flex-col">
//       <div className="mb-4">
//         <img
//           src={image}
//           alt={title}
//           className="w-full h-auto object-cover rounded-sm aspect-[3/5]  shadow-sm"
//         />
//       </div>
//       <h3 className="text-lg font-quicksand font-semibold text-gray-800 mb-1 leading-tight">
//         {title}
//       </h3>
//       <p className="text-gray-800 text-lg font-quicksand font-semibold ">{price}</p>
//     </div>
//   );
// };


// const GameDriveOption = () => {
//   return (
//     <section className="px-4 md:px-10 lg:px-16 xl:px-20 2xl:px-28 py-16">
//       <h2 className="text-6xl  mb-16  text-[#636363] capitalize font-cormorant text-center ">
//             Chobe game drive options
          
//           </h2>
//       <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 md:gap-x-8">
//         {gameDriveOptions.map((option, index) => (
//           <GameDriveCard
//             key={index}
//             image={option.image}
//             title={option.title}
//             price={option.price}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };




// export default GameDriveOption

import React from "react";

const GameDriveOption = ({ gameDrives }) => {
  // Ensure data is an array before mapping
  if (!Array.isArray(gameDrives)) {
    return (
      <p className="text-center text-gray-500 py-10">
        No game drive options available.
      </p>
    );
  }

  return (
    <section className="px-4 md:px-10 lg:px-16 xl:px-20 2xl:px-28 py-16">
      <h2 className="text-4xl md:text-6xl mb-16 text-[#636363] capitalize font-cormorant text-center">
        Chobe game drive options
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 md:gap-x-8">
        {gameDrives.map((drive, index) => (
          <div
            key={drive._id || index}
            className="flex flex-col "
          >
            <div className="mb-4">
              <img
                src={drive.image}
                alt={drive.name}
                className="w-full h-auto object-cover rounded-sm aspect-[3/5] shadow-sm"
              />
            </div>
            <h3 className="text-lg font-quicksand font-semibold text-gray-800 mb-1 leading-tight">
              {drive.name}
            </h3>
            <p className="text-gray-800 text-lg font-quicksand font-semibold">
              ${drive.pricePerPerson}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GameDriveOption;

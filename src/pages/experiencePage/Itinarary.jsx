import React, { useState } from 'react';
import SafariCard from '../Accomodation/LandingPage/SafariCard';
import safarisData from "../../data/safaris.json"; // Retain data import as we're keeping data logic here
// import { safarisData } from '../../data/safariData';

const Itinarary = () => {
  // Retain only the state necessary for pagination
  const [currentPage, setCurrentPage] = useState(1);
  
  // Variables related to the entire data set and pagination
  const allSafaris = safarisData; // Use the imported data directly
  const cardsPerPage = 8;

  // Pagination calculation
  const totalPages = Math.ceil(allSafaris.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentCards = allSafaris.slice(startIndex, startIndex + cardsPerPage);



  return (
    <>
      <div className="py-12  ">
        <div className="px-4 md:px-10 lg:px-16 xl:px-20 2xl:px-28">

             <div className="font-cormorant text-center  ">
          <h2 className="text-3xl text-[#a89f82] uppercase"> Your Journeys</h2>

          <h5 className="text-6xl  mb-8 mt-4 text-[#636363] capitalize font-normal">
            South Africa Trips to Inspire
          </h5>
        </div>

          {/* Cards Grid */}
          {currentCards.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 2xl:gap-8 mt-16">
              {currentCards.map((safari) => (
                <SafariCard key={safari.id} safari={safari} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 mt-10">No safaris found.</p>
          )}

          {/* Pagination */}
          {totalPages > 1 && ( // Only show pagination if there is more than 1 page
            <div className="flex justify-center items-center mt-12 gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-md ${
                    currentPage === i + 1
                      ? "bg-[#aaa086] text-white"
                      : "bg-white border text-[#aaa086] hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              {currentPage < totalPages && (
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="px-4 font-quicksand py-2 bg-[#aaa086] rounded-md text-white hover:bg-[#978f7d] transition-colors"
                >
                  Next Page
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Itinarary;
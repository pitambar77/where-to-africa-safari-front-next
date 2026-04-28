import React from "react";

import { Star } from "lucide-react";
import { FaPlayCircle } from "react-icons/fa";

const PricingAvailabilitySection = () => {
  return (
    <div className=" px-4 md:px-10 lg:px-16 xl:px-20 2xl:px-28">
      <div className="flex flex-col items-center py-16 bg-white ">
        <div className=" font-cormorant text-center ">
          {/* <h2 className=" text-3xl text-[#a89f82] uppercase"> Your Journey</h2> */}
            <p className="  text-[#a89f82] uppercase font-quicksand">
           Your Journey
          </p>

          <h5 className="text-6xl  mb-8 mt-4 text-[#636363] capitalize font-normal">
            Pricing & Availability
          </h5>
        </div>

        <div className="border border-[#a89f82] font-quicksand  w-full p-4 md:p-8 shadow-sm mt-10">
          <div className="flex  items-center space-x-3 pb-4 border-b border-[#a6a49a]">
            <FaPlayCircle className="w-12 h-12 text-[#a89f82] cursor-pointer flex-shrink-0" />
            <div className=" mt-3">
              <p className="text-lg text-[#636363]  font-medium">
                Best Price Guaranteed
              </p>

              <p className=" text-[#636363]">
                Watch this video to find out more about our Price Guarantee
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-6">
            <div className="flex flex-col items-center justify-center  w-[50%] border-r border-[#a89f82] ">
              <div className="flex flex-col sm:flex-row items-center mb-4">
                <p className="text-md text-[#636363] mr-2 mt-3 ">From</p>
                <div className="flex items-baseline">
                  <span className="text-5xl font-light text-[#a89f82] mr-2">
                    $1151
                  </span>
                  <span className="text-lg text-[#636363]">
                    per person per night
                  </span>
                </div>
              </div>
         
                <button className=" bg-[#a89f82] hover:bg-[#f25922] cursor-pointer  rounded-3xl text-white  py-3 px-8 text-sm mb-2 uppercase tracking-wider transition duration-300  ">START PLANNING NOW</button>
            
            </div>

            <div className="flex flex-col items-center justify-center  w-[50%]  mt-6 ">
              <p className=" text-[#636363] mb-1">
                TripAdvisor Traveller Rating
              </p>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-gray-800 text-lg">
                  <span className="text-green-600">T</span>rip
                </span>

                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-green-600 text-green-600"
                    />
                  ))}
                </div>

                <a
                  href="#"
                  className=" text-[#636363] underline hover:no-underline"
                >
                  481 Reviews
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingAvailabilitySection;

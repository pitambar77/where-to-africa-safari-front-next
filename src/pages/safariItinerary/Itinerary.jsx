import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";
import { AiOutlineDownload } from "react-icons/ai";
import { GiBrickWall } from "react-icons/gi";

// --- Data Structure ---
const itineraryData = [
  { id: 1, day: "Day 1", title: "Cape Town", location: "Cape Town" },
  { id: 2, day: "Day 2", title: "Cape Town", location: "Cape Town" },
  { id: 3, day: "Day 3", title: "Cape Town", location: "Cape Town" },
  {
    id: 4,
    day: "Day 4",
    title: "Cape Town → Johannesburg → Kruger National Park",
    location: "Cape Town → Johannesburg → Kruger National Park",
  },
  {
    id: 5,
    day: "Day 5",
    title: "Kruger National Park",
    location: "Kruger National Park",
  },
  {
    id: 6,
    day: "Day 6",
    title: "Kruger National Park to Johannesburg",
    location: "Kruger National Park",
  }, // Note: Using Kruger for tab name
];

// --- Sub-components ---

// Component for the navigation tabs at the top
const DayTab = ({ day, location, isActive, onClick }) => (
  <button
    className={`px-4 py-2 text-sm font-medium transition-all duration-300 whitespace-nowrap border-b-4 ${
      isActive
        ? "border-[#aaa086] text-[#aaa086] bg-gray-50" // Active style
        : "border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300" // Inactive style
    }`}
    onClick={onClick}
  >
    {location}
  </button>
);

// Component for the collapsible day detail row
const DayRow = ({ day, title, isExpanded, onToggle }) => (
  <div
    className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
    onClick={onToggle}
  >
    <div className="flex space-x-4 items-center">
      <div className="font-bold text-gray-700 w-12 text-left">{day}</div>
      <div className="font-medium text-gray-900">{title}</div>
    </div>
    <div className="text-[#aaa086] font-medium text-sm flex items-center uppercase">
      {isExpanded ? "Collapse" : "Expand"}
      {isExpanded ? (
        <IoIosArrowUp className="ml-1 w-4 h-4" />
      ) : (
        <IoIosArrowDown className="ml-1 w-4 h-4" />
      )}
    </div>
  </div>
);

// Component for the detailed content of Day 1
const DayDetailContent = () => (
  <div className=" flex justify-between items-center gap-8 p-6 ">
    <div className=" md:w-1/2">
      <div className="flex items-start mb-4">
        <MdOutlineLocationOn className="w-6 h-6 text-gray-600 mr-3 mt-1 flex-shrink-0" />
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Cape Town</h3>
          <p className="text-gray-600 leading-relaxed font-quicksand">
            Hello and welcome to Africa! Your safari adventure with your fellow
            group of 35-45 starts right here - with some sumptuous scenery (yup,
            tonight's hotel is within arm's reach of the V&A Waterfront!). Once
            you've taken your pics, dropped off your bags and heard all about
            what to expect from your Trip Manager, we'll kick things off in
            style with a walkabout dinner.
          </p>
        </div>
      </div>

      {/* Layout for Lodge/Image */}
      <div className="flex flex-col md:flex-row mt-6 md:space-x-6">
        <div className=" mb-4 md:mb-0">
          <div className="flex items-center text-gray-600">
            <GiBrickWall className="w-5 h-5 mr-2 text-gray-500" />
            <span className="font-medium">
              Waterfront Breakwater Lodge (or similar)
            </span>
          </div>
        </div>
      </div>
    </div>
    <div className=" md:w-1/2">
      {/* Placeholder for the image */}
      <div className="bg-gray-200 h-[300px] w-full flex items-center justify-center text-gray-500 text-sm rounded-sm overflow-hidden shadow-md">
        <img
          src="https://www.backtoafricasafaris.com/wp-content/uploads/2024/04/tanzania-safari-itinerary.jpg"
          alt=""
        />
      </div>
    </div>
  </div>
);

// --- Main Component ---

const Itinerary = () => {
  // activeDayId controls which day's content is highlighted/selected (for tabs and progress)
  const [activeDayId, setActiveDayId] = useState(1);
  // expandedDay controls which row is open
  const [expandedDay, setExpandedDay] = useState(1);

  const uniqueTabs = [
    { id: 1, location: "Cape Town" },
    { id: 2, location: "Cape Town" },
    { id: 3, location: "Cape Town" },
    { id: 4, location: "Cape Town → Johannesburg → Kruger National Park" },
    { id: 5, location: "Kruger National Park" },
  ];

  // Find the max ID of the active segment for the progress bar
  const activeSegmentId =
    itineraryData.find((item) => item.id === activeDayId)?.id || 1;

  const handleToggle = (id) => {
    setExpandedDay(expandedDay === id ? null : id);
  };

  const handleTabClick = (id) => {
    setActiveDayId(id);
    setExpandedDay(id); // Expand the clicked day
  };

  return (
    <div className=" bg-[#f6f1e9] font-cormorant ">
      <div className="max-w-[1320px] mx-auto py-16 px-4 ">
        {/* Top Progress Bar */}
        <div className="pt-4 px-4">
          <div className="flex items-center space-x-0 mb-4">
            {itineraryData.map((item) => (
              <React.Fragment key={item.id}>
                {/* Day Circle */}
                <div
                  className={`w-4 h-4 rounded-full flex-shrink-0 z-10 ${
                    item.id <= activeSegmentId ? "bg-[#aaa086]" : "bg-gray-300"
                  }`}
                ></div>

                {/* Progress Line */}
                {item.id < itineraryData.length && (
                  <div
                    className={`flex-1 h-0.5 -ml-0.5 -mr-0.5 ${
                      item.id < activeSegmentId ? "bg-[#aaa086]" : "bg-gray-300"
                    }`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Day Numbers (D1, D2, D3, etc.) */}
          <div className="flex items-center space-x-0 mt-2">
            {itineraryData.map((item) => (
              <div key={item.id} className="flex-1 flex items-center">
                <div className="text-xs font-medium text-gray-500 w-4 text-center">
                  {item.day.replace("Day ", "D")}
                </div>
                {item.id < itineraryData.length && (
                  <div className="flex-1"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 mt-5 overflow-x-auto">
          {/* Tab 1: Cape Town (Days 1-3) */}
          <DayTab
            day="Day 1"
            location="Cape Town"
            isActive={activeDayId === 1 && activeDayId <= 3}
            onClick={() => handleTabClick(1)}
          />
           <DayTab
            day="Day 2"
            location="Cape Town"
            isActive={activeDayId === 2 }
            onClick={() => handleTabClick(2)}
          />
           <DayTab
            day="Day 3"
            location="Cape Town"
            isActive={activeDayId === 3 }
            onClick={() => handleTabClick(3)}
          />
          {/* Tab 2: Cape Town -> Kruger (Day 4) */}
          <DayTab
            day="Day 4"
            location="Cape Town → Johannesburg → Kruger National Park"
            isActive={activeDayId === 4}
            onClick={() => handleTabClick(4)}
          />
          {/* Tab 3: Kruger National Park (Days 5-6) */}
          <DayTab
            day="Day 5"
            location="Kruger National Park"
            isActive={activeDayId >= 5}
            onClick={() => handleTabClick(5)}
          />
        </div>

        {/* Action Links */}
        <div className="flex justify-between items-center p-4 mt-8 border-b border-gray-100">
          <button className="flex items-center text-sm font-medium text-gray-600 hover:text-yellow-700 transition-colors uppercase">
            <AiOutlineDownload className="w-4 h-4 mr-2" />
            Download Itinerary
          </button>
          <button
            className="flex items-center text-sm font-medium text-gray-600 hover:text-yellow-700 transition-colors uppercase"
            onClick={() => setExpandedDay(expandedDay ? null : 1)} // Simple toggle all example
          >
            Expand All Days
            <IoIosArrowDown className="ml-1 w-4 h-4" />
          </button>
        </div>

        {/* Day Details List */}
        <div className="divide-y divide-gray-200 mt-10">
          {itineraryData.map((item) => (
            <div key={item.id}>
              <DayRow
                day={item.day}
                title={item.title}
                isExpanded={expandedDay === item.id}
                onToggle={() => {
                  handleToggle(item.id);
                  setActiveDayId(item.id); // Update progress when row is toggled
                }}
              />
              {/* Conditional rendering for detailed content */}
              {expandedDay === item.id && (
                <div className="bg-gray-50 border-t border-gray-200">
                  {/* Only Day 1 has the full detail structure from the image */}
                  {item.id === 1 ? (
                    <DayDetailContent />
                  ) : (
                    <div className="p-6 text-gray-500 italic">
                      {item.title} details for {item.day} go here...
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Day 6 is already in the map, but it's the last day and its title is 'Kruger National Park to Johannesburg' */}
        </div>
      </div>
    </div>
  );
};

export default Itinerary;

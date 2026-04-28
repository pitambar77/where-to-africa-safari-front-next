

import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiOutlineDownload } from "react-icons/ai";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import DayRow from "./DayRow";
import DayDetailContent from "./DayDetailContent";

const Itinerary = ({ data = [], title = "Trip Itinerary" }) => {
  const [activeDayId, setActiveDayId] = useState(null);
  const [translateX, setTranslateX] = useState(0);
  const [isScrollable, setIsScrollable] = useState(false);

  const tabRefs = useRef([]);
  const containerRef = useRef(null);

  // ✅ Auto select first day
  useEffect(() => {
    if (data.length > 0) {
      setActiveDayId(data[0]._id);
    }
  }, [data]);

  useEffect(() => {
    const checkOverflow = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      setIsScrollable(container.scrollWidth > container.offsetWidth);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, [data]);

  const handleNext = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const wrapperWidth = container.offsetWidth;
    const containerWidth = container.scrollWidth;

    const maxTranslate = containerWidth - wrapperWidth;

    const currentOffset = Math.abs(translateX);

    // 🚫 If already at end → stop
    if (currentOffset >= maxTranslate) return;

    const nextTab = tabRefs.current.find(
      (tab) => tab && tab.offsetLeft > currentOffset,
    );

    if (!nextTab) return;

    const nextPosition = nextTab.offsetLeft;

    if (nextPosition >= maxTranslate) {
      setTranslateX(-maxTranslate); // stop exactly at end
    } else {
      setTranslateX(-nextPosition);
    }
  };

  // ✅ Move one tab backward
  const handlePrev = () => {
    const currentOffset = Math.abs(translateX);

    const previousTabs = tabRefs.current.filter(
      (tab) => tab && tab.offsetLeft < currentOffset,
    );

    if (previousTabs.length > 0) {
      const prevTab = previousTabs[previousTabs.length - 1];
      setTranslateX(-prevTab.offsetLeft);
    } else {
      setTranslateX(0);
    }
  };

  // ✅ Toggle single day
  const handleToggle = (id) => {
    setActiveDayId((prev) => (prev === id ? null : id));
  };

  // ✅ Expand all
  const handleExpandAll = () => {
    setActiveDayId(activeDayId === "all" ? data[0]?._id : "all");
  };

  return (
    <div className="bg-[#f6f1e9] font-cormorant">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-0 py-8 sm:py-10 md:py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>

        <div className="relative w-full bg-[#f6f1e9]">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute cursor-pointer left-0 top-[35%] -translate-y-1/2 z-20 text-gray-500 hover:text-black bg-white rounded-full p-2 shadow-md"
          >
            <FiChevronLeft size={22} />
          </button>

          {/* Timeline Dots */}
          <div className="w-full mt-6 px-12">
            <div className="flex items-center w-full relative">
              {data.map((item, idx) => {
                const activeIndex = data.findIndex(
                  (d) => d._id === activeDayId,
                );

                return (
                  <div key={item._id} className="relative flex-1">
                    {idx < data.length - 1 && (
                      <div className="absolute top-[8px] left-1/2 right-[-50%] h-[2px] bg-gray-300">
                        <motion.div
                          className="h-full bg-[#aaa086]"
                          initial={{ width: 0 }}
                          animate={{
                            width:
                              activeDayId === "all"
                                ? "100%"
                                : idx < activeIndex
                                  ? "100%"
                                  : "0%",
                          }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    )}

                    <div className="flex flex-col items-center relative z-10">
                      <div
                        className={`w-4 h-4 rounded-full transition-colors duration-500 ${
                          activeDayId === "all" || idx <= activeIndex
                            ? "bg-[#aaa086]"
                            : "bg-gray-300"
                        }`}
                      ></div>

                      <span className="text-sm font-medium text-gray-800 mt-1 text-center">
                        {item.day}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute cursor-pointer right-0 top-[35%] -translate-y-1/2 z-20 text-gray-500 hover:text-black bg-white rounded-full p-2 shadow-md"
          >
            <FiChevronRight size={22} />
          </button>

          {/* 🔥 TAB SECTION (CHAIN STYLE - ONE BY ONE SCROLL) */}
          <div ref={containerRef} className="w-full mt-8 px-12 overflow-hidden">
            <motion.div
              // className="flex items-center w-max"
              className={`flex items-center ${
                isScrollable ? "w-max" : "w-full justify-between"
              }`}
              animate={{ x: translateX }}
              transition={{ duration: 0.4 }}
            >
              {data.map((item, idx) => {
                const isActive = activeDayId === item._id;

                return (
                  <button
                    key={item._id}
                    ref={(el) => (tabRefs.current[idx] = el)}
                    onClick={() => setActiveDayId(item._id)}
                    className={`
                      relative
                      whitespace-nowrap px-8 py-3
${!isScrollable ? "flex-1 text-center" : ""}
                      px-8 py-3
                      text-base font-semibold
                      border border-[#aaa086] rounded-full
                      transition-all duration-300 cursor-pointer
                      ${
                        isActive
                          ? "bg-[#aaa086] text-white shadow-md"
                          : "bg-white text-black hover:bg-gray-100"
                      }
                      ${idx !== 0 ? "-ml-6" : ""}
                    `}
                    style={{
                      zIndex: isActive ? 50 : data.length - idx,
                    }}
                  >
                    {item.location}
                  </button>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* ACTION BAR */}
        <div className="flex justify-between items-center p-4 mt-8 border-b border-gray-100">
          <button className="flex items-center cursor-pointer text-sm font-medium text-gray-600 hover:text-yellow-700 uppercase">
            <AiOutlineDownload className="w-4 h-4 mr-2" />
            Download Itinerary
          </button>

          <button
            className="flex items-center cursor-pointer text-sm font-medium text-gray-600 hover:text-yellow-700 uppercase"
            onClick={handleExpandAll}
          >
            {activeDayId === "all" ? "Collapse All Days" : "Expand All Days"}
            {activeDayId === "all" ? (
              <IoIosArrowUp className="ml-1 w-4 h-4 " />
            ) : (
              <IoIosArrowDown className="ml-1 w-4 h-4" />
            )}
          </button>
        </div>

        {/* DETAILS */}
        <div className="divide-y divide-gray-200 mt-10">
          {data.map((item) => {
            const isExpanded =
              activeDayId === "all" || activeDayId === item._id;

            return (
              <div key={item._id}>
                <DayRow
                  day={item.day}
                  title={item.title}
                  isExpanded={isExpanded}
                  onToggle={() => handleToggle(item._id)}
                />

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden bg-gray-50 border-t border-gray-200"
                    >
                      <DayDetailContent
                        title={item.title}
                        location={item.location}
                        description={item.description}
                        accommodationName={item.accommodationName}
                        image={item.image}
                        activities={item.activities}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Itinerary;

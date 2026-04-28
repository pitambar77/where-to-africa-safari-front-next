const ItineraryDetailsSkeleton = () => {
  return (
    <div className="animate-pulse">
      
      {/* ===== TOP TITLE SECTION ===== */}
      <div className="mt-10 px-4 md:px-10 lg:px-16 xl:px-20 2xl:px-28 text-center space-y-6">
        <div className="h-4 bg-gray-300 w-40 mx-auto rounded"></div>
        <div className="h-16 bg-gray-300 max-w-3xl mx-auto rounded"></div>
        <div className="h-5 bg-gray-300 max-w-xl mx-auto rounded"></div>
      </div>

      {/* ===== STATS ROW ===== */}
      <div className="flex flex-col md:flex-row justify-center gap-8 py-10 px-4 md:px-10 lg:px-16 xl:px-20 2xl:px-28">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="text-center space-y-3">
            <div className="h-4 w-32 bg-gray-300 rounded mx-auto"></div>
            <div className="h-6 w-24 bg-gray-300 rounded mx-auto"></div>
          </div>
        ))}
      </div>

      {/* ===== HERO IMAGE ===== */}
      <div className="px-4 md:px-10 lg:px-16 xl:px-20 2xl:px-28">
        <div className="h-[650px] bg-gray-300 rounded w-full"></div>
      </div>

      {/* ===== OVERVIEW SECTION ===== */}
      <div className="bg-[#f6f1e9] py-16 mt-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 px-4">
          <div className="h-10 bg-gray-300 rounded w-1/2 mx-auto"></div>
          <div className="h-6 bg-gray-300 rounded w-2/3 mx-auto"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6 mx-auto"></div>
        </div>

        <div className="max-w-5xl mx-auto mt-12 px-4">
          <div className="h-[400px] bg-gray-300 rounded w-full"></div>
        </div>
      </div>

      {/* ===== ITINERARY DAYS PLACEHOLDER ===== */}
      <div className="max-w-5xl mx-auto py-16 px-4 space-y-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-32 bg-gray-300 rounded"></div>
        ))}
      </div>

    </div>
  );
};

export default ItineraryDetailsSkeleton;
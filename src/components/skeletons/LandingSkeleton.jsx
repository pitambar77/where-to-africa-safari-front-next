const LandingSkeleton = () => {
  return (
    <div className="pb-16 bg-[#fbf6ea] animate-pulse">
      
      {/* Overview Skeleton */}
      <div className="max-w-[1320px] mx-auto px-4 py-16 text-center space-y-6">
        <div className="h-12 bg-gray-300 rounded w-1/2 mx-auto"></div>
        <div className="h-8 bg-gray-300 rounded w-2/3 mx-auto"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
      </div>

      <div className="px-4 md:px-10 lg:px-16 xl:px-20 2xl:px-28">
        
        {/* Filters Skeleton */}
        <div className="flex flex-wrap gap-4 mb-10">
          <div className="h-12 w-40 bg-gray-300 rounded"></div>
          <div className="h-12 w-40 bg-gray-300 rounded"></div>
          <div className="h-12 w-40 bg-gray-300 rounded"></div>
          <div className="h-12 w-40 bg-gray-300 rounded"></div>
        </div>

        {/* Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-[450px] bg-gray-300 rounded-sm"
            ></div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-center gap-2 mt-12">
          <div className="h-8 w-8 bg-gray-300 rounded"></div>
          <div className="h-8 w-8 bg-gray-300 rounded"></div>
          <div className="h-8 w-8 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default LandingSkeleton;
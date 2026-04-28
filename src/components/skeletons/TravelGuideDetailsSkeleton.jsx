const TravelGuideDetailsSkeleton = () => {
  return (
    <div className="animate-pulse">

      {/* ===== Banner Skeleton ===== */}
      <div className="relative h-[550px] bg-gray-300 w-full">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-12 w-1/2 bg-gray-400 rounded"></div>
        </div>
      </div>

      {/* ===== Content Skeleton ===== */}
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">

        {/* Heading */}
        <div className="h-10 bg-gray-300 rounded w-2/3"></div>

        {/* Paragraph lines */}
        <div className="space-y-3">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
        </div>

        {/* Image placeholder */}
        <div className="h-[500px] bg-gray-300 rounded w-full my-8"></div>

        {/* More text */}
        <div className="space-y-3">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </div>

        {/* List skeleton */}
        <div className="space-y-4 mt-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex gap-3">
              <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default TravelGuideDetailsSkeleton;
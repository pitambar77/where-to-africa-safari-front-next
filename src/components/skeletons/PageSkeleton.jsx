const PageSkeleton = () => {
  return (
    <div className="animate-pulse px-6 md:px-16 py-10 space-y-6">
      
      {/* Banner Skeleton */}
      <div className="w-full h-72 bg-gray-300 rounded-xl"></div>

      {/* Title */}
      <div className="h-8 bg-gray-300 rounded w-1/3"></div>

      {/* Paragraph lines */}
      <div className="space-y-3">
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-4/6"></div>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6 pt-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-60 bg-gray-300 rounded-xl"></div>
        ))}
      </div>

    </div>
  );
};

export default PageSkeleton;
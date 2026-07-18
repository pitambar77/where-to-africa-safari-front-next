import React from 'react'

const SkeletonCard = () => (
  <div className="p-2 animate-pulse">
    <div className="bg-gray-300 h-[550px] w-full rounded"></div>

    <div className="mt-4 space-y-3">
      <div className="h-4 bg-gray-300 rounded w-20"></div>
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-32"></div>
    </div>
  </div>
);

export default SkeletonCard
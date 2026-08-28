"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/api/axiosInstance";

export default function RegionsPage() {
  const { id } = useParams();

  const router = useRouter();

  const [destination, setDestination] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestination();
  }, []);

  /* ================= FETCH DESTINATION ================= */

  const fetchDestination = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/destinations/${id}`
      );

      setDestination(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE REGION ================= */

  const handleDeleteRegion = async (regionId) => {
    try {
      await axiosInstance.delete(
        `/api/destinations/${id}/regions/${regionId}`
      );

      fetchDestination();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Regions - {destination?.name}
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all destination regions
          </p>
        </div>

        <button
          onClick={() =>
            router.push(
              `/dashboard/regions/create/${destination._id}`
            )
          }
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Add Region
        </button>
      </div>

      {/* REGION LIST */}
      <div className="grid gap-5">
        {destination?.regions?.length > 0 ? (
          destination.regions.map((region) => (
            <div
              key={region._id}
              className="border rounded-xl p-5 flex items-center justify-between bg-white shadow-sm"
            >
        
              <div className="flex items-center gap-4">
                <img
                  src={region.image}
                  alt={region.name}
                  className="w-24 h-20 object-cover rounded-lg"
                />

                <div>
                  <h2 className="text-xl font-semibold">
                    {region.name}
                  </h2>

                  <p className="text-gray-500">
                    {region.slug}
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    {region.description}
                  </p>
                </div>
              </div>

          
              <div className="flex gap-3">
              
                <button
                  onClick={() =>
                    router.push(
                      `/dashboard/destinations/regions/edit/${region._id}`
                    )
                  }
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

       
                <button
                  onClick={() =>
                    router.push(
                      `/dashboard/destinations/regions/seo/${region._id}`
                    )
                  }
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg"
                >
                  SEO
                </button>

              
                <button
                  onClick={() =>
                    handleDeleteRegion(region._id)
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 border rounded-xl">
            <p className="text-gray-500">
              No regions added yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}




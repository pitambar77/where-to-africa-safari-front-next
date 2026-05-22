"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";

import { getAllExperiences, deleteExperience } from "@/api/experienceAPI";

const ViewExperiences = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await getAllExperiences();
      setData(res.data);
    } catch (error) {
      toast.error("Failed to fetch experiences");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this experience?");

    if (!confirmDelete) return;

    try {
      await deleteExperience(id);
      toast.success("Deleted successfully");
      fetchData();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">All Experiences</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <Image
              src={item.bannerImage}
              alt={item.bannerTitle}
              width={500}
              height={300}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <h2 className="text-lg font-semibold">{item.bannerTitle}</h2>

              <p className="text-sm text-gray-600 mb-3">
                {item.bannerDescription?.slice(0, 100)}...
              </p>

              <div className="flex gap-3">
                <Link
                  href={`/edit-experience/${item._id}`}
                  className="bg-blue-600 text-white px-4 py-1 rounded"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-600 text-white px-4 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewExperiences;
